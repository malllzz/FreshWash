import React, { useState } from "react";

const reservations = [
  { id: 1, name: "John Doe", phone: "081234567890", plate: "B 1234 ABC", service: "Full Wash", price: "Rp150.000", status: "Dalam Antrean" },
  { id: 2, name: "Jane Doe", phone: "082345678901", plate: "B 5678 XYZ", service: "Express Wash", price: "Rp50.000", status: "Sedang Dicuci" },
];

const ReservationsData = () => {
  const [reservationList, setReservationList] = useState(reservations);

  const handleDelete = (id) => {
    setReservationList(reservationList.filter((res) => res.id !== id));
  };

  const handleStatusChange = (id, status) => {
    const updated = reservationList.map((res) =>
      res.id === id ? { ...res, status } : res
    );
    setReservationList(updated);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Reservasi</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3">Reservation ID</th>
              <th className="px-6 py-3">Nama</th>
              <th className="px-6 py-3">No Telp</th>
              <th className="px-6 py-3">Plat Nomor</th>
              <th className="px-6 py-3">Layanan</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservationList.map((res) => (
              <tr key={res.id} className="border-t">
                <td className="px-6 py-4">{res.id}</td>
                <td className="px-6 py-4">{res.name}</td>
                <td className="px-6 py-4">{res.phone}</td>
                <td className="px-6 py-4">{res.plate}</td>
                <td className="px-6 py-4">{res.service}</td>
                <td className="px-6 py-4">{res.price}</td>
                <td className="px-6 py-4">
                  <select
                    value={res.status}
                    onChange={(e) => handleStatusChange(res.id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="Dalam Antrean">Dalam Antrean</option>
                    <option value="Persiapan Pencucian">Persiapan Pencucian</option>
                    <option value="Sedang Dicuci">Sedang Dicuci</option>
                    <option value="Finishing">Finishing</option>
                    <option value="Selesai">Selesai</option>
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
