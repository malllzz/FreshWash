import React, { useState, useEffect } from "react";
import axios from "axios";

const ReservationsData = () => {
  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/reservations", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setReservationList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data reservasi:", error);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReservationList((prev) => prev.filter((res) => res.id !== id));
    } catch (error) {
      console.error("Gagal menghapus reservasi:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/reservations/${id}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setReservationList((prev) =>
        prev.map((res) => (res.id === id ? { ...res, status } : res))
      );
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Reservasi</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-center">Reservation ID</th>
              <th className="px-6 py-3 text-center">Nama</th>
              <th className="px-6 py-3 text-center">No Telp</th>
              <th className="px-6 py-3 text-center">Plat Nomor</th>
              <th className="px-6 py-3 text-center">Layanan</th>
              <th className="px-6 py-3 text-center">Harga</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservationList.map((res) => (
              <tr key={res.id} className="border-t">
                <td className="px-6 py-4">{res.id}</td>
                <td className="px-6 py-4">{res.name}</td>
                <td className="px-6 py-4">{res.phone_number}</td>
                <td className="px-6 py-4">{res.plate}</td>
                <td className="px-6 py-4">{res.service}</td>
                <td className="px-6 py-4">{res.price}</td>
                <td className="px-6 py-4">
                  <select
                    value={res.status}
                    onChange={(e) => handleStatusChange(res.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="dibatalkan">Dibatalkan</option>
                    <option value="dalam_antrian">Dalam Antrean</option>
                    <option value="sedang_dicuci">Sedang Dicuci</option>
                    <option value="pencucian_selesai">Pencucian Selesai</option>
                    <option value="selesai">Selesai</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(res.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReservationsData;

