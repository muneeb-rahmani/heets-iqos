"use client";
import React, { useState } from "react";
import HeroSection from "../components/Header";
import ProductCard from "../components/Products/product-card";
import { useCart } from "../context/cartProvider";

const AlAin = ({ productData, metaData }) => {
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
    setIsCartOpen(true)
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
    "Shop"
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
    "IQOS ILUMA Prime"
  ]


  return (
    <div>
      <HeroSection header={metaData[0]?.meta_data?.cat_h1_tag[0] || ""} featureImg={metaData[0]?.meta_data?.Cat_Hero_Section_PNG[0] || ""} />
      {productData
        .filter(item => includedCategories.includes(item.category)) // Exclude unwanted categories
        .map((item, index) => (
          item.products.length > 0 && (
            <section key={index} className="odd:bg-white py-4 even:bg-[#f1f1f1]">
              <div className="container mx-auto px-4">
                <div>
                  {item.products.length > 0 && (
                    <div className="flex flex-col items-center justify-center mb-6">
                      <h2 className={`text-3xl font-bold text-center ${index !== 0 ? "mt-10" : ""}`}>
                        {item.category}
                      </h2>
                      <span className="w-[100px] border-b-red-800 h-2 border-b-4"></span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {item.products.map((product) => (
                      product.stock_status === "instock" && (
                      <ProductCard
                        key={product.id}
                        title={product.name}
                        image={product.images[0]?.src || ""}
                        productUrl={`/products/${product.slug}`}
                        price={product.price}
                        rating={product.average_rating}
                        reviews={product.rating_count}
                        details={product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                        isDisabled={product.stock_status === "instock" ? false : true}
                        origin={product?.meta_data?.find(item => item.key === "proorigincard")?.value}
                        id={product.id}
                        quantity={quantity[product.id] || 1}
                        reviewCount={product.rating_count}
                        soldItems={product?.total_sales}
                        originalPrice={product?.regular_price}
                        onAddCart={() =>
                          addToCart(product.id, product.name, product.price, product.images[0]?.src)
                        }
                        incrementQuantity={() => updateQuantity(product.id, 1)}
                        decrementQuantity={() => updateQuantity(product.id, -1)}
                      />
                      )
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        ))}
        <div className="mt-8 myCategoryPage" dangerouslySetInnerHTML={{ __html: metaData[0]?.description }} />
    </div>
  );
};

export default AlAin;
