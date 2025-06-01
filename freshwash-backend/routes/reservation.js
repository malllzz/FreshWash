const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, async (req, res) => {
  const { name, plateNumber, orderDate, timeOrder, serviceId } = req.body;
  const userId = req.user.id;

  if (!name || !plateNumber || !orderDate || !timeOrder || !serviceId) {
    return res.status(400).json({ message: "Data tidak lengkap." });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO orders 
        (user_id, customer_name, service_id, plate_number, order_date, time_order, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, serviceId, plateNumber, orderDate, timeOrder, "pending"]
    );

    const insertedId = result.insertId;

    const datePart = orderDate.replace(/-/g, "");
    const timePart = timeOrder.replace(":", "");
    const orderCode = `FW-${datePart}-${timePart}-${insertedId}`;

    await db.execute(`UPDATE orders SET order_code = ? WHERE order_id = ?`, [
      orderCode,
      insertedId,
    ]);

    res
      .status(201)
      .json({
        message: "Reservasi berhasil",
        order_id: insertedId,
        order_code: orderCode,
      });
  } catch (err) {
    console.error("Gagal menyimpan ke database:", err);
    res.status(500).json({ message: "Gagal membuat reservasi" });
  }
});

router.get("/services", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT service_id, name, price FROM services"
    );
    res.json(rows);
  } catch (err) {
    console.error("Gagal mengambil layanan:", err);
    res.status(500).json({ message: "Gagal mengambil data layanan" });
  }
});

module.exports = router;
