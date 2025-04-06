"use client";
import React, { useState } from "react";

import { unserialize } from "php-serialize";
import HeroSection from "@/app/components/Header";
import ProductCard from "@/app/components/Products/product-card";
import { useCart } from "@/app/context/cartProvider";

const CategoryProduct = ({ productData, categoryData }) => {
  // console.log(productData, "CategoryProduct");
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
       <HeroSection
          header={categoryData?.custom_fields?.cat_h1_tag || ""}
          featureImg={categoryData?.custom_fields?.Cat_Hero_Section_PNG || ""}
          shortDesc={categoryData?.custom_fields?.cat_short_discription || ""}
        />
        <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryData?.products?.map((item, index) => (
            <ProductCard
              key={index}
              title={item?.product_name}
              image={item?.product_image || ""}
              productUrl={`/products/${item.product_slug}`}
              // rating={item?.meta_data?._wc_average_rating?.[0]}
              reviews={item?.total_reviews}
              price={item.sale_price}
              id={item.product_id}
              details={item.stock_status === "instock" ? "In Stock" : "Out of Stock"}
              isDisabled={item.stock_status === "instock" ? false : true}
              quantity={quantity[item.product_id] || 1}
              origin={item?.custom_fields?.proorigincard}
              soldItems={item?.total_sold}
              originalPrice={item?.regular_price}
              onAddCart={() =>
                addToCart(item.product_id, item.product_name, item.sale_price, item?.product_image)
              }
              incrementQuantity={() => updateQuantity(item.product_id, 1)}
              decrementQuantity={() => updateQuantity(item.product_id, -1)}
            />
          ))}
        </div>
        <div className="mt-8" dangerouslySetInnerHTML={{ __html: categoryData?.category_details?.cat_description  }} />
      </section>
    </div>
  );
};

export default CategoryProduct;
