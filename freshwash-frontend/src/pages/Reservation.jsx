import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";

const Reservation = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Nama User",
    email: "user@email.com",
  });

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    plateNumber: "",
    date: "",
    time: "",
    servicePackage: "",
    voucherCode: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user.name,
      email: user.email,
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const now = new Date();
    const currentDate = now.toISOString().split("T")[0];
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const selectedDate = formData.date;
    const [selectedHour, selectedMinute] = formData.time.split(":").map(Number);
    // Check if the selected date is in the past
    if (selectedDate < currentDate) {
      await Swal.fire({
        icon: "error",
        title: "Tanggal Tidak Valid",
        text: "Tanggal yang dipilih sudah lewat.",
        confirmButtonColor: "#ef4444",
      });
      return;
    }
    
    // Check if the selected date is today and the time is in the past
    if (selectedDate === currentDate) {
      if (
        selectedHour < currentHour ||
        (selectedHour === currentHour && selectedMinute < currentMinute)
      ) {
        await Swal.fire({
          icon: "error",
          title: "Waktu Tidak Valid",
          text: "Anda tidak bisa memilih waktu yang sudah terlewat pada hari ini.",
          confirmButtonColor: "#ef4444",
        });
        return;
      }
    }

    // Check if the selected time is within the allowed range (08:00 - 21:00)
    if (
      selectedHour < 8 ||
      selectedHour > 21 ||
      (selectedHour === 21 && selectedMinute > 0)
    ) {
      await Swal.fire({
        icon: "error",
        title: "Waktu Tidak Valid",
        text: "Waktu reservasi hanya diperbolehkan antara 08:00 hingga 21:00!",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    const formattedDate = formData.date.replace(/-/g, "");
    const formattedTime = formData.time.replace(":", "");
    const orderId = `FW-${formattedDate}-${formattedTime}-${Date.now()}`;

    try {
      await emailjs.send(
        // "service_lxj1ie5",
        // "template_lnyy2wu",
        {
          order_id: orderId,
          to_name: formData.name,
          to_email: formData.email,
          plate_number: formData.plateNumber,
          reservation_date: formData.date,
          reservation_time: formData.time,
          service_package: formData.servicePackage,
          voucher_code: formData.voucherCode || "Tidak ada",
        },
        // "CJF0hZJOtiozGkRx2"
      );

      await Swal.fire({
        icon: "success",
        title: "Reservasi Berhasil!",
        text: `Order ID: ${orderId} telah dikirim ke ${formData.email}`,
        confirmButtonColor: "#0ea5e9",
      });

      navigate("/");
    } catch (error) {
      console.error("Gagal mengirim email:", error);

      await Swal.fire({
        icon: "warning",
        title: "Reservasi Berhasil!",
        text: "Namun gagal mengirim email konfirmasi.",
        confirmButtonColor: "#facc15",
      });

      navigate("/");
    }
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 shadow-md rounded-2xl max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Formulir Reservasi
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nama */}
            <div>
              <label className="block text-gray-700 mb-2">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full border bg-gray-100 rounded-lg p-3 focus:outline-none"
                required
              />
            </div>

            {/* Plat Nomor */}
            <div>
              <label className="block text-gray-700 mb-2">
                Plat Nomor Kendaraan
              </label>
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="Contoh: B 1234 ABC"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            {/* Tanggal */}
            <div>
              <label className="block text-gray-700 mb-2">
                Tanggal Reservasi
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            {/* Waktu */}
            <div>
              <label className="block text-gray-700 mb-2">
                Waktu Reservasi
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </div>

            {/* Paket */}
            <div>
              <label className="block text-gray-700 mb-2">
                Pilih Paket Layanan
              </label>
              <select
                name="servicePackage"
                value={formData.servicePackage}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              >
                <option value="">-- Pilih Paket --</option>
                <option value="Express Wash">Express Wash</option>
                <option value="Full Wash">Full Wash</option>
                <option value="Premium Detail">Premium Detail</option>
                <option value="Bundling 5x Cuci Express">
                  Bundling 5x Cuci Express
                </option>
                <option value="Bundling Full Wash + Antar Jemput">
                  Bundling Full Wash + Antar Jemput
                </option>
                <option value="Bundling Home Service">
                  Bundling Home Service
                </option>
              </select>
            </div>

            {/* Voucher */}
            <div>
              <label className="block text-gray-700 mb-2">
                Kode Voucher (Opsional)
              </label>
              <input
                type="text"
                name="voucherCode"
                value={formData.voucherCode}
                onChange={handleChange}
                placeholder="Masukkan kode voucher jika ada"
                className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition cursor-pointer"
              >
                Konfirmasi Reservasi
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </MainLayout>
  );
};

export default Reservation;
