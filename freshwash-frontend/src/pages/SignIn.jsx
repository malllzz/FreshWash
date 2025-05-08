import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import logoFreshwash from "../assets/freshwash-logo.png";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    // Mock login check
    // Admin credentials
    if (
      formData.email === "admin@freshwash.com" &&
      formData.password === "admin123"
    ) {
      localStorage.setItem("token", "mock-admin-token");
      localStorage.setItem("role", "admin");

      Swal.fire({
        icon: "success",
        title: "Admin Login Successful!",
        text: "Welcome, Admin!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } // User credentials
    else if (
      formData.email === "user@freshwash.com" &&
      formData.password === "user123"
    ) {
      localStorage.setItem("token", "mock-user-token");
      localStorage.setItem("role", "user");

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to FreshWash!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } else {
      // Invalid credentials
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Logo */}
        <img
          alt="FreshWash Logo"
          src={logoFreshwash}
          className="mx-auto h-16 w-auto"
        />
        <h2 className="mt-8 text-center text-base font-bold tracking-tight text-gray-900">
          Welcome to FreshWash - Sign in to continue
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm 
                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                           focus:ring-2 focus:ring-sky-400 sm:text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 shadow-sm 
                           ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                           focus:ring-2 focus:ring-sky-400 sm:text-sm"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="text-sm text-red-600">{error}</div>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 
                         text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
                         focus-visible:outline focus-visible:outline-2 
                         focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Don't have account */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
