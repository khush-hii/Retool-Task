const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv'); // For managing environment variables

dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// MySQL Database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',           // Environment variable for MySQL username
    password: process.env.DB_PASSWORD || 'Khushi@123',       // Environment variable for MySQL password
    database: process.env.DB_NAME || 'task_management'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1); // Exit on failure to connect
    }
    console.log('Connected to MySQL');
});

// Middleware
app.use(express.json());
app.use(cors());

// API Routes

// Get all tasks
// Default route to handle GET requests to '/'
app.get('/', (req, res) => {
    res.send('Task Management API is running');
});

app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err.message);
            return res.status(500).json({ error: 'Error fetching tasks' });
        }
        res.json(results);
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { title, description, due_date, status } = req.body;
    if (!title || !status) {
        return res.status(400).json({ error: 'Title and Status are required' });
    }
    const query = 'INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, due_date, status], (err, results) => {
        if (err) {
            console.error('Error adding task:', err.message);
            return res.status(500).json({ error: 'Error adding task' });
        }
        res.status(201).json({ message: 'Task added successfully', taskId: results.insertId });
    });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
    const { title, description, due_date, status } = req.body;
    const taskId = req.params.id;
    if (!title || !status) {
        return res.status(400).json({ error: 'Title and Status are required' });
    }
    const query = 'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?';
    db.query(query, [title, description, due_date, status, taskId], (err, results) => {
        if (err) {
            console.error('Error updating task:', err.message);
            return res.status(500).json({ error: 'Error updating task' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully' });
    });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [taskId], (err, results) => {
        if (err) {
            console.error('Error deleting task:', err.message);
            return res.status(500).json({ error: 'Error deleting task' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
