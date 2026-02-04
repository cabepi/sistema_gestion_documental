import express from 'express';
import { query } from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// GET /api/documents
// Supports query params: type, search, date
router.get('/', async (req, res) => {
    const { type, search, fromDate, toDate } = req.query;

    try {
        let queryText = `
            SELECT 
                d.id, 
                d.title, 
                d.description,
                dt.name as type_name, 
                d.file_path, 
                d.status,
                d.created_at,
                u.full_name as uploader_name
            FROM sgd.documents d
            LEFT JOIN sgd.document_types dt ON d.document_type_id = dt.id
            LEFT JOIN sgd.users u ON d.uploader_id = u.id
            WHERE 1=1
        `;

        const params = [];
        let paramIndex = 1;

        if (type) {
            queryText += ` AND dt.code = $${paramIndex}`;
            params.push(type);
            paramIndex++;
        }

        if (search) {
            queryText += ` AND (d.title ILIKE $${paramIndex} OR d.description ILIKE $${paramIndex})`;
            params.push(`%${search}%`);
            paramIndex++;
        }

        if (fromDate) {
            queryText += ` AND d.created_at >= $${paramIndex}`;
            params.push(fromDate);
            paramIndex++;
        }

        if (toDate) {
            queryText += ` AND d.created_at <= $${paramIndex}`;
            params.push(toDate);
            paramIndex++;
        }

        queryText += ' ORDER BY d.created_at DESC LIMIT 50';

        const { rows } = await query(queryText, params);
        res.json(rows);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

import { generatePresignedUrl } from '../services/storageService.js';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import path from 'path';

// Multer setup for memory storage (we upload buffer to S3)
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const bucketName = process.env.S3_BUCKET_NAME;

// POST /api/documents - Upload and create document
router.post('/', upload.single('file'), async (req, res) => {
    // 1. Validate Input
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const { title, description, document_type_code, created_at } = req.body;
    const userId = req.user.id; // From authMiddleware

    try {
        // 2. Upload to S3
        const fileExtension = path.extname(req.file.originalname);
        const uniqueKey = `uploads/${Date.now()}_${req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

        const uploadCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: uniqueKey,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        });

        await s3.send(uploadCommand);

        // Construct S3 URL (Standard format)
        const s3Url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`;

        // 3. Resolve Document Type ID
        // Note: In a real app we might cache this or pass ID from frontend.
        const typeRes = await query('SELECT id FROM sgd.document_types WHERE code = $1', [document_type_code || 'MEMORANDO']);
        const typeId = typeRes.rows.length > 0 ? typeRes.rows[0].id : 1; // Default to first type if not found

        // 4. Insert into DB
        const insertQuery = `
            INSERT INTO sgd.documents 
            (title, description, file_path, document_type_id, uploader_id, status, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, 'DRAFT', $6, NOW())
            RETURNING *
        `;

        // Use provided created_at or current date if valid, else NOW
        const docDate = created_at ? new Date(created_at) : new Date();

        const { rows } = await query(insertQuery, [
            title || req.file.originalname,
            description || '',
            s3Url, // Storing full URL as per previous pattern
            typeId,
            userId,
            docDate
        ]);

        res.status(201).json(rows[0]);

    } catch (err) {
        console.error('Error in document upload:', err);
        res.status(500).send('Server Error during upload');
    }
});

// ... (existing endpoints)

// GET /api/documents/:id
router.get('/:id', async (req, res) => {
    // ... rest of the file

    const { id } = req.params;
    try {
        const { rows } = await query(`
            SELECT 
                d.*, 
                dt.name as type_name,
                u.full_name as uploader_name,
                u.department as uploader_department
            FROM sgd.documents d
            LEFT JOIN sgd.document_types dt ON d.document_type_id = dt.id
            LEFT JOIN sgd.users u ON d.uploader_id = u.id
            WHERE d.id = $1
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }

        const doc = rows[0];

        // Generate signed URL if file_path exists
        if (doc.file_path) {
            try {
                doc.file_url = await generatePresignedUrl(doc.file_path);
            } catch (error) {
                console.error('Error generating presigned URL:', error);
                // Fallback to original path if signing fails (or handle as error)
                doc.file_url = doc.file_path;
            }
        }

        res.json(doc);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PATCH /api/documents/:id/status
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['DRAFT', 'REVIEW', 'APPROVED', 'REJECTED'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Estado inválido' });
    }

    try {
        const { rows } = await query(
            'UPDATE sgd.documents SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Documento no encontrado' });
        }

        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
