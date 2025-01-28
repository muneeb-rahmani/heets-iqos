"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { StarRating } from "../components/Products/star-rating";
import { Button } from "@/components/ui/button";
import ProductCard from "../components/Products/product-card";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Heets Sticks", href: "/heets-sticks" },
  { label: "IQOS Heets Amber Label Selection", href: "#" },
];

const productImages = [
  "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
  "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
  "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
  "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
];

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
  { id: "reviews", label: "Reviews (21)", content: null },
];

const reviews = [
  {
    id: 1,
    name: "Bikey Barnwa",
    comment: "great",
    date: "09.10.2024",
    initial: "B",
  },
  {
    id: 2,
    name: "Bikey Barnwal",
    comment: "Amazing product",
    date: "09.10.2024",
    initial: "B",
  },
  {
    id: 3,
    name: "Rahul",
    comment: "Good product",
    date: "09.10.2024",
    initial: "R",
  },
];

const products = [
  {
    name: "Heets Amber Selection",
    currentPrice: 89,
    originalPrice: 120,
    rating: 4.1,
    reviews: 21,
    origin: "Kazakhstan",
    details: "200 Sticks | Woody Nutty",
    imageUrl: "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
  },
  {
    name: "Heets Silver Selection",
    currentPrice: 89,
    originalPrice: 120,
    rating: 4.2,
    reviews: 15,
    origin: "Kazakhstan",
    details: "200 Sticks | Light Breeze",
    imageUrl: "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
  },
  {
    name: "Heets Turquoise Selection",
    currentPrice: 89,
    originalPrice: 120,
    rating: 4,
    reviews: 21,
    origin: "Kazakhstan",
    details: "200 Sticks | Mint Menthol",
    imageUrl: "/imgs/heets-amber-selection-sticks-for-iqos-device.webp",
  },
];

const Page = () => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid md:grid-cols-2 gap-8 p-4">
          {/* Left Column - Image Gallery */}
          <ImageGallery images={productImages} />

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">
              IQOS Heets Amber Label Selection
            </h1>

            <div className="space-y-2">
              <StarRating rating={4.1} reviews={21} />
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
                  <span className="text-primary text-md font-bold"> 921+ </span>
                  sold in past month
                  <br />
                  Genuine, Factory-Sealed, and Unopened
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-sm">SKU: IQOSHEETS400234</span>
                <span className="text-sm">VENDOR: Heets IQOS UAE</span>
                <span className="text-sm">AVAILABILITY: In Stock</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-red-800">AED 89</span>
                <span className="text-lg  line-through">AED 120</span>
              </div>
            </div>

            <ul className="list-disc pl-5 space-y-2">
              <li>
                <p className="">
                  <strong>What's in Box: Carton: </strong>1 Carton / 200 Sticks
                  (10 packs)
                </p>
              </li>

              <li>
                <p className="text-gray-600 ml-5">
                  <strong>Taste: </strong>
                  Balanced and roasted. Aroma notes of woody and nutty aromas
                  are exquisitely layered into Amber Selection's rounded,
                  toasted tobacco flavor. A very strong and rich flavor amongst
                  the classics.
                </p>
              </li>

              <li className="ml-5">
                <div className="flex gap-2">
                  <span className="font-medium">Aroma:</span>
                  <StarRating rating={4} isCustomerReview={false} size="sm" />
                </div>

                <div className="flex gap-2">
                  <span className="font-medium">Body:</span>
                  <StarRating rating={4} isCustomerReview={false} size="sm" />
                </div>

                <div className="flex gap-2">
                  <span className="font-medium">Intensity:</span>
                  <StarRating rating={3} isCustomerReview={false} size="sm" />
                </div>
              </li>
              <li className="ml-5">
                <p className="text-primary">
                  <strong>Compatible With: </strong>
                  <Link href="/" className="text-red-800">
                    IQOS Originals One Device, IQOS Originals DUO Device, IQOS 3
                    Duo Kits, IQOS 3 Multi, IQOS Lil Solid, Lambda T3 Device,
                    Lambda CC Device
                  </Link>
                </p>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <div className="flex items-center  rounded">
                <button
                  // onClick={onDecrease}
                  className="px-3 h-10 w-10 py-1 rounded-lg border-r bg-[#8b2c2a] hover:bg-gray-100"
                >
                  <Minus className="h-3 w-3 text-white" />
                </button>
                <span className="px-4 py-1">1</span>
                <button
                  // onClick={onIncrease}
                  className="px-3 h-10 w-10 rounded-lg py-1 border-l bg-[#8b2c2a] hover:bg-gray-100"
                >
                  <Plus className="h-3 w-3 text-white" />
                </button>
              </div>
              <button className="flex-1 bg-[#8b2c2a] rounded-lg text-white py-2 hover:bg-red-900 transition-colors">
                Add to Cart
              </button>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">
              Read Review
            </button>

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

        {/* Tabs Navigation */}
        <div className="overflow-x-auto mt-4 max-w-fit mx-auto">
          <div className="flex min-w-max gap-6 border-b rounded-md border-gray-200 px-6 py-2 bg-black text-white">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                data-tab={tab.id}
                className={`tab-button px-4 py-2 text-xl leading-none rounded-lg font-medium hover:text-gray-300 whitespace-nowrap
                ${activeTab === tab.id ? "active-tab" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Contents */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            className="tab-content p-6"
            style={{ display: tab.id === "description" ? "block" : "none" }}
          >
            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Heets Amber Selection Review (21 Reviews)
                  </h2>
                  <Button className="bg-red-700 hover:bg-red-800 text-white px-6">
                    Add a review
                  </Button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-4 items-start bg-[#efefef] p-6 rounded-lg"
                    >
                      <div className="w-12 h-12 rounded-full bg-white text-red-700 flex items-center justify-center text-xl font-semibold">
                        {review.initial}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between relative">
                          <h3 className="font-semibold text-lg">
                            {review.name}
                          </h3>
                          <span className="text-xs text-white absolute top-[-23px] px-2 py-1 bg-black rounded-b-lg right-3">
                            {review.date}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "description" && (
              <div className=" text-gray-900 p-4 md:p-8">
                <div className="mx-auto">
                  {/* Header Section */}
                  <p className="text-lg md:text-xl mb-6">
                    Experience the rich and smooth{" "}
                    <span className="font-semibold">flavor</span> of{" "}
                    <span className="font-bold">Heets Amber Label</span>,
                    specially designed for{" "}
                    <span className="text-red-600">IQOS devices</span>.
                    Available now in <span className="font-bold">Dubai</span>,{" "}
                    <span className="font-bold">Heets Amber Label</span> offers
                    a premium <span className="font-semibold">tobacco</span>{" "}
                    experience that is{" "}
                    <span className="font-semibold">perfect</span> for those who
                    appreciate quality and sophistication.
                  </p>

                  {/* Key Features Section */}
                  <section className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Key Features:
                    </h2>
                    <ul className="space-y-4">
                      <li>
                        <span className="font-bold">
                          Flavor Profile: Heets Amber Label
                        </span>{" "}
                        provides a well-balanced, smooth, and rich tobacco
                        flavor with subtle nutty undertones, making it an
                        excellent choice for those who enjoy a full-bodied
                        taste.
                      </li>
                      <li>
                        <span className="font-bold">Nicotine Level:</span> Each{" "}
                        <span className="font-bold">Heets Amber stick</span>{" "}
                        contains a controlled amount of nicotine, ensuring a
                        satisfying experience without the harshness of
                        traditional cigarettes.
                      </li>
                      <li>
                        <span className="font-bold">
                          Compatibility: Heets Amber Label
                        </span>{" "}
                        is compatible with all IQOS devices, including the
                        latest models such as{" "}
                        <span className="font-bold">
                          IQOS 3 DUO Device, IQOS lil Device
                        </span>{" "}
                        and{" "}
                        <span className="font-bold">IQOS Originals Device</span>
                        .
                      </li>
                    </ul>
                  </section>

                  {/* Available Options Section */}
                  <section className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Available Options:
                    </h2>
                    <ul className="space-y-4">
                      <li>
                        <span className="font-bold">
                          Heets Amber Selection:
                        </span>{" "}
                        For those who seek a varied experience,{" "}
                        <span className="font-bold">Heets Amber Selection</span>{" "}
                        offers a range of flavor intensities within the Amber
                        category.
                      </li>
                      <li>
                        <span className="font-bold">Heets Premium Line:</span>{" "}
                        Explore the premium line of Heets, which includes Amber
                        alongside other luxurious flavors.
                      </li>
                    </ul>
                  </section>

                  {/* Usage Instructions Section */}
                  <section className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Usage Instructions:
                    </h2>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        Insert a{" "}
                        <span className="font-bold">Heets Amber stick</span>{" "}
                        into your <span className="font-bold">IQOS device</span>
                        .
                      </li>
                      <li>
                        Wait for the <span className="font-bold">device</span>{" "}
                        to heat the{" "}
                        <span className="font-bold">tobacco stick</span>.
                      </li>
                      <li>
                        Enjoy the rich and smooth{" "}
                        <span className="font-bold">flavor</span> of{" "}
                        <span className="font-bold">Heets Amber</span> with each
                        puff.
                      </li>
                    </ol>
                  </section>

                  {/* Where to Buy Section */}
                  <section className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Where to Buy Heets in Dubai, UAE
                    </h2>
                    <p className="mb-4">
                      <span className="font-bold">Heets Amber Label</span> is
                      available for purchase in various locations across{" "}
                      <span className="font-bold">Dubai</span> and the{" "}
                      <span className="font-bold">UAE</span>, including{" "}
                      <span className="font-bold">
                        Abu Dhabi, Sharjah, Fujairah, Ajman, Ras Al-Khaimah
                      </span>
                      , and <span className="font-bold">Umm Al-Quwain</span>.
                      You can also{" "}
                      <span className="font-bold">buy Heets Amber</span> online
                      from our <span className="font-bold">store</span> with
                      convenient delivery options.
                    </p>
                  </section>

                  {/* Delivery Section */}
                  <section>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      Heets Amber Delivery UAE:
                    </h2>
                    <ul className="space-y-4">
                      <li>
                        <span className="font-bold">Delivery Time:</span> We
                        offer fast and reliable delivery services across Dubai
                        and the UAE. Expect your order to arrive within{" "}
                        <span className="font-bold">1-2 hours</span>.
                      </li>
                      <li>
                        <span className="font-bold">Payment Methods:</span> We
                        accept various payment methods, including credit/debit
                        cards, PayPal, and cash on{" "}
                        <span className="font-bold">delivery</span> (COD).
                      </li>
                    </ul>
                  </section>
                </div>
              </div>
            )}

            {activeTab === "specification" && (
              <table className="w-full border-[2px solid #ccc] rounded-lg overflow-hidden">
                <thead>
                  <tr className="">
                    <th className="text-left px-4 py-3 text-lg font-bold border border-gray-300">
                      Title
                    </th>
                    <th className="text-left px-4 py-3 text-lg font-bold border border-gray-300">
                      Specification
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Product Name
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      IQOS Heets Amber Label Selection
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Sticks Brand
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      HEETS made for IQOS (Heets Classic From Kazakhstan)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Box Colour
                    </td>
                    <td className="px-4 py-3 border border-gray-300">Orange</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Aroma
                    </td>
                    <td className="px-4 py-3 border border-gray-300">★★★★☆</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Body
                    </td>
                    <td className="px-4 py-3 border border-gray-300">★★★★☆</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Intensity
                    </td>
                    <td className="px-4 py-3 border border-gray-300">★★★★☆</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Aroma Note
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      Nutty, Balanced & Roasted
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Total Puffs
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      14 Puffs
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Nicotine/Sticks
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      0.5 MG / Heets stick
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Dimensions
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      162 x 75 x 47 mm
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Box Weight
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      240 Gram
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      What is in the Box
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      1 Carton (20 Packs / 200 Heatsticks)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Total Flavors
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      8 Flavors
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Origin
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      Kazakhstan
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold border border-gray-300">
                      Sticks Compatible With
                    </td>
                    <td className="px-4 py-3 border border-gray-300">
                      IQOS 3 DUO Originals, IQOS 3 Duo Kits, IQOS 3 Holders,
                      IQOS 3 Multi & IQOS lil Solid 2.0
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {activeTab === "howToUse" && (
              <div className="mx-auto my-10">
                <h2 className="text-3xl font-extrabold mb-4">
                  How to use IQOS Heets Amber Selection Heatstick with IQOS
                  Device :
                </h2>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start">
                    <span className="text-green-600 text-xl font-bold mr-2">
                      ✓
                    </span>
                    <span>
                      <strong className="font-bold">
                        1. Insert Heets Tobacco Stick
                      </strong>
                      : Carefully insert the Heets tobacco stick into the
                      filter, ensuring to align it with the indicated line and
                      place it facing outwards. Gently press down for the best
                      results.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 text-xl font-bold mr-2">
                      ✓
                    </span>
                    <span>
                      <strong className="font-bold">2. Start Heating</strong>:
                      Firmly press on the Holder Button until you feel a
                      vibration and see a pulsing white light emitting from IQOS
                      Device.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 text-xl font-bold mr-2">
                      ✓
                    </span>
                    <span>
                      <strong className="font-bold">3. Begin Use</strong>: When
                      you power on the IQOS Holder, it will vibrate twice to let
                      you know that it is ready for use!
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 text-xl font-bold mr-2">
                      ✓
                    </span>
                    <span>
                      <strong className="font-bold">4. Nearly Complete</strong>:
                      To alert you of the impending end, your IQOS device will
                      shortly vibrate twice and its Light(s) will flash white.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 text-xl font-bold mr-2">
                      ✓
                    </span>
                    <span>
                      <strong className="font-bold">
                        5. Remove Heets Tobacco Stick
                      </strong>
                      : After you've enjoyed your Heets tobacco stick, be sure
                      to lift the Slide Cap and discard it properly.
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="mx-auto my-10">
                <h2 className="text-3xl font-semibold mb-6">
                  FAQ's of IQOS Heets Amber Label Selection :
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="bg-black text-white text-lg font-semibold px-4 py-3">
                      Which Devices can you use with the Heets Classic Amber
                      Selection?
                    </h3>
                    <p className="text-lg px-4 py-3">
                      Use your favorite Amber Selection with the stunning color
                      variants from IQOS Originals DUO, IQOS Originals One, IQOS
                      Lil Solid, IQOS Multi 3 device, and IQOS 3 Duo Kits. Enjoy
                      free delivery for these devices at Heets IQOS UAE.
                    </p>
                  </div>

                  <div>
                    <h3 className="bg-black text-white text-lg font-semibold px-4 py-3">
                      How many Amber sticks are there in one carton?
                    </h3>
                    <p className="text-lg px-4 py-3">
                      Each carton contains ten boxes with 20 sticks each. This
                      helps you get your tobacco stock which goes a long way.
                    </p>
                  </div>

                  <div>
                    <h3 className="bg-black text-white text-lg font-semibold px-4 py-3">
                      How can I order an Amber Label Carton?
                    </h3>
                    <p className="text-lg px-4 py-3">
                      Place your order now at Heets IQOS UAE through a
                      hassle-free online delivery process involving three simple
                      steps. Choose the products, add them to your cart, and
                      place your order after selecting the payment methods.
                    </p>
                  </div>

                  <div>
                    <h3 className="bg-black text-white text-lg font-semibold px-4 py-3">
                      What is the flavor profile of Amber Sticks?
                    </h3>
                    <p className="text-lg px-4 py-3">
                      With a unique profile, the amber selection offers a rich
                      flavor that combines tangy notes with nutty textures
                      amalgamating with classic tobacco.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <style jsx>{`
          .active-tab {
            color: #8b2c2a;
            background: white;
          }

          @media (max-width: 640px) {
            .tab-button {
              padding: 1rem 0.75rem;
              font-size: 0.875rem;
            }
          }
        `}</style>
      </div>
      <section className="py-12 bg-[#f1f1f1]">
        <div className="px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Heets Classic Kazakhstan Sticks
            <div className="w-20 h-1 bg-red-800 mx-auto mt-2" />
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

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

export function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border-2 p-1 rounded-lg w-20 h-20 ${
              selectedImage === index ? "border-red-800" : "border-gray-200"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
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
            src={images[selectedImage] || "/placeholder.svg"}
            alt="Product main image"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

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
