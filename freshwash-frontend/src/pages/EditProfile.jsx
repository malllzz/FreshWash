import React, { useState, useEffect, useRef } from "react";
import MainLayout from "../layouts/MainLayout";
import Swal from "sweetalert2";
import axios from "axios";
import { motion } from "framer-motion";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/user/profile");
        setForm({
          name: response.data.name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          oldPassword: "",
          newPassword: "",
        });
        setPhotoPreview(response.data.photoUrl);
      } catch (error) {
        Swal.fire("Error", "Failed to load profile data.", "error");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    if (form.oldPassword) formData.append("oldPassword", form.oldPassword);
    if (form.newPassword) formData.append("newPassword", form.newPassword);
    if (photo) formData.append("photo", photo);

    try {
      await axios.put("/api/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success", "Profile updated successfully.", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update profile.",
        "error"
      );
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Apakah anda yakin?",
      text: "Tindakan ini akan menghapus akun anda secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus akun saya!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete("/api/user/account");
        Swal.fire("Deleted!", "Your account has been deleted.", "success").then(
          () => {
            window.location.href = "/";
          }
        );
      } catch (error) {
        Swal.fire("Error", "Failed to delete account.", "error");
      }
    }
  };

  return (
    <MainLayout>
      <motion.div
        className="max-w-xl mx-auto pt-6 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-xl mx-auto pt-4 px-6">
          <h2 className="text-2xl font-semibold mb-6">Edit Profil</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            {/* Photo Upload */}
            <div>
              <label className="block mb-1 font-medium">Foto Profil</label>
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
              )}
              <div>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="bg-gray-200 text-sm px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
                >
                  Pilih Foto
                </button>
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Nama</label>
              <input
                type="text"
                name="name"
                className="w-full border px-4 py-2 rounded"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border px-4 py-2 rounded"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Nomor Telepon</label>
              <input
                type="tel"
                name="phone"
                className="w-full border px-4 py-2 rounded"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <hr className="my-6" />

            <h3 className="text-lg font-semibold">Ubah Password</h3>

            <div>
              <label className="block mb-1 font-medium">
                Password Saat Ini
              </label>
              <input
                type="password"
                name="oldPassword"
                className="w-full border px-4 py-2 rounded"
                value={form.oldPassword}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Password Baru</label>
              <input
                type="password"
                name="newPassword"
                className="w-full border px-4 py-2 rounded"
                value={form.newPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Simpan Perubahan
            </button>
          </form>

          <hr className="my-8" />

          <div className="text-right">
            <button
              onClick={handleDeleteAccount}
              className="text-red-600 hover:underline cursor-pointer"
            >
              Hapus Akun
            </button>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default EditProfile;
