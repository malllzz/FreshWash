import React, { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const History = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setReservations([
        {
          id: "12345",
          plateNumber: "B 1234 ABC",
          servicePackage: "Full Wash",
          reservationDate: "2025-05-01",
          reservationTime: "10:00",
          status: "Selesai",
        },
        {
          id: "12346",
          plateNumber: "B 6789 DEF",
          servicePackage: "Express Wash",
          reservationDate: "2025-05-02",
          reservationTime: "14:00",
          status: "Dibatalkan",
        },
      ]);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    if (status === "Selesai") return "text-green-500";
    if (status === "Dibatalkan") return "text-red-500";
    return "text-gray-500";
  };

  const handleReview = (reservationId) => {
    Swal.fire({
      title: "Berikan Review Anda",
      html: `
        <style>
          .star {
            font-size: 30px;
            cursor: pointer;
            color: gray;
          }
          .star.selected,
          .star:hover,
          .star.hovered {
            color: gold;
          }
        </style>
        <div id="star-rating">
          ${[1, 2, 3, 4, 5]
            .map((i) => `<span class="star" data-value="${i}">☆</span>`)
            .join("")}
        </div>
        <textarea id="comment" class="swal2-textarea" placeholder="Komentar Anda..."></textarea>
      `,
      didOpen: () => {
        const stars = Swal.getPopup().querySelectorAll(".star");

        let selectedRating = 0;

        stars.forEach((star, index) => {
          star.addEventListener("mouseover", () => {
            stars.forEach((s, i) => {
              s.classList.toggle("hovered", i <= index);
            });
          });

          star.addEventListener("mouseout", () => {
            stars.forEach((s) => s.classList.remove("hovered"));
          });

          star.addEventListener("click", () => {
            selectedRating = index + 1;
            stars.forEach((s, i) => {
              s.classList.toggle("selected", i < selectedRating);
              s.textContent = i < selectedRating ? "★" : "☆";
            });
            Swal.getPopup().dataset.rating = selectedRating;
          });
        });
      },
      preConfirm: () => {
        const rating = Swal.getPopup().dataset.rating;
        const comment = document.getElementById("comment").value;
        if (!rating) {
          Swal.showValidationMessage("Silakan beri rating terlebih dahulu.");
          return false;
        }
        return { rating, comment };
      },
      showCancelButton: true,
      confirmButtonText: "Kirim",
    }).then((result) => {
      if (result.isConfirmed) {
        const { rating, comment } = result.value;
        console.log("Review untuk ID", reservationId, ":", { rating, comment });
        Swal.fire("Terima Kasih!", "Review Anda telah dikirim.", "success");
      }
    });
  };

  return (
    <MainLayout>
      <motion.div
        className="max-w-xl mx-auto py-10 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-2xl font-semibold mb-6">Riwayat Reservasi</h2>

        {reservations.length === 0 ? (
          <p>Belum ada riwayat reservasi</p>
        ) : (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white p-4 mb-4 shadow-md rounded-md"
            >
              <h3 className="font-semibold">ID Reservasi: {reservation.id}</h3>
              <p>Plat Kendaraan: {reservation.plateNumber}</p>
              <p>Jenis Layanan: {reservation.servicePackage}</p>
              <p>
                Waktu: {reservation.reservationDate}{" "}
                {reservation.reservationTime}
              </p>
              <p className={getStatusColor(reservation.status)}>
                Status: {reservation.status}
              </p>

              {reservation.status === "Selesai" && (
                <button
                  onClick={() => handleReview(reservation.id)}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                  Beri Review
                </button>
              )}
            </div>
          ))
        )}
      </motion.div>
    </MainLayout>
  );
};

export default History;
