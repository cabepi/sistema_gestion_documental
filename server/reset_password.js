import bcrypt from 'bcryptjs';
import { query } from './db.js';

async function resetPassword() {
    const email = 'admin@micultura.gob.pa';
    const newPassword = 'password123';

    try {
        console.log(`Resetting password for ${email}...`);

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
        console.log('New Hash Generated:', hash);

        // Update DB
        const result = await query('UPDATE sgd.users SET password_hash = $1 WHERE email = $2 RETURNING id, email', [hash, email]);

        if (result.rows.length > 0) {
            console.log(`✓ Password updated successfully for user ID: ${result.rows[0].id}`);
        } else {
            console.error('✗ User not found.');
        }

    } catch (err) {
        console.error('Error resetting password:', err);
    } finally {
        process.exit();
    }
}

resetPassword();
