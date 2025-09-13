import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images from public folder
  const images = [
    "/images/vegetables1.jpg",
    "/images/farmerman.png",
    "/images/vegetables2.jpg",
    "/images/farmerwomen.png"
  ];

  return (
    <div className="bg-gradient-to-br from-lime-100 to-emerald-200 font-sans text-gray-800">
      {/* Hero Section */}
      <header className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] px-6 sm:px-10 lg:px-20 text-center flex flex-col items-center justify-center overflow-hidden">

        {/* Background images */}
        {images.map((img, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: currentImageIndex === index ? 1 : 0,
              zIndex: currentImageIndex === index ? 0 : -1,
              willChange: "opacity",
            }}
          >
            <div
              className="absolute inset-0 bg-black"
              style={{
                opacity: currentImageIndex === index ? 0.35 : 0.25,
                transition: "opacity 1500ms ease-in-out",
              }}
            ></div>
          </div>
        ))}

        {/* Left/Right Arrows */}
        <button
          onClick={() =>
            setCurrentImageIndex(
              (currentImageIndex - 1 + images.length) % images.length
            )
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
        >
          &#10094;
        </button>
        <button
          onClick={() =>
            setCurrentImageIndex((currentImageIndex + 1) % images.length)
          }
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white rounded-full p-2 hover:bg-opacity-50 transition"
        >
          &#10095;
        </button>

        {/* Slider dots */}
        <div className="absolute bottom-6 flex space-x-2 z-20">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-300 ${
                currentImageIndex === index ? "bg-white" : "bg-gray-400 opacity-50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            ></div>
          ))}
        </div>

        {/* Text overlay */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-4">
            Fresh from the Farm, to Your Table
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl">
            Connecting local farmers with consumers for fresh, quality produce.
          </p>
          <div className="flex space-x-4">
  <Link to="/products">
    <button className="px-8 py-4 rounded-full text-lg font-bold text-emerald-700 bg-white hover:bg-gray-100">
      Explore Products
    </button>
  </Link>
  <Link to="/register">
    <button className="px-8 py-4 rounded-full text-lg font-bold text-white border-2 border-white hover:bg-white hover:text-emerald-700">
      Join as a Farmer
    </button>
  </Link>
</div>

        </div>
      </header>

      {/* Features / Cards Section */}
      <section className="py-12 px-6 sm:px-10 lg:px-20">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-700 mb-10">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center text-emerald-500 mb-4">
              <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Support Local</h3>
            <p className="text-gray-600">
              Directly support farmers in your community and help them thrive.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center text-emerald-500 mb-4">
              <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Guaranteed Freshness</h3>
            <p className="text-gray-600">
              Our produce is harvested at its peak and delivered to you quickly.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-center text-emerald-500 mb-4">
              <svg className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Simple & Convenient</h3>
            <p className="text-gray-600">
              Browse products, place orders, and pay with just a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-white rounded-2xl shadow-2xl max-w-4xl mx-auto py-12 px-6 sm:px-10 lg:px-20 text-center mt-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Whether you're a farmer or a consumer seeking fresh produce, we have you covered.
        </p>
        <Link to="/register">
          <button className="px-8 py-4 rounded-full text-lg font-bold text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300">
            Join the Community
          </button>
        </Link>
      </section>
    </div>
  );
}
