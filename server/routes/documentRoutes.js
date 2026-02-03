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

// ... (existing imports)

// GET /api/documents/:id
router.get('/:id', async (req, res) => {
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

export default router;
