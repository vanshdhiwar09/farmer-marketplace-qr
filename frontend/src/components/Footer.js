import React from "react";
import { Link } from "react-router-dom"; // ✅ Use Link for internal navigation

export default function Footer() {
  return (
    <footer className="bg-emerald-600 text-white py-16 px-6 sm:px-10 font-sans shadow-inner">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Company Info Section */}
        <div className="flex flex-col items-center">
          <svg
            className="h-12 w-12 text-yellow-300 mb-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M16.5 10.5a4 4 0 11-4-4" />
          </svg>
          <h3 className="text-4xl font-bold tracking-tight">FarmConnect</h3>
          <p className="mt-4 text-emerald-100 max-w-lg leading-relaxed">
            Connecting farmers and consumers to bring the freshest produce from the field to your table.
          </p>
        </div>

        {/* Quick Links & Socials Section */}
        <div className="flex flex-col items-center space-y-6">
          {/* ✅ Internal links with react-router-dom */}
          <ul className="flex flex-wrap justify-center space-x-6 text-base font-medium">
            <li>
              <Link to="/products" className="hover:text-yellow-300 transition-colors duration-200">
                Products
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-yellow-300 transition-colors duration-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-300 transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-yellow-300 transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>

          {/* Social Links (External) */}
          <div className="flex space-x-6 text-emerald-200">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 
                  1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 
                  2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.76.01 3.7.054.87.04 
                  1.49.172 2.07.4.58.232 1.08.57 1.57 
                  1.06.49.49.82 1.0.82 1.57.228.58.36 
                  1.2.4 2.07.045.94.054 1.27.054 3.7s-.01 
                  2.76-.054 3.7c-.04.87-.172 1.49-.4 
                  2.07-.232.58-.57 1.08-1.06 1.57-.49.49-1.0.82-1.57 
                  1.06-.58.228-1.2.36-2.07.4-.94.045-1.27.054-3.7.054s-2.76-.01-3.7-.054c-.87-.04-1.49-.172-2.07-.4-.58-.232-.57-1.08-1.57-1.06-.49-.49-.82-1.0-.82-1.57-.228-.58-.36-1.2-.4-2.07-.045-.94-.054-1.27-.054-3.7s.01-2.76.054-3.7c.04-.87.172-1.49.4-2.07.232-.58.57-1.08 
                  1.06-1.57.49-.49 1.0-.82 1.57-1.06.58-.228 1.2-.36 
                  2.07-.4.94-.045 1.27-.054 3.7-.054zM12.315 10.5c-.99 
                  0-1.785.795-1.785 1.785s.795 1.785 
                  1.785 1.785c.99 0 1.785-.795 
                  1.785-1.785s-.795-1.785-1.785-1.785z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-yellow-300 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.297 10.02a6.3 6.3 0 01-1.89.516 4.3 4.3 
                  0 001.886-.718 2.15 2.15 0 
                  01-1.92-1.468 2.15 2.15 0 
                  00.98.046 2.147 2.147 0 
                  01-1.722-.65 2.15 2.15 0 
                  01-.41-1.696c0-.022.01-.044.01-.066a6.11 6.11 
                  0 004.42 2.21 2.15 2.15 0 
                  01-.1.492 2.15 2.15 0 
                  01-2.05 1.54c-.16 0-.31-.01-.46-.04a6.22 
                  6.22 0 005.13-2.61 6.2 6.2 0 
                  00.32-3.13c0-.13-.01-.26-.03-.38a2.15 
                  2.15 0 00.91-1.25 2.15 2.15 
                  0 01-1.57.848 2.15 2.15 0 
                  00-.7-.146 2.15 2.15 0 
                  01-1.99-1.394 2.15 2.15 0 
                  00-.47-.84 2.15 2.15 0 
                  01-.996-.864 6.21 6.21 0 
                  00-4.965-2.585 6.2 6.2 0 
                  00-2.81 1.05" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-12 pt-8 border-t border-emerald-500">
        <p className="text-sm text-emerald-100">
          &copy; {new Date().getFullYear()} FarmConnect. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
