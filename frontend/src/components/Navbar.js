import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login state from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navItems = isLoggedIn
    ? [
        { name: "Home", link: "/" },
        { name: "Products", link: "/products" },
        { name: "Dashboard", link: "/dashboard" },
        { name: "Profile", link: "/profile" },
        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Home", link: "/" },
        { name: "Products", link: "/products" },
        { name: "Login", link: "/login" },
        { name: "Register", link: "/register" },
      ];

  return (
    <nav className="bg-gradient-to-r from-emerald-500 to-green-600 shadow-xl font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white text-3xl font-bold tracking-wider hover:scale-105 transition-all duration-300"
            >
              <svg
                className="h-9 w-9 text-yellow-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M16.5 10.5a4 4 0 11-4-4" />
              </svg>
              FarmConnect
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8">
            {navItems.map((item, index) =>
              item.action ? (
                <button
                  key={index}
                  onClick={item.action}
                  className="text-white hover:text-yellow-400 px-3 py-2 text-lg font-medium transition transform hover:scale-110"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.link}
                  className="text-white hover:text-yellow-400 px-3 py-2 text-lg font-medium transition transform hover:scale-110"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-300 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-emerald-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) =>
            item.action ? (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-white hover:bg-emerald-800 hover:text-yellow-300 text-base font-medium transition duration-300"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={index}
                to={item.link}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-white hover:bg-emerald-800 hover:text-yellow-300 text-base font-medium transition duration-300"
              >
                {item.name}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
