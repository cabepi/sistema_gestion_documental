import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key';

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email (RAW SQL)
        const { rows } = await query('SELECT * FROM sgd.users WHERE email = $1', [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const user = rows[0];

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { id: user.id, role_id: user.role_id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 4. Update last login (RAW SQL)
        await query('UPDATE sgd.users SET last_login = NOW() WHERE id = $1', [user.id]);

        res.json({
            token,
            user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                department: user.department,
                avatarUrl: user.avatar_url
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
