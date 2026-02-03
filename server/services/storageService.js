import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const bucketName = process.env.S3_BUCKET_NAME;

export const generatePresignedUrl = async (key) => {
    // If the key is a full URL, extract the key path
    // e.g. https://bucket.s3.amazonaws.com/samples/doc_1.pdf -> samples/doc_1.pdf
    let validKey = key;
    if (key.startsWith('http')) {
        const urlParts = key.split('.amazonaws.com/');
        if (urlParts.length > 1) {
            validKey = urlParts[1];
        }
    }

    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: validKey,
    });

    // URL expires in 1 hour (3600 seconds)
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};
