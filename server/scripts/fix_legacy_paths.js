import { query } from '../db.js';

async function fixPaths() {
    try {
        console.log('Checking for legacy paths...');
        const { rows: legacy } = await query("SELECT id, title, file_path FROM sgd.documents WHERE file_path LIKE '/docs/%'");
        console.log(`Found ${legacy.length} documents with legacy paths.`);

        if (legacy.length > 0) {
            console.log('Updating legacy paths to point to a valid sample...');
            // We'll point them all to doc_1.pdf (or we could randomize 1-10)
            // But to be safe, let's just use a known valid key: 'samples/doc_1.pdf'
            // NOTE: In the DB we store the full URL now based on previous script, 
            // OR we store keys?
            // The previous script stored FULL URLs: `https://${bucketName}.s3...`
            // But my storageService handles both full URLs and keys.
            // Let's use the full URL format to be consistent with what `upload_samples.js` did.

            // I'll grab the URL from ID 1 to be sure I get the bucket/region right without re-constructing it manually
            const { rows: [sample] } = await query("SELECT file_path FROM sgd.documents WHERE id = 1");

            if (!sample || !sample.file_path.startsWith('http')) {
                console.error('Document 1 does not have a valid http path to use as template.');
                process.exit(1);
            }

            const validUrl = sample.file_path;
            console.log(`Using valid URL template: ${validUrl}`);

            await query("UPDATE sgd.documents SET file_path = $1 WHERE file_path LIKE '/docs/%'", [validUrl]);
            console.log('Successfully updated all legacy documents.');
        } else {
            console.log('No legacy documents found.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

fixPaths();
