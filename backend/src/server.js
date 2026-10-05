const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is running',
  });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await db.raw('SELECT 1 AS result');

    res.json({
      success: true,
      message: 'MySQL connection successful',
      data: result[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'MySQL connection failed',
      error: error.message,
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await db('patient').select('*');

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Database error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});