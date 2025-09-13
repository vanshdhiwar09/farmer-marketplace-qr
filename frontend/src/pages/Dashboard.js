import React, { useEffect, useState } from "react";
import API from "../services/axios";


// Action Button
const ActionButton = ({ onClick, text, className }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
  >
    {text}
  </button>
);

// Product Card
const ProductCard = ({ product }) => (
  <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.product_name}</h3>
    <p className="text-lg font-semibold text-emerald-600 mb-4">₹{product.price}</p>
    <div className="flex space-x-2 mt-auto">
      <ActionButton text="Edit" onClick={() => console.log(`Edit ${product.id}`)} className="bg-emerald-500 text-white hover:bg-emerald-600" />
      <ActionButton text="Delete" onClick={() => console.log(`Delete ${product.id}`)} className="bg-red-500 text-white hover:bg-red-600" />
    </div>
  </div>
);

// Order Card
const OrderCard = ({ order }) => {
  let statusClass = "text-yellow-600 bg-yellow-100";
  if (order.status === "Completed") statusClass = "text-green-600 bg-green-100";
  if (order.status === "Cancelled") statusClass = "text-red-600 bg-red-100";

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col transition-transform duration-300 hover:shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
          {order.status}
        </span>
      </div>
      <p className="text-sm text-gray-600">Items: {order.items}</p>
    </div>
  );
};

// Dashboard Summary Card
const DashboardSummaryCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-2xl p-6 flex items-center shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
    <div className="bg-emerald-100 rounded-full p-4 mr-4 text-emerald-600">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await API.get("/auth/profile");
        setUserName(profileRes.data.name);

        const productsRes = await API.get("/products");
        setProducts(productsRes.data);

        const ordersRes = await API.get("/orders");
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-br from-lime-100 to-emerald-200 min-h-screen p-6 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-light tracking-tight text-emerald-800 mb-6">
          Welcome, {userName || "User"}!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <DashboardSummaryCard title="Total Products" value={products.length} icon={<span>📦</span>} />
          <DashboardSummaryCard title="Total Orders" value={orders.length} icon={<span>🛒</span>} />
        </div>

        {/* Products */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">My Products</h2>
            <ActionButton text="Add New Product" onClick={() => console.log("Add product")} className="bg-emerald-500 text-white hover:bg-emerald-600" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* Orders */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">My Orders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map(o => <OrderCard key={o.id} order={o} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
