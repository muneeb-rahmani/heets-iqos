"use client";
import React, { useState } from "react";

import { unserialize } from "php-serialize";
import HeroSection from "@/app/components/Header";
import ProductCard from "@/app/components/Products/product-card";
import { useCart } from "@/app/context/cartProvider";

const CategoryProduct = ({ productData, categoryData }) => {
  console.log(productData, "CategoryProduct");
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
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productData.map((item, index) => {
            const {_harikrutfiwu_url} = item?.meta_data || {};
            const image = Array.isArray(_harikrutfiwu_url) && _harikrutfiwu_url.length > 0 
                            ? unserialize(_harikrutfiwu_url?.[0]) 
                            : null;
            // console.log(image, 'check image')
            return (
            <ProductCard
              key={index}
              title={item.name}
              image={image?.img_url || ""}
              productUrl={`/products/${item.slug}`}
              rating={item?.meta_data?._wc_average_rating?.[0]}
              reviews={item?.meta_data?._wc_review_count?.[0]}
              price={item.price}
              id={item.id}
              details={item.stock_status === "instock" ? "In Stock" : false}
              quantity={quantity[item.id] || 1}
              reviewCount={item.rating_count}
              origin={item?.meta_data?.proorigincard?.[0]}
              soldItems={item?.total_sales}
              onAddCart={() =>
                addToCart(item.id, item.name, item.price, image?.img_url)
              }
              incrementQuantity={() => updateQuantity(item.id, 1)}
              decrementQuantity={() => updateQuantity(item.id, -1)}
            />
          )})}
        </div>
        <div className="mt-8">
          <p dangerouslySetInnerHTML={{ __html: categoryData[0]?.description }}></p>
        </div>
      </section>
    </div>
  );
};

export default CategoryProduct;
