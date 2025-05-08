import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { Star } from "lucide-react";

// Dummy data layanan
const services = {
  "express-wash": {
    title: "Express Wash",
    price: "Rp50.000",
    description: "Pencucian cepat untuk bagian luar mobil, cocok untuk Anda yang sedang terburu-buru.",
  },
  "full-wash": {
    title: "Full Wash",
    price: "Rp150.000",
    description: "Cucian menyeluruh eksterior dan interior, termasuk vakum dan semir ban.",
  },
  "premium-detail": {
    title: "Premium Detail",
    price: "Rp275.000",
    description: "Detailing ringan setelah full wash, termasuk semir kaca dan penghilangan noda ringan.",
  },
};

// Dummy data ulasan
const dummyReviews = {
  "full-wash": [
    { rating: 5, comment: "Sangat bersih dan rapi, puas banget!" },
    { rating: 4, comment: "Lumayan, tapi agak lama pengerjaannya." },
  ],
  "express-wash": [
    { rating: 3, comment: "Cepat tapi masih ada noda di kaca." },
  ],
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services[slug];
  const reviews = dummyReviews[slug] || [];

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-6 py-10">
        {service ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">{service.title}</h1>
              <Link
                to="/reservation"
                className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Reservasi
              </Link>
            </div>

            <p className="text-xl text-gray-700 font-semibold mb-2">Harga: {service.price}</p>
            <p className="mb-6 text-gray-600">{service.description}</p>

            <hr className="my-6" />

            <h2 className="text-2xl font-semibold mb-4">Ulasan Pengguna</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500">Belum ada ulasan.</p>
            ) : (
              reviews.map((review, idx) => (
                <div key={idx} className="mb-4 p-4 bg-gray-100 rounded">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))
            )}
          </>
        ) : (
          <p className="text-center text-red-500">Layanan tidak ditemukan.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default ServiceDetail;
