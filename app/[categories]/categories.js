"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/Header";
import { useCart } from "../context/cartProvider";
import Link from "next/link";
import { getSlug } from "../utils/common";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCard = dynamic(() => import("../components/Products/product-card"), { ssr: false, loading: () => <Skeleton className="h-[500px] w-full rounded-lg" /> });
const Categories = ({ categoryData,subCategory }) => {
  // console.log(productData, "productData");
  const { setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState({});
  const [visibleSections, setVisibleSections] = useState(4);
  const [observerTriggered, setObserverTriggered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });
  const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      if (inView && !observerTriggered) {
        setVisibleSections((prev) => prev + 4); // Or 1 based on your preference
        setObserverTriggered(true); // Prevent future triggers
      }
    }, [inView, observerTriggered]);
  
    useEffect(() => {
      const timeout = setTimeout(() => setShowContent(true), 3000);
      // Load content when main thread is idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setShowContent(true));
      } else {
        setTimeout(() => setShowContent(true), 0);
      }
      // console.log(categoryData.products, "categoryData?.products")
        return () => clearTimeout(timeout);
    }, []);
    

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
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mt-8 mb-4">
          {subCategory?.map((item, index) => (
            <Link prefetch={false} key={index} className="my-0 md:my-8" href={`${getSlug(item.url, "split")}/`}>
              <p className="mx-auto text-white text-[15px] text-center leading-normal bg-gradient-to-r from-[#ff6f6f] to-[#8b2c2a] px-4 py-5 rounded w-fit h-[35px] flex justify-center items-center">
               {item.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoryData?.products
              ?.filter(item => item.stock_status === "instock")
              ?.slice(0, visibleSections)
              ?.map((item, index) => (
                <ProductCard
                  key={index}
                  title={item?.product_name}
                  image={item?.product_image || ""}
                  productUrl={`/products/${item.product_slug}`}
                  rating={item?.average_rating}
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
                  isH2={true}
                />
              ))}
        </div>

        {!observerTriggered && <div ref={ref} className="h-10"></div>}

        {showContent && (
          <div className="mt-8 myCategoryPage" dangerouslySetInnerHTML={{ __html: categoryData?.category_details?.cat_description }} />
        )}

      </section>
      {categoryData?.schema_data && (
        <script
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryData?.schema_data),
        }}
        />
      )}
    </div>
  );
};

export default Categories;
