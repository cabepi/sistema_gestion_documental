require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function runMigration() {
    try {
        await client.connect();
        console.log('Connected to Neon PostgreSQL database.');

        const scriptsDir = path.join(__dirname, 'database/scripts');
        const files = fs.readdirSync(scriptsDir).sort();

        for (const file of files) {
            if (file.endsWith('.sql')) {
                console.log(`Executing ${file}...`);
                const filePath = path.join(scriptsDir, file);
                const sql = fs.readFileSync(filePath, 'utf8');

                await client.query(sql);
                console.log(`✓ ${file} executed successfully.`);
            }
        }

        console.log('All migrations completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
}

runMigration();
