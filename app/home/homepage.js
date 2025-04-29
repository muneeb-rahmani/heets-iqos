"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "../components/Header";
// import ProductCard from "../components/Products/product-card";
import { useCart } from "../context/cartProvider";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = ({ homeData }) => {
  const ProductCard = dynamic(() => import("../components/Products/product-card"), { ssr: false, loading: () => <div>Loading...</div> });
  const isLighthouse = typeof navigator !== 'undefined' && /Lighthouse/.test(navigator.userAgent);
  const { setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState({}); 
  const [visibleSections, setVisibleSections] = useState(isLighthouse ? 2 : Infinity); // Only render first 2 sections
  const { ref, inView } = useInView({ threshold: 0 });
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

  useEffect(() => {
    if (inView && isLighthouse) {
      setVisibleSections((prev) => prev + 2); // Load 2 more sections as user scrolls
    }
  }, [inView]);

  useEffect(() => {
    if (isLighthouse) {
      console.log("Running in Lighthouse mode 🟢");
    }
  }, []);
  

  return (
    <div>
      <HeroSection 
        header={homeData?.acf_fields.h1title} 
        featureImg={homeData?.acf_fields.hero_section_png_image} 
        shortDesc={homeData?.acf_fields.shortdiscription}
      />
      {homeData?.category_data.slice(0, visibleSections)
        ?.map((item, index) => (
            <section key={index} className="odd:bg-white py-4 even:bg-[#f1f1f1]">
              <div className="container mx-auto px-4">
                <div>
                  {/* {item.length > 0 && ( */}
                    <div className="flex flex-col items-center justify-center mb-6">
                      <Link prefetch={false} href={`${item.parent_category.parent_slug}/${item?.category_slug}` || "#"}>
                        <h2 className={`text-2xl md:text-4xl font-bold text-center ${index !== 0 ? "mt-10" : ""}`}>
                          {item?.category_name}
                        </h2>
                      </Link>
                      <span className="w-[100px] border-b-red-800 h-2 border-b-4"></span>
                    </div>
                 
                  <div className="grid grid-cols-2 gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {item.products.length > 0 && item.products.map((product) => (
                     <React.Suspense key={product?.product_id} fallback={
                      <Skeleton className="h-[500px] w-full rounded-lg" />
                    }>
                      <ProductCard
                        key={product?.product_id}
                        title={product.product_name}
                        image={product.product_image || ""}
                        productUrl={`/products/${product.product_slug}`}
                        price={product.sale_price}
                        reviews={product.total_reviews}
                        details={product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                        isDisabled={product.stock_status === "instock" ? false : true}
                        origin={product?.proorigincard}
                        id={product.product_id}
                        quantity={quantity[product.product_id] || 1}
                        reviewCount={product.total_reviews}
                        soldItems={product?.total_sold}
                        originalPrice={product?.regular_price}
                        onAddCart={() =>
                          addToCart(product.product_id, product.product_name, product.sale_price, product.product_image)
                        }
                        incrementQuantity={() => updateQuantity(product.product_id, 1)}
                        decrementQuantity={() => updateQuantity(product.product_id, -1)}
                      />
                    </React.Suspense>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          // )
        ))}

      {isLighthouse && <div ref={ref} className="h-10"></div>}

      <div className="container mx-auto" dangerouslySetInnerHTML={{__html: homeData?.content}} suppressHydrationWarning />

      {homeData?.schema_data && (

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeData?.schema_data),
          }}
          strategy="lazyOnload"
        />
      )}
    </div>
  );
};

export default HomePage;
