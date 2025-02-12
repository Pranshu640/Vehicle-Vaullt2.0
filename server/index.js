import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/api/query', async (req, res) => {
    try {
        const { query } = req.body;
        console.log('Executing query:', query);
        const [rows] = await pool.execute(query);
        res.json({ query, results: rows });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ 
            error: error.message,
            query: req.body.query 
        });
    }
});

// Add this route to check if server is running
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 