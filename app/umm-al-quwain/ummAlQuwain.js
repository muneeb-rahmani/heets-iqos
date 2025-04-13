"use client";
import React, { useState } from "react";
import HeroSection from "../components/Header";
import ProductCard from "../components/Products/product-card";
import { useCart } from "../context/cartProvider";

const UmmAlQuwain = ({ productData }) => {
  // console.log(productData, 'check product data')
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
    setIsCartOpen(true);
    setQuantity(1);
  };

  const excludedCategories = [
    "Heets classic Kazakhstan",
    "Terea from Japan",
    "Terea form Kazakhstan",
    "Terea form Indonesia",
    "Terea from UAE",
    "Terea from Armenia",
    "Iqos iluma one",
    "Iqos iluma prime",
    "Iqos iluma standard",
    "Shop",
  ];

  const includedCategories = [
    "Heets Classic Kazakhstan",
    "Terea Japan",
    "Terea Kazakhstan",
    "Terea Indonesia",
    "Terea UAE",
    "Terea Armenia",
    "IQOS ILUMA One",
    "IQOS ILUMA Standard",
    "IQOS ILUMA Prime",
  ];

  return (
    <div>
      <HeroSection
        header={productData?.custom_fields?.cat_h1_tag || ""}
        featureImg={productData?.custom_fields?.Cat_Hero_Section_PNG || ""}
        shortDesc={productData?.custom_fields?.cat_short_discription || ""}
      />
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productData?.products?.map((product, index) => (
            <ProductCard
              key={product.product_id}
              title={product.product_name}
              image={product.product_image || ""}
              productUrl={`/products/${product.product_slug}`}
              price={product.sale_price}
              rating={product.average_rating}
              reviews={product.total_reviews}
              details={
                product.stock_status === "instock" ? "In Stock" : "Out of Stock"
              }
              isDisabled={product.stock_status === "instock" ? false : true}
              origin={product?.custom_fields?.proorigincard}
              id={product.id}
              quantity={quantity[product.id] || 1}
              reviewCount={product.total_reviews}
              soldItems={product?.total_sold}
              originalPrice={product?.regular_price}
              onAddCart={() =>
                addToCart(
                  product.product_id,
                  product.product_name,
                  product.sale_price,
                  product.product_image
                )
              }
              incrementQuantity={() => updateQuantity(product.product_id, 1)}
              decrementQuantity={() => updateQuantity(product.product_id, -1)}
            />
          ))}
        </div>
      </section>
      <div
        className="mt-8 myCategoryPage"
        dangerouslySetInnerHTML={{ __html: productData?.category_details?.cat_description }}
      />
    </div>
  );
};

export default UmmAlQuwain;
