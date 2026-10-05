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
// ========================================
// GET: ดึงข้อมูลทั้งหมด
// ========================================
app.get('/api/person', async (req, res) => {

  try {

    const persons = await db('person')
      .select('*')
      .orderBy('id', 'desc');

    res.json({
      success: true,
      data: persons
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงข้อมูลได้'
    });

  }

});


// ========================================
// GET: ดึงข้อมูลตาม ID
// ========================================
app.get('/api/person/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const person = await db('person')
      .where('id', id)
      .first();

    if (!person) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล'
      });
    }

    res.json({
      success: true,
      data: person
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'ไม่สามารถดึงข้อมูลได้'
    });

  }

});


// ========================================
// POST: เพิ่มข้อมูล
// ========================================
app.post('/api/person', async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      birthDate,
      gender
    } = req.body;

    // Validation
    if (!firstName || !lastName || !birthDate || !gender) {
      return res.status(400).json({
        success: false,
        message: 'กรุณากรอกข้อมูลให้ครบ'
      });
    }

    const [id] = await db('person').insert({
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      gender: gender
    });

    res.status(201).json({
      success: true,
      message: 'เพิ่มข้อมูลสำเร็จ',
      id: id
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'ไม่สามารถเพิ่มข้อมูลได้'
    });

  }

});


// ========================================
// PUT: แก้ไขข้อมูล
// ========================================
app.put('/api/person/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const {
      firstName,
      lastName,
      birthDate,
      gender
    } = req.body;

    const updated = await db('person')
      .where('id', id)
      .update({
        first_name: firstName,
        last_name: lastName,
        birth_date: birthDate,
        gender: gender
      });

    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล'
      });
    }

    res.json({
      success: true,
      message: 'แก้ไขข้อมูลสำเร็จ'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'ไม่สามารถแก้ไขข้อมูลได้'
    });

  }

});


// ========================================
// DELETE: ลบข้อมูล
// ========================================
app.delete('/api/person/:id', async (req, res) => {

  try {

    const { id } = req.params;

    const deleted = await db('person')
      .where('id', id)
      .delete();

    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: 'ไม่พบข้อมูล'
      });
    }

    res.json({
      success: true,
      message: 'ลบข้อมูลสำเร็จ'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'ไม่สามารถลบข้อมูลได้'
    });

  }

});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});