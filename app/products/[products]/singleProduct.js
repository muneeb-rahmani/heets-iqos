"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { StarRating } from "../../components/Products/star-rating";
import ProductCard from "../../components/Products/product-card";
import { useRouter } from "next/navigation";
import { getSlug } from "../../utils/common";
import { useCart } from "../../context/cartProvider";
import moment from "moment";
import config from "@/lib/config";



const SingleProduct = ({
  serverData,
  breadCrumb,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const { isCartOpen, setIsCartOpen } = useCart();
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  // console.log(serverData, 'check product page')
  const sliderHeight = useRef(null);
  const router = useRouter();

  const updateQuantity = (id, change) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };

  useEffect(() => {
    if(sliderHeight.current) {
      setImgHeight(sliderHeight.current.clientHeight);
    }
  }, [imgHeight]);

  const addToCart = (id, name, price, image) => {
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
    setIsCartOpen(true);
    setQuantity(1);
  };


  const handleBuyNow = (id, name, price, image) => {
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
    router.push("/checkout");
  };



  const parentSlug = getSlug(breadCrumb?.parent_category?.url, 'split'); 
  const subSlug    = getSlug(breadCrumb?.subcategories?.[0]?.url, 'split');     

  return (
    <>
      <Breadcrumb
        category={breadCrumb?.parent_category.name || ""}
        categoryUrl={`/${parentSlug}` || "#"}
        subCategory={breadCrumb?.subcategories?.[0]?.name || ""}
        subCategoryUrl={`/${parentSlug}/${subSlug}` || "#"}
        product={serverData?.name || ""}
      />
      {/* <nav className=" space-x-2 text-sm py-4 px-4 bg-gray-50">
      <div class="containerBreadcrumb">
        <ul
          class="breadcrumb"
          itemType="https://schema.org/BreadcrumbList"
        >
          <li>
              <Link
                itemProp="itemListElement"
                itemScope=""
                itemType="https://schema.org/ListItem"
                href="/"
              >
                <meta itemProp="position" content="1" />
                <meta itemProp="name" content="Home" />
                <meta itemProp="item" content="/" />
                Home
              </Link>
            </li>
          {serverData?.breadcrumbs?.map((item, index) => (
            <li>
              <Link
                itemProp="itemListElement"
                itemScope=""
                itemType="https://schema.org/ListItem"
                href={`${config.mainifest.url}${getSlug(item.url, "split")}`}
              >
                <meta itemProp="position" content={index} />
                <meta itemProp="name" content={item.name} />
                <meta itemProp="item" content={`${config.mainifest.url}${getSlug(item.url, "split")}`} />
                {item.name}
              </Link>
            </li>
          ))}

        </ul>
      </div>
    </nav> */}
      <div className="max-w-full mx-auto md:max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 p-4">
          {/* Left Column - Image Gallery */}
          <div className="flex gap-4 flex-col-reverse md:flex-row max-w-[90vw] w-full md:max-w-none">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-row md:flex-col gap-2 pr-3 overflow-x-auto md:overflow-y-auto" style={{ maxHeight: imgHeight}}>
              {serverData?.images && serverData?.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 p-1 rounded-lg w-20 h-20 ${
                    selectedImage === index
                      ? "border-red-800"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-scale-down md:object-contain"
                  />
                </button>
              ))}
            </div>
            
            {/* Mobile: Horizontal Thumbnails (Below main image) */}
            <div className="md:hidden w-full overflow-x-auto">
              <div className="flex gap-2 pb-2" style={{ minWidth: `${serverData?.images?.length * 88}px` }}>
                {serverData?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 p-1 rounded-lg w-20 h-20 flex-shrink-0 ${
                      selectedImage === index ? "border-red-800" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main Image */}
            <div className="flex-1 p-4">
              <div ref={sliderHeight} className="relative aspect-square rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <Image
                  src={serverData?.images && serverData?.images[selectedImage] || "/placeholder.svg"}
                  alt="Product main image"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">{serverData?.name}</h1>

            <div className="space-y-2">
              <div className="flex items-start">
                <StarRating
                  rating={serverData?.average_rating || 0}
                  reviews={serverData?.reviews.length || 0}
                  productPage={true}
                  isRating={false}
                  isCustomerReview={false}
                />
              </div>
              <div className="flex items-center gap-2 border-2 p-2 rounded-md text-sm">
                <Image
                  src="/imgs/good-choice-products.webp"
                  alt="award"
                  width={10}
                  height={10}
                  className="w-4 h-4 text-yellow-500"
                />
                <p className="">
                  Good purchase!
                  <span className="text-primary text-md font-bold">
                    {" "}
                    {serverData?.total_sold}+{" "}
                  </span>
                  sold in past month
                  <br />
                  Genuine, Factory-Sealed, and Unopened
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {serverData?.sku && (
                  <span className="text-[10px] md:text-sm">SKU: {serverData?.sku}</span>
                )}
                <span className="text-[10px] md:text-sm">VENDOR: {serverData?.vendor}</span>
                <span className="text-[10px] md:text-sm">
                  AVAILABILITY:{" "}
                  {serverData?.stock_status == "instock"
                    ? "In Stock"
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-800">
                  AED {serverData?.sale_price}
                </span>
                {serverData?.regular_price && (
                  <span className="text-lg  line-through">
                    AED {serverData?.regular_price}
                  </span>
                )}
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: serverData?.short_description,
              }}
            />

            <div className="flex items-center gap-4">
              <div className="flex items-center  rounded">
                <button
                  onClick={() => updateQuantity(serverData.id, -1)}
                  className="px-3 h-10 w-10 py-1 rounded-lg border-r bg-[#8b2c2a] hover:bg-[#712322]"
                  ariaLabel="Product Quantity Minus"
                >
                  <Minus className="h-3 w-3 text-white" />
                </button>
                <span className="px-4 py-1">
                  {quantity[serverData.id] || 1}
                </span>
                <button
                  onClick={() => updateQuantity(serverData.id, 1)}
                  className="px-3 h-10 w-10 rounded-lg py-1 border-l bg-[#8b2c2a] hover:bg-[#712322]"
                  ariaLabel="Product Quantity Plus"
                >
                  <Plus className="h-3 w-3 text-white" />
                </button>
              </div>
              <button
                disabled={serverData?.stock_status !== "instock"}
                onClick={() =>
                  addToCart(
                    serverData.id,
                    serverData.name,
                    serverData.sale_price,
                    serverData.main_image[0],
                  )
                }
                className={`flex-1 rounded-lg text-white py-2  transition-colors ${serverData?.stock_status !== "instock" ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-600' : 'bg-[#8b2c2a] hover:bg-red-900 cursor-pointer'}`}
              >
                {serverData?.stock_status === "instock"
                  ? "Add to Cart"
                  : "Out of Stock"}
              </button>
            </div>

            {/* <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">
              Read Review
            </button> */}

            <div className="flex items-center gap-2 border-2 p-2 rounded-md text-sm">
              <Image
                src="/imgs/age_18.webp"
                alt="award"
                width={50}
                height={50}
                className="text-yellow-500"
              />
              <p className="">
                Tobacco products can be purchased by persons who have reached
                the age of 18. Smoking harms your health.
              </p>
            </div>

            <div className="flex items-center gap-2 border-2 p-2 rounded-md text-sm">
              <Image
                src="/imgs/payment_options.webp"
                alt="award"
                width={37}
                height={37}
                className="text-yellow-500"
              />
              <p>
                <strong>Payment</strong> Payment upon receipt of goods, online
                card, Google Pay, Apple Pay At the moment, the use of bonuses
                for this product is not available.
              </p>
            </div>
          </div>
        </div>

        <div className="tab-content p-6">
          <div className=" text-gray-900 p-4 md:p-8">
            <div className="mx-auto">
              <div
                className="descContainer"
                dangerouslySetInnerHTML={{
                  __html: serverData?.description,
                }}
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold">{serverData?.name} Reviews</h3>
              <div className="flex gap-4 items-end my-3">
                <p className="text-4xl font-bold">
                  {serverData?.meta_data?._wc_average_rating[0] || 0}
                  <span className="text-gray-500"> / 5</span>
                </p>
                <StarRating
                  // rating={serverData?.meta_data?._wc_average_rating[0] || 0}
                  reviews={serverData?.reviews.length || 0}
                  isRating={false}
                />
              </div>
            </div>

            
            <div className="space-y-6">
              {serverData?.reviews.map((review) => (
                <div
                  key={review.date}
                  className="flex gap-4 items-start bg-[#efefef] p-6 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center text-xl font-semibold">
                    {review.author.substring(0, 1)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between relative">
                      <h3 className="font-semibold text-lg">
                        {review.author}
                      </h3>
                      <span className="text-xs text-white absolute top-[-23px] px-2 py-1 bg-black rounded-b-lg right-3">
                        {moment(review.date).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                      </span>
                    </div>
                    <p
                      className="mt-2 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: review?.content }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="py-12 bg-[#f1f1f1]">
        <div className="px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            {serverData?.categories[0]}
            <div className="w-20 h-1 bg-red-800 mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {serverData?.related_products.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                image={product.image || ""}
                productUrl={`/products/${product.slug}`}
                price={product.sale_price}
                id={product.id}
                rating={product.average_rating}
                reviews={product.total_reviews}
                details={product.stock_status === "instock" ? "In Stock" : "Out of Stock"}
                isDisabled={product.stock_status === "instock" ? false : true}
                quantity={quantity[product.id] || 1}
                reviewCount={product.total_reviews}
                soldItems={product?.total_sold}
                originalPrice={product?.regular_price}
                onAddCart={() =>
                  addToCart(
                    product.id,
                    product.name,
                    product.sale_price,
                    product.image
                  )
                }
                incrementQuantity={() => updateQuantity(product.id, 1)}
                decrementQuantity={() => updateQuantity(product.id, -1)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleProduct;

export function Breadcrumb({
  category,
  categoryUrl,
  subCategory,
  subCategoryUrl,
  product,
  productUrl,
}) {
  return (
    <nav className=" space-x-2 text-sm py-4 px-4 bg-gray-50">
      <div className="containerBreadcrumb">
        <ul
          className="breadcrumb"
          itemType="https://schema.org/BreadcrumbList"
        >
          <li>
            <Link
              itemProp="itemListElement"
              itemScope=""
              itemType="https://schema.org/ListItem"
              href="/"
            >
              <meta itemProp="position" content="1" />
              <meta itemProp="name" content="Home" />
              <meta itemProp="item" content="/" />
              Home
            </Link>
          </li>
          <li>
            <Link
              itemProp="itemListElement"
              itemScope=""
              itemType="https://schema.org/ListItem"
              href={categoryUrl || "#"}
            >
              <meta itemProp="position" content="2" />
              <meta itemProp="name" content="Heets Sticks" />
              <meta
                itemProp="item"
                content={categoryUrl || "#"}
              />
              {category}
            </Link>
          </li>
          <li>
            <Link
              itemProp="itemListElement"
              itemScope=""
              itemType="https://schema.org/ListItem"
              href={subCategoryUrl || "#"}
            >
              <meta itemProp="position" content="2" />
              <meta itemProp="name" content="Heets Sticks" />
              <meta
                itemProp="item"
                content={subCategoryUrl || "#"}
              />
               {subCategory}
            </Link>
          </li>
          <li>
            <span
              itemProp="itemListElement"
              itemScope=""
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content="3" />
              <meta
                itemProp="name"
                content={product}
              />
              {product}
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
