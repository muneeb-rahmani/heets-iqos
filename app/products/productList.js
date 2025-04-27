"use client";
import React, { useState } from "react";
import ProductCard from "../components/Products/product-card";
import HeroSection from "../components/Header";
import { useCart } from "../context/cartProvider";

const ProductList = ({ data }) => {
  // console.log(productData, 'check product data')
    const { setIsCartOpen } = useCart();
    const [quantity, setQuantity] = useState({});
    const updateQuantity = (id, change) => {
      // console.log(id, change, 'what is happening')
      setQuantity((prev) => ({
        ...prev,
        [id]: Math.max((prev[id] || 1) + change, 1),
      }));
    };
    // console.log(productData, "productData from homepage");
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
      setIsCartOpen(true)
      setQuantity(1);
    };
  return (
    <div>
      {/* <HeroSection 
        header={data?.acf_fields.h1title} 
        featureImg={data?.acf_fields.hero_section_png_image} 
        shortDesc={data?.acf_fields.shortdiscription}
      /> */}
      <header className="bg-black">
        <div className="container w-100 flex justify-center flex-col items-center mx-auto p-6">
          <h1 className="text-3xl font-semibold text-white">Products</h1>
          <h2 className="text-xl italic font-medium text-white">Get upto 45% Discount on Products, Order Now & Get Instant Delivery</h2>
        </div>
      </header>

      <section className="odd:bg-white py-4 even:bg-[#f1f1f1]">
        <div className="container mx-auto px-4">
          <div>
            <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data?.map((item, index) => (
                <ProductCard
                  key={index}
                  title={item?.product_name}
                  image={item?.product_image || ""}
                  productUrl={`/products/${item?.product_slug}`}
                  price={item?.sale_price}
                  // rating={item?.average_rating}
                  reviews={item?.total_reviews}
                  details={
                    item?.stock_status === "instock"
                      ? "In Stock"
                      : "Out of Stock"
                  }
                  isDisabled={item?.stock_status === "instock" ? false : true}
                  // origin={product?.proorigincard}
                  id={item?.product_id}
                  quantity={quantity[item?.product_id] || 1}
                  reviewCount={item?.total_reviews}
                  soldItems={item?.total_sold}
                  originalPrice={item?.regular_price}
                  onAddCart={() =>
                    addToCart(
                      item?.product_id,
                      item?.product_name,
                      item?.sale_price,
                      item?.product_image
                    )
                  }
                  incrementQuantity={() => updateQuantity(item?.product_id, 1)}
                  decrementQuantity={() => updateQuantity(item?.product_id, -1)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductList;
