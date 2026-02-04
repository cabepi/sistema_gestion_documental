
import { query } from '../db.js';

async function main() {
    try {
        console.log('Inserting FACTURA document type...');
        await query(`
            INSERT INTO sgd.document_types (code, name, description) 
            VALUES ('FACTURA', 'Factura', 'Comprobante de gastos o servicios')
            ON CONFLICT (code) DO NOTHING;
        `);
        console.log('Success! FACTURA added.');
    } catch (err) {
        console.error('Error inserting document type:', err);
    }
}

main();
