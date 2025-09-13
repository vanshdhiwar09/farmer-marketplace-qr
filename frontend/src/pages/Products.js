import React, { useState, useEffect, useMemo } from "react";
import API from "../services/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showQrCodeId, setShowQrCodeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
  });

  const productsPerPage = 6;

  // ✅ Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleQrCode = (productId) => {
    setShowQrCodeId(showQrCodeId === productId ? null : productId);
  };

  // ✅ Add product (farmers only)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await API.post("/products/add", newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("✅ Product added successfully!");
      setShowModal(false);
      setNewProduct({ name: "", price: "", image_url: "" });
      fetchProducts(); // refresh
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add product");
    }
  };

  // ✅ Filtering + Sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortOption) {
      case "name_asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price_low_to_high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high_to_low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return filtered;
  }, [products, searchQuery, sortOption]);

  // ✅ Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  return (
    <div className="bg-gradient-to-br from-lime-100 to-emerald-200 min-h-screen p-6 font-sans">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light tracking-tight text-emerald-800">
            Marketplace
          </h1>
          {localStorage.getItem("role") === "farmer" && (
            <button
              className="px-6 py-3 rounded-full text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
              onClick={() => setShowModal(true)}
            >
              Add New Product
            </button>
          )}
        </div>

        {/* Filter & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full sm:w-2/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="w-full sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-emerald-500"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="default">Sort by...</option>
            <option value="name_asc">Name (A-Z)</option>
            <option value="price_low_to_high">Price (Low to High)</option>
            <option value="price_high_to_low">Price (High to Low)</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-lg font-semibold text-emerald-600 mb-4">
                  ₹{product.price}
                </p>

                {showQrCodeId === product.id ? (
                  <img
                    src={product.qr_code_url}
                    alt={`QR for ${product.name}`}
                    className="w-24 h-24 mx-auto"
                  />
                ) : (
                  <button
                    className="mt-2 px-4 py-2 rounded-lg text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600"
                    onClick={() => toggleQrCode(product.id)}
                  >
                    Show QR Code
                  </button>
                )}

                <p className="text-sm text-gray-500 mt-4">
                  Grown by{" "}
                  <span className="font-semibold text-gray-700">
                    {product.farmer_name}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl w-96">
            <h2 className="text-2xl font-bold text-emerald-600 mb-4">
              Add New Product
            </h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                className="w-full px-4 py-2 border rounded-lg"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full px-4 py-2 border rounded-lg"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-full px-4 py-2 border rounded-lg"
                value={newProduct.image_url}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image_url: e.target.value })
                }
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
