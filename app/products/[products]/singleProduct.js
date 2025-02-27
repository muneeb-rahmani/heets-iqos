"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { StarRating } from "../../components/Products/star-rating";
import { Button } from "@/components/ui/button";
import ProductCard from "../../components/Products/product-card";
import { useRouter } from "next/navigation";
import { ratingCalc } from "../../utils/common";
import { useCart } from "../../context/cartProvider";
import moment from "moment";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Heets Sticks", href: "/heets-sticks" },
  { label: "IQOS Heets Amber Label Selection", href: "#" },
];

const SingleProduct = ({
  serverData,
  reviews,
  relatedProducts,
  imagesData,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const { isCartOpen, setIsCartOpen } = useCart();
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  // console.log(imagesData, 'check imagesData')

  const router = useRouter();

  const updateQuantity = (id, change) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };

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
  const reviewsRating = ratingCalc(reviews);

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

  const tabs = [
    {
      id: "description",
      label: "Description",
      content: "Description content goes here...",
    },
    {
      id: "specification",
      label: "Specification",
      content: "Specification details...",
    },
    { id: "howToUse", label: "How To Use", content: "Usage instructions..." },
    { id: "faq", label: "Faq", content: "Frequently asked questions..." },
    { id: "reviews", label: `Reviews (${reviews.length})`, content: null },
  ];
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid md:grid-cols-2 gap-8 p-4">
          {/* Left Column - Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {imagesData?.map((image, index) => (
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
                    src={image.url || "/placeholder.svg"}
                    alt={`Product thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 p-4">
              <div className="relative aspect-square rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <Image
                  src={imagesData[selectedImage].url || "/placeholder.svg"}
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
                  rating={serverData?.meta_data?._wc_average_rating[0] || 0}
                  reviews={serverData?.meta_data?._wc_review_count[0] || 0}
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
                    {serverData?.total_sales}+{" "}
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
                  <span className="text-sm">SKU: {serverData?.sku}</span>
                )}
                <span className="text-sm">VENDOR: Heets IQOS UAE</span>
                <span className="text-sm">
                  AVAILABILITY:{" "}
                  {serverData?.stock_status == "instock"
                    ? "In Stock"
                    : "Out of stock"}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-800">
                  AED {serverData?.price}
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
                >
                  <Minus className="h-3 w-3 text-white" />
                </button>
                <span className="px-4 py-1">
                  {quantity[serverData.id] || 1}
                </span>
                <button
                  onClick={() => updateQuantity(serverData.id, 1)}
                  className="px-3 h-10 w-10 rounded-lg py-1 border-l bg-[#8b2c2a] hover:bg-[#712322]"
                >
                  <Plus className="h-3 w-3 text-white" />
                </button>
              </div>
              <button
                onClick={() =>
                  addToCart(
                    serverData.id,
                    serverData.name,
                    serverData.price,
                    serverData.images[0]?.src
                  )
                }
                className="flex-1 bg-[#8b2c2a] rounded-lg text-white py-2 hover:bg-red-900 transition-colors"
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
            <h3 className="text-3xl font-bold mb-6">Description</h3>
            <div className="mx-auto">
              <p
                dangerouslySetInnerHTML={{ __html: serverData?.description }}
              ></p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold">Reviews</h3>
              <p className="text-4xl font-bold my-3">{serverData?.meta_data?._wc_average_rating[0] || 0 }</p>
              <h4 className="text-2xl font-bold">
                {serverData?.name} {`(${reviews.length} Reviews)`}
              </h4>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex gap-4 items-start bg-[#efefef] p-6 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center text-xl font-semibold">
                    {review.reviewer.substring(0, 1)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between relative">
                      <h3 className="font-semibold text-lg">
                        {review.reviewer}
                      </h3>
                      <span className="text-xs text-white absolute top-[-23px] px-2 py-1 bg-black rounded-b-lg right-3">
                      {moment(review.date_created).format('DD-MM-YYYY HH:mm:ss')}
                      </span>
                    </div>
                    <p
                      className="mt-2 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: review?.review }}
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
            {serverData?.categories[0]?.name}
            <div className="w-20 h-1 bg-red-800 mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.name}
                image={product.images[0]?.src || ""}
                productUrl={`/${product.slug}`}
                price={product.price}
                id={product.id}
                rating={product.average_rating}
                reviews={product.rating_count}
                details={
                  product.stock_status === "instock" ? "In Stock" : false
                }
                quantity={quantity[product.id] || 1}
                reviewCount={product.rating_count}
                soldItems={product?.total_sales}
                onAddCart={() =>
                  addToCart(
                    product.id,
                    product.name,
                    product.price,
                    product.images[0]?.src
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

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm py-4 px-4 bg-gray-50">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
          <Link
            href={item.href}
            className={`hover:text-red-800 ${
              index === items.length - 1 ? "text-red-800" : "text-gray-600"
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}

// export function ImageGallery({ images }) {
//   const [selectedImage, setSelectedImage] = useState(0);

//   return (
//     <div className="flex gap-4">
//       {/* Thumbnails */}
//       <div className="flex flex-col gap-2">
//         {images.map((image, index) => (
//           <button
//             key={index}
//             onClick={() => setSelectedImage(index)}
//             className={`border-2 p-1 rounded-lg w-20 h-20 ${
//               selectedImage === index ? "border-red-800" : "border-gray-200"
//             }`}
//           >
//             <Image
//               src={image.src || "/placeholder.svg"}
//               alt={`Product thumbnail ${index + 1}`}
//               width={80}
//               height={80}
//               className="w-full h-full object-contain"
//             />
//           </button>
//         ))}
//       </div>

//       {/* Main Image */}
//       <div className="flex-1 p-4">
//         <div className="relative aspect-square rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
//           <Image
//             src={images[selectedImage].src || "/placeholder.svg"}
//             alt="Product main image"
//             fill
//             className="object-contain"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export function QuantitySelector({
//   quantity,
//   onIncrease,
//   onDecrease,
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <button
//         onClick={onDecrease}
//         className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-50"
//       >
//         -
//       </button>
//       <span className="w-12 text-center">{quantity}</span>
//       <button
//         onClick={onIncrease}
//         className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-50"
//       >
//         +
//       </button>
//     </div>
//   )
// }
