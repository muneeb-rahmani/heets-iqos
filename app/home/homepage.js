"use client";
import React from "react";
import HeroSection from "../components/Header";
import ProductCard from "../components/Products/product-card";

const HomePage = () => {
  const products = [
    {
      name: "Heets Amber Selection",
      currentPrice: 89,
      originalPrice: 120,
      rating: 4.1,
      reviews: 21,
      origin: "Kazakhstan",
      details: "200 Sticks | Woody Nutty",
      imageUrl: "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
    },
    {
      name: "Heets Silver Selection",
      currentPrice: 89,
      originalPrice: 120,
      rating: 4.2,
      reviews: 15,
      origin: "Kazakhstan",
      details: "200 Sticks | Light Breeze",
      imageUrl: "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
    },
    {
      name: "Heets Turquoise Selection",
      currentPrice: 89,
      originalPrice: 120,
      rating: 4,
      reviews: 21,
      origin: "Kazakhstan",
      details: "200 Sticks | Mint Menthol",
      imageUrl: "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
    },
  ];

  return (
    <div>
      <HeroSection />
      <section className="py-12 bg-[#f1f1f1]">
        <div className="px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Heets Classic Kazakhstan Sticks
            <div className="w-20 h-1 bg-red-800 mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
