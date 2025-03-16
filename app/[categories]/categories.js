"use client";
import React, { useState } from "react";
import HeroSection from "../components/Header";
import ProductCard from "../components/Products/product-card";
import { useCart } from "../context/cartProvider";
import { unserialize } from "php-serialize";
import Link from "next/link";
import { getSlug } from "../utils/common";

const Categories = ({ productData, categoryData,subCategory }) => {
  // console.log(productData, "productData");
  const { setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState({});
  const updateQuantity = (id, change) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };
  // console.log(categoryData, "categoryData");
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
      {/* <div dangerouslySetInnerHTML={{ __html: productData[0]?.description }} /> */}
      {/* <HeroSection 
        header={productData[0]?.meta_data?.rank_math_title[0].replace('%term%',productData[0].name)} 
        featureImg={productData[0]?.meta_data?.Cat_Hero_Section_PNG[0]} /> */}
      <HeroSection
          header={categoryData?.[0]?.meta_data?.cat_h1_tag?.[0] || ""}
          featureImg={categoryData?.[0]?.meta_data?.Cat_Hero_Section_PNG?.[0] || ""}
          shortDesc={categoryData?.[0]?.meta_data?.cat_short_discription?.[0] || ""}
        />

      <section className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-4 mt-8 mb-4">
          {subCategory?.map((item, index) => (
            <Link key={index} className="my-8" href={getSlug(item.url, "split")}>
              <p className="mx-auto text-white text-[15px] text-center leading-normal bg-gradient-to-r from-[#ff6f6f] to-[#8b2c2a] px-4 py-5 rounded w-fit h-[35px] flex justify-center items-center">
               {item.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productData?.map((item, index) => {
            const { _harikrutfiwu_url } = item?.meta_data || {};
            const image =
              Array.isArray(_harikrutfiwu_url) && _harikrutfiwu_url.length > 0
                ? unserialize(_harikrutfiwu_url?.[0])
                : null;
            return (
              item.stock_status === "instock" && (
                <ProductCard
                  key={index}
                  title={item.name}
                  image={image?.img_url || ""}
                  productUrl={`/products/${item.slug}`}
                  rating={item?.meta_data?._wc_average_rating?.[0]}
                  reviews={item?.meta_data?._wc_review_count?.[0]}
                  price={item.price}
                  id={item.id}
                  details={item.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                  isDisabled={item.stock_status === "instock" ? false : true}
                  quantity={quantity[item.id] || 1}
                  origin={item?.meta_data?.proorigincard?.[0]}
                  soldItems={item?.total_sales}
                  originalPrice={item?.regular_price}
                  onAddCart={() =>
                    addToCart(item.id, item.name, item.price, image?.img_url)
                  }
                  incrementQuantity={() => updateQuantity(item.id, 1)}
                  decrementQuantity={() => updateQuantity(item.id, -1)}
                />
              )
            );
          })}
        </div>
        <div className="mt-8 myCategoryPage" dangerouslySetInnerHTML={{ __html: categoryData[0]?.description }} />
      </section>
    </div>
  );
};

export default Categories;
