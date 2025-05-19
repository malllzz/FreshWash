import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";
import axios from "axios";

const ServiceDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [bundling, setBundling] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/services/${slug}`)
      .then((res) => {
        setService(res.data.service);
        setBundling(res.data.bundling); 
        setReviews(res.data.reviews); 
      })
      .catch((err) => {
        console.error(err);
        setError("Layanan tidak ditemukan.");
      });
  }, [slug]);

  const handleReservationClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Anda belum signin",
        text: "Silakan signin terlebih dahulu untuk melakukan reservasi.",
        confirmButtonText: "Signin sekarang",
        denyButtonText: "Batal",
        showDenyButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signin");
        }
      });
    } else {
      navigate("/reservation");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : service ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{service.name}</h1>
              <button
                onClick={handleReservationClick}
                className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-full transition cursor-pointer"
              >
                Reservasi
              </button>
            </div>

            <p className="text-xl text-gray-700 font-semibold mb-2">
              Harga: Rp{Number(service.price).toLocaleString()}
            </p>
            <p className="mb-6 text-gray-600">{service.description}</p>

            {/* Tampilkan informasi bundling jika ada */}
            {bundling && (
              <>
                <hr className="my-6" />
                <h2 className="text-xl font-semibold mb-2">Informasi Bundling</h2>
                <ul className="text-gray-700 list-disc list-inside space-y-1">
                  {bundling.description.split(";").map((feature, i) => (
                    <li key={i}>{feature.trim()}</li>
                  ))}
                </ul>
              </>
            )}

            <hr className="my-6" />
            <h2 className="text-2xl font-semibold mb-4">Ulasan Pengguna</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500">Belum ada ulasan.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border p-4 rounded shadow-sm">
                    <p className="text-yellow-500">
                      Rating: {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </p>
                    <p className="italic text-gray-700">"{review.comment}"</p>
                    <p className="text-sm text-gray-500">- {review.reviewer}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Memuat data layanan...</p>
        )}
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;
