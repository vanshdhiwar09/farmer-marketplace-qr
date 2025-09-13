import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("farmer"); // lowercase to match DB
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      password,
      role,
    });

    console.log("✅ Register Response:", res.data); // 👈 debug
    alert("✅ Registration successful! Please login.");
    navigate("/login");
  } catch (err) {
    console.error("❌ Register Error:", err.response?.data || err.message); // 👈 debug
    alert(err.response?.data?.error || "Registration failed");
  }
};


  return (
    <div className="bg-gradient-to-br from-lime-100 to-emerald-200 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden md:max-w-lg transition-all duration-500 hover:shadow-3xl">
        <div className="p-10">
          <div className="flex flex-col items-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-16 w-16 text-emerald-400 transition-transform duration-500 hover:scale-110"
            >
              <path d="M14.5 4.5c-2.5-3-6-3-8.5 0-2.5 3-2.5 6 0 8.5L12 22l6-9.5c2.5-2.5 2.5-5.5 0-8.5z" />
            </svg>
            <h1 className="mt-4 text-4xl font-light tracking-tight text-emerald-600">
              Join the Hub
            </h1>
            <p className="mt-2 text-sm text-gray-500 font-medium">
              Create your account to get started.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-300 focus:border-green-300"
                value={role}
                onChange={(e) => setRole(e.target.value.toLowerCase())}
              >
                <option value="farmer">Farmer</option>
                <option value="consumer">Consumer</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl shadow-lg text-lg font-bold text-white bg-gradient-to-r from-emerald-400 to-lime-500 hover:from-emerald-500 hover:to-lime-600 focus:ring-2 focus:ring-offset-2 focus:ring-emerald-300 transform transition-all duration-300 hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-emerald-400 hover:text-green-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
