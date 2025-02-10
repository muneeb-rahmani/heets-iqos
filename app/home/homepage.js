"use client";
import React, { useState } from "react";
import HeroSection from "../components/Header";
import ProductCard from "../components/Products/product-card";
import { useCart } from "../context/cartProvider";

const HomePage = ({ productData }) => {
  const { setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState({});
  const updateQuantity = (id, change) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };
  // console.log(productData, "productData from homepage");
  const addToCart = (id, name, price, image) => {
    console.log("Add to Cart clicked");
    const cartObj = {
      id,
      quantity: quantity[id] || 1,
      name,
      price,
      image,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIndex = existingCart.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      existingCart[itemIndex].quantity += cartObj.quantity;
    } else {
      existingCart.push(cartObj);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    // setIsCartModalOpen(true);
    setIsCartOpen(true)
    setQuantity(1);
  };

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
      {productData.map((item, index) => (
        item.products.length > 0 && (
        <section className=" odd:bg-white py-4 even:bg-[#f1f1f1]">
          <div className="container mx-auto px-4">
            <div key={index} className="">
              {item.products.length > 0 && (
                <>
                  <div className="flex flex-col items-center justify-center mb-6">
                    <h2
                      className={`text-3xl font-bold text-center ${
                        index !== 0 ? "mt-10" : ""
                      }`}
                    >
                      {item.category}
                    </h2>
                    <span className="w-[100px] border-b-red-800 h-2 border-b-4 "></span>
                  </div>
                </>
              )}
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {item.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.name}
                    image={product.images[0]?.src || ""}
                    productUrl={product.slug}
                    price={product.price}
                    id={product.id}
                    quantity={quantity[product.id] || 1}
                    reviewCount={product.rating_count}
                    onAddCart={() =>
                      addToCart(
                        product.id,
                        product.name,
                        product.price,
                        product.images[0]?.src
                      )
                    }
                    incrementQuantity={() => updateQuantity(product.id, 1)}
                    decrementQuantity={() => updateQuantity(product.id, -1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        )
      ))}
    </div>
  );
};

export default HomePage;
