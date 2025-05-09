"use client";
import { useState } from 'react'
import { StarRating } from './star-rating.js'
import Image from 'next/image.js';
import { Minus, Plus, } from 'lucide-react';
import Link from 'next/link.js';


const ProductCard = ({
  title,
  price,
  originalPrice,
  rating,
  reviews,
  origin,
  details,
  image,
  incrementQuantity,
  decrementQuantity,
  quantity,
  onAddCart,
  onNavigate,
  productUrl,
  id,
  soldItems,
  isDisabled,
  isH2 = false,
}) => {

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-2 md:p-4 flex justify-between flex-col">
        <div className='flex justify-between items-center w-full mb-2'>
          {/* Delivery Badge */}
          <div className="w-fit bg-[#e2e4e8] p-1 rounded flex gap-1 items-center">
            <Image src="/imgs/product-delivery-within-2hours.webp" alt="product-delivery-within-2-hours" priority width={16} height={16} />
            <span className="text-gray-600 text-[10px] text-nowrap md:text-xs">
              Delivery 2hrs
            </span>
          </div>

          {/* sold items Badge */}
          <div className="w-fit md:flex gap-2 items-center">
            {/* <Image src="/imgs/product-delivery-within-2hours.webp" alt="product-delivery-within-2-hours" width={16} height={16} /> */}
            <span className="text-gray-600 text-nowrap font-bold text-[10px] md:text-xs">
              {soldItems}+ sold
            </span>
          </div>

        </div>

        {/* Product Image */}
        <Link prefetch={false} href={productUrl}>
          <div className="relative w-full h-full md:h-[300px] mb-4">
            <Image
              src={image?.trimEnd() || "/placeholder.svg"}
              alt={title}
              width={300}
              height={300}
              loading="lazy"
              overrideSrc={image || "/placeholder.svg"}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Product Info */}
        <Link prefetch={false} href={productUrl}>
          {isH2 ? (
            <h2 className="text-base md:text-lg text-center font-semibold mb-2">{title}</h2>
          ) : (
            <h3 className="text-base md:text-lg text-center font-semibold mb-2">{title}</h3>
          )}
        </Link>

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-[16px] md:text-lg  font-bold text-[#8b2c2a]">AED {price}</span>
          <span className="text-[10px] md:text-lg text-primary font-semibold line-through">
            AED {originalPrice}
          </span>
        </div>

        {/* Rating */}
        <div className='flex items-center justify-center'>
          <StarRating rating={rating} reviews={reviews} />
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 flex-wrap">
          <div className="flex items-center border rounded">
            <button
              onClick={decrementQuantity}
              className="px-3 h-10 w-10 py-1 rounded-lg border-r bg-[#8b2c2a] hover:bg-[#712322]"
              aria-label="Product Quantity Minus"
              aria-describedby="quantity-info"
            >
              <Minus className="h-3 w-3 text-white" />
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-3 h-10 w-10 rounded-lg py-1 border-l bg-[#8b2c2a] hover:bg-[#712322]"
              aria-label="Product Quantity Plus"
              aria-describedby="quantity-info"
            >
              <Plus className="h-3 w-3 text-white" />
            </button>
          </div>
          <button onClick={onAddCart} disabled={isDisabled} className={`flex-1 w-full  rounded-lg text-white py-2  transition-colors duration-300 ${isDisabled ? 'cursor-not-allowed bg-gray-500 hover:bg-gray-600' : 'bg-[#8b2c2a] hover:bg-red-900 cursor-pointer'}`}>
            {isDisabled ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-4 text-sm flex flex-col lg:flex-row lg:justify-between flex-wrap text-gray-600">
          {origin &&
            <p dangerouslySetInnerHTML={{__html: origin}} />
          }
          {details &&
            // <p>
            //   <span className="font-bold text-[15px]">Availability:</span> {details}
            // </p>
            <p className="proOriginCard"><strong>Availability :</strong> {details}</p>
          }
        </div>
      </div>
    </>
  );
};

export default ProductCard;
