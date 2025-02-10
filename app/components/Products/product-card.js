"use client";
import { useState } from 'react'
import { StarRating } from './star-rating.js'
import Image from 'next/image.js';
import { Minus, Plus,} from 'lucide-react';
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
  id
}) => {

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
        {/* Delivery Badge */}
        <div className="mb-2 w-fit bg-[#e2e4e8] px-2 py-1 rounded flex gap-2 items-center">
          <Image src="/imgs/free-delivery-logo.webp" alt="Home" width={16} height={16} />
          <span className="text-gray-600 text-xs ">
            Delivery 2hrs
          </span>
        </div>

        {/* Product Image */}
        <Link href={{ pathname: `/product/${productUrl}`, query: id ? {product: id} : undefined}}  onClick={onNavigate}>
        <div className="relative aspect-square mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill={true}
            className="w-full h-full object-contain"
            />
        </div>
        </Link>

        {/* Product Info */}
        <h3 className="text-lg text-center font-semibold mb-2">{title}</h3>

        {/* Price */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-lg font-bold text-[#8b2c2a]">AED {price}</span>
          <span className="text-sm text-primary font-semibold line-through">
            AED {originalPrice}
          </span>
        </div>

        {/* Rating */}
        <div className='flex items-center justify-center'>
          <StarRating rating={rating} reviews={reviews} />
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center border rounded">
            <button
              onClick={decrementQuantity}
              className="px-3 h-10 w-10 py-1 rounded-lg border-r bg-[#8b2c2a] hover:bg-[#712322]"
            >
              <Minus className="h-3 w-3 text-white" />
            </button>
            <span className="px-4 py-1">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="px-3 h-10 w-10 rounded-lg py-1 border-l bg-[#8b2c2a] hover:bg-[#712322]"
            >
              <Plus className="h-3 w-3 text-white" />
            </button>
          </div>
          <button onClick={onAddCart} className="flex-1 bg-[#8b2c2a] rounded-lg text-white py-2 hover:bg-red-900 transition-colors">
            Add to Cart
          </button>
        </div>

        {/* Product Details */}
        <div className="mt-4 text-sm flex justify-between text-gray-600">
          <p>
            <span className="font-bold text-[15px]">Origin:</span><br/> {origin}
          </p>
          <p>
            <span className="font-bold text-[15px]">Availability:</span> {details}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
