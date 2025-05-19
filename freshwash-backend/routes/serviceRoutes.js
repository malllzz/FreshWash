const express = require('express');
const router = express.Router();
const db = require('../config/db');

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') 
    .replace(/\s+/g, '-')     
    .replace(/--+/g, '-')     
    .trim();

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM services');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM services WHERE LOWER(REPLACE(name, " ", "-")) = ?', [slug]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const service = rows[0]; 

    let bundling = null;
    if (service.is_bundling === 1) {
      const [bundlingRows] = await db.execute('SELECT * FROM services WHERE service_id = ?', [service.is_bundling]);
      bundling = bundlingRows[0];
    }

    const [reviewRows] = await db.execute(
      `SELECT r.rating, r.comment, u.name AS reviewer 
       FROM reviews r 
       JOIN users u ON r.user_id = u.user_id 
       WHERE r.service_id = ? 
       ORDER BY r.review_id DESC`,
      [service.service_id]
    );

    res.json({
      service,
      bundling: bundling || null,
      reviews: reviewRows || [],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
