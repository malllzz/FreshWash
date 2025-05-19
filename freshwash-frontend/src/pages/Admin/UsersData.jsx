import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersData = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/users");
        setUserList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/admin/users/${id}`);
      setUserList(userList.filter((user) => user.user_id !== id));  // Disesuaikan dengan user_id
    } catch (error) {
      console.error("Gagal menghapus pengguna:", error);
    }
  };

  const handleResetPassword = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/users/${id}/reset-password`);
      setUserList(userList.map((user) =>
        user.user_id === id ? { ...user, password: "newpassword123" } : user
      ));
    } catch (error) {
      console.error("Gagal mereset password:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Pengguna</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-center">Nama</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Nomor Telepon</th>
              <th className="px-6 py-3 text-center">Password</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.user_id} className="border-t">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone_number}</td>
                <td className="px-6 py-4">******</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleDelete(user.user_id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleResetPassword(user.user_id)} 
                    className="text-yellow-500 hover:underline"
                  >
                    Reset Password
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

export default UsersData;
