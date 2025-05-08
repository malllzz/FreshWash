import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Fungsi untuk membuat slug dari title
const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

const services = [
  {
    title: "Express Wash",
    price: "Rp50.000",
    features: [
      "Durasi ±15 menit",
      "Eksterior mobil & velg",
      "Cocok untuk Anda yang butuh cepat!",
    ],
  },
  {
    title: "Full Wash",
    price: "Rp150.000",
    features: [
      "Eksterior & interior",
      "Vakum kabin & bagasi",
      "Semir ban",
    ],
  },
  {
    title: "Premium Detail",
    price: "Rp275.000",
    features: [
      "Full Wash + detailing ringan",
      "Semir dashboard & kaca",
      "Penghilangan noda ringan",
    ],
  },
];

const bundlings = [
  {
    title: "Bundling 5x Cuci Express",
    price: "Rp225.000",
    serviceSlug: "express-wash", // Menambahkan serviceSlug
    features: [
      "Gratis 1x semir ban",
      "5 kali layanan Express Wash",
      "Berlaku selama 1 bulan",
    ],
  },
  {
    title: "Bundling Full Wash + Antar Jemput",
    price: "Rp400.000",
    serviceSlug: "full-wash", // Menambahkan serviceSlug
    features: [
      "3x Full Wash",
      "Termasuk antar-jemput kendaraan",
      "Layanan lengkap, tinggal bersantai",
    ],
  },
  {
    title: "Bundling Home Service",
    price: "Rp450.000",
    serviceSlug: "premium-detail", // Menambahkan serviceSlug
    features: [
      "3x kunjungan ke rumah",
      "Full Wash di lokasi Anda",
      "Jadwal fleksibel!",
    ],
  },
];

const Services = () => {
  return (
    <MainLayout>
      <section className="container mx-auto px-6 py-12">
        {/* Paket Reguler */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-10"
        >
          Paket Reguler
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const slug = slugify(service.title); // Menambahkan slug untuk URL
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white border rounded-2xl shadow-md p-8 text-center cursor-pointer hover:shadow-lg transition"
              >
                <Link
                  to={`/services/${slug}`} // Mengarahkan ke halaman detail layanan
                  className="block"
                >
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-2xl font-bold mb-6">{service.price}</p>
                  <ul className="text-gray-700 space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </Link>
                <Link
                  to="/reservation"
                  className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-full transition"
                >
                  Reservasi
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bundling Cling */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl font-bold text-center mb-10"
        >
          Bundling Cling
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundlings.map((bundle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white border rounded-2xl shadow-md p-8 text-center cursor-pointer hover:shadow-lg transition"
            >
              <Link
                to={`/services/${bundle.serviceSlug}`} // Mengarahkan ke halaman detail bundling
                className="block"
              >
                <h3 className="text-xl font-semibold mb-4">{bundle.title}</h3>
                <p className="text-2xl font-bold mb-6">{bundle.price}</p>
                <ul className="text-gray-700 space-y-2 mb-6">
                  {bundle.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </Link>
              <Link
                to="/reservation"
                className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-2 rounded-full transition"
              >
                Reservasi
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default Services;
