import express from 'express';
import { query } from '../db.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// GET /api/dashboard/metrics
router.get('/metrics', async (req, res) => {
    try {
        // 1. Total Documents
        const totalDocs = await query('SELECT COUNT(*) FROM sgd.documents');

        // 2. Pending Documents (Status = 'REVIEW')
        const pendingDocs = await query("SELECT COUNT(*) FROM sgd.documents WHERE status = 'REVIEW'");

        // 3. New Uploads (This Week)
        const newUploads = await query("SELECT COUNT(*) FROM sgd.documents WHERE created_at > NOW() - INTERVAL '7 days'");

        // 4. Completed Today (Status = 'APPROVED' or 'REJECTED' and updated today)
        const completedToday = await query("SELECT COUNT(*) FROM sgd.documents WHERE status IN ('APPROVED', 'REJECTED') AND updated_at::date = CURRENT_DATE");

        res.json({
            totalDocuments: parseInt(totalDocs.rows[0].count),
            pendingDocuments: parseInt(pendingDocs.rows[0].count),
            newUploads: parseInt(newUploads.rows[0].count),
            completedToday: parseInt(completedToday.rows[0].count)
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/dashboard/tasks
router.get('/tasks', async (req, res) => {
    const userId = req.user.id;
    const roleId = req.user.role_id;

    try {
        let queryText = `
      SELECT 
        t.id, 
        t.title, 
        t.priority, 
        t.status, 
        t.due_date,
        u.department, 
        u.full_name as sender,
        d.title as doc_title,
        d.created_at as doc_date
      FROM sgd.tasks t
      JOIN sgd.users u ON t.assignee_id = u.id 
      LEFT JOIN sgd.documents d ON t.document_id = d.id
    `;

        const queryParams = [];

        // Assuming Role ID 1 is ADMIN (based on seed insertion order)
        // In a real app we might query the role name first or use a constant
        if (roleId !== 1) {
            queryText += ' WHERE t.assignee_id = $1';
            queryParams.push(userId);
        }

        queryText += ' ORDER BY t.priority DESC, t.due_date ASC LIMIT 10';

        const { rows } = await query(queryText, queryParams);

        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
