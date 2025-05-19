const express = require('express');
const router = express.Router();
const db = require('../config/db');
const adminMiddleware = require('../middlewares/admin'); // optional if you want admin-only access

const validStatuses = [
  'pending',
  'scheduled',
  'dibatalkan',
  'dalam_antrian',
  'sedang_dicuci',
  'pencucian_selesai',
  'selesai',
];

router.get('/reservations', adminMiddleware, async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT 
        o.order_id AS id,
        u.name,
        u.phone_number AS phone,
        o.plate_number AS plate,
        s.name AS service,
        s.price,
        o.status
      FROM orders o
      JOIN users u ON o.user_id = u.user_id
      JOIN services s ON o.service_id = s.service_id
      ORDER BY o.order_date DESC, o.time_order DESC`
    );

    const formatted = rows.map((row) => ({
      ...row,
      price: `Rp${parseInt(row.price).toLocaleString('id-ID')}`,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Gagal mengambil data reservasi:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/reservations/:id/status', async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Status tidak valid.' });
  }

  try {
    await db.execute('UPDATE orders SET status = ? WHERE order_id = ?', [status, orderId]);
    res.json({ message: 'Status reservasi berhasil diperbarui.' });
  } catch (err) {
    console.error('Gagal mengubah status:', err);
    res.status(500).json({ message: 'Gagal mengubah status.' });
  }
});

router.delete('/reservations/:id', async (req, res) => {
  const orderId = req.params.id;
  try {
    await db.execute('DELETE FROM orders WHERE order_id = ?', [orderId]);
    res.json({ message: 'Reservasi berhasil dihapus.' });
  } catch (err) {
    console.error('Gagal menghapus reservasi:', err);
    res.status(500).json({ message: 'Gagal menghapus reservasi.' });
  }
});

module.exports = router;
