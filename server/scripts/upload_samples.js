import dotenv from 'dotenv';
// Load env before other imports to ensure DB connection works if it relies on env
dotenv.config();

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import PDFDocument from 'pdfkit';
import { query } from '../db.js';

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.S3_BUCKET_NAME;

async function generatePdfBuffer(text) {
    return new Promise((resolve) => {
        const doc = new PDFDocument();
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.fontSize(20).text(text, 50, 50);
        doc.fontSize(12).text('\nEste es un documento de prueba generado automáticamente para el sistema de gestión documental.', 50, 100);
        doc.end();
    });
}

async function uploadToS3(key, buffer) {
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: 'application/pdf',
        // ACL: 'public-read' // Removed to avoid AccessDenied if ACLs are disabled
    });
    await s3.send(command);
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

async function main() {
    try {
        console.log('Fetching first 10 documents...');
        const { rows: docs } = await query('SELECT id, title FROM sgd.documents ORDER BY id ASC LIMIT 10');

        for (const doc of docs) {
            console.log(`Processing doc ID ${doc.id}: ${doc.title}`);
            const buffer = await generatePdfBuffer(`Documento ID: ${doc.id}\n${doc.title}`);
            const key = `samples/doc_${doc.id}.pdf`;
            const url = await uploadToS3(key, buffer);
            console.log(`Uploaded to: ${url}`);

            await query('UPDATE sgd.documents SET file_path = $1 WHERE id = $2', [url, doc.id]);
        }
        console.log('Success! Documents updated.');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

main();
