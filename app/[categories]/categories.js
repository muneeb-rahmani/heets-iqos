"use client";
import React, { useState } from "react";
import HeroSection from "../components/Header";
import ProductCard from "../components/Products/product-card";
import { useCart } from "../context/cartProvider";

const Categories = ({ productData }) => {
  console.log(productData, "productData");
  const { setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState({});
  const updateQuantity = (id, change) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };
  // console.log(productData, "productData");
  const addToCart = (id, name, price, image) => {
    // console.log("Add to Cart clicked");
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
    setIsCartOpen(true);
    setQuantity(1);
  };

  return (
    <div>
      <HeroSection header={productData[0]?.categories[0]?.name} />
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productData.map((item, index) => (
            <ProductCard
              key={index}
              title={item.name}
              image={item?.images?.src || ""}
              productUrl={`products/${item.slug}`}
              rating={item.average_rating}
              reviews={item.rating_count}
              price={item.price}
              id={item.id}
              details={item.stock_status === "instock" ? "In Stock" : false}
              quantity={quantity[item.id] || 1}
              reviewCount={item.rating_count}
              onAddCart={() =>
                addToCart(item.id, item.name, item.price, item.images[0]?.src)
              }
              incrementQuantity={() => updateQuantity(item.id, 1)}
              decrementQuantity={() => updateQuantity(item.id, -1)}
            />
          ))}
        </div>
        <div className="mt-8">
          <p dangerouslySetInnerHTML={{ __html: productData[0]?.description }}></p>
        </div>
      </section>
    </div>
  );
};

export default Categories;
