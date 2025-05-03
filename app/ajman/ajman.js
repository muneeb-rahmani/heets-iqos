"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/Header";
import { useCart } from "../context/cartProvider";
import { useInView } from "react-intersection-observer";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCard = dynamic(() => import("../components/Products/product-card"), { ssr: false, loading: () => <Skeleton className="h-[500px] w-full rounded-lg" /> });


const Ajman = ({ productData }) => {
 const { setIsCartOpen } = useCart();
 const [quantity, setQuantity] = useState({});
 const [visibleSections, setVisibleSections] = useState(4);
 const { ref, inView } = useInView({ threshold: 0 });
 const [showContent, setShowContent] = useState(false);

 useEffect(() => {
   if (inView && visibleSections < productData?.products?.length) {
     setVisibleSections((prev) => Math.min(prev + 4, productData?.products?.length));
   }
 }, [inView, visibleSections, productData?.products?.length]);
 

 // homepage.js
 useEffect(() => {
   const timeout = setTimeout(() => setShowContent(true), 3000);
   // Load content when main thread is idle
   if ('requestIdleCallback' in window) {
     requestIdleCallback(() => setShowContent(true));
   } else {
     setTimeout(() => setShowContent(true), 0);
   }
     return () => clearTimeout(timeout);
 }, []);
 
 const updateQuantity = (id, change) => {
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
   setIsCartOpen(true);
   setQuantity(1);
 };


  return (
    <div>
      <HeroSection
        header={productData?.custom_fields?.cat_h1_tag || ""}
        featureImg={productData?.custom_fields?.Cat_Hero_Section_PNG || ""}
        shortDesc={productData?.custom_fields?.cat_short_discription || ""}
      />
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productData?.products?.slice(0, visibleSections)?.map((product, index) => (
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
              isH2={true}
            />
          ))}
        </div>
        {visibleSections < productData?.products?.length && (
          <div ref={ref} className="h-10" />
        )}
      </section>
      {showContent && (
      <div
        className="mt-8 myCategoryPage"
        dangerouslySetInnerHTML={{ __html: productData?.category_details?.cat_description }}
        suppressHydrationWarning
      />
      )}
      {productData?.schema_data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productData?.schema_data),
          }}
          strategy="afterInteractive"
        />
      )}
    </div>
  );
};

export default Ajman;
