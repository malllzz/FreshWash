import React, { useState } from "react";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "081234567890", password: "hashedpassword123" },
  { id: 2, name: "Jane Doe", email: "jane@example.com", phone: "082345678901", password: "hashedpassword456" },
];

const UsersData = () => {
  const [userList, setUserList] = useState(users);

  const handleDelete = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
  };

  const handleResetPassword = (id) => {
    const updatedUsers = userList.map((user) =>
      user.id === id ? { ...user, password: "newpassword123" } : user
    );
    setUserList(updatedUsers);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Data Pengguna</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Nama</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Nomor Telepon</th>
              <th className="px-6 py-3 text-left">Password</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">******</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleResetPassword(user.id)}
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
