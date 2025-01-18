"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { Award } from 'lucide-react'
import { StarRating } from '../components/Products/star-rating'

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Heets Sticks', href: '/heets-sticks' },
  { label: 'IQOS Heets Amber Label Selection', href: '#' },
]

const productImages = [
  '/imgs/heets-amber-selection-sticks-for-iqos-device.webp',
  '/imgs/heets-amber-selection-sticks-for-iqos-device.webp',
  '/imgs/heets-amber-selection-sticks-for-iqos-device.webp',
  '/imgs/heets-amber-selection-sticks-for-iqos-device.webp',
]

const Page = () => {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="grid md:grid-cols-2 gap-8 p-4">
        {/* Left Column - Image Gallery */}
        <ImageGallery images={productImages} />
        
        {/* Right Column - Product Details */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">IQOS Heets Amber Label Selection</h1>
          
          <div className="space-y-2">
            <StarRating rating={4.1} reviews={21} />
            <div className="flex items-center gap-2 text-sm">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">Good purchase!</span>
              <span className="text-red-800 font-bold">921+</span>
              <span>sold in past month</span>
            </div>
            <p className="text-sm text-gray-600">
              Genuine, Factory-Sealed, and Unopened
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-sm">SKU: IQOSHEETS400234</span>
              <span className="text-sm">VENDOR: Heets IQOS UAE</span>
              <span className="text-sm text-green-600">AVAILABILITY: In Stock</span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-red-800">AED 89</span>
              <span className="text-lg text-gray-500 line-through">AED 120</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">What's in Box: Carton:</h3>
              <p>1 Carton / 200 Sticks (10 packs)</p>
            </div>
            
            <div>
              <h3 className="font-medium">Taste:</h3>
              <p className="text-gray-600">
                Balanced and roasted. Aroma notes of woody and nutty aromas are exquisitely layered into Amber Selection's rounded, toasted tobacco flavor. A very strong and rich flavor amongst the classics.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="font-medium">Aroma:</span>
                <StarRating rating={4} size="sm" />
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Body:</span>
                <StarRating rating={4} size="sm" />
              </div>
              <div className="flex gap-2">
                <span className="font-medium">Intensity:</span>
                <StarRating rating={3} size="sm" />
              </div>
            </div>
            
            <div>
              <h3 className="font-medium">Compatible With:</h3>
              <p className="text-red-800">
                IQOS Originals One Device, IQOS Originals DUO Device, IQOS 3 Duo Kits, IQOS 3 Multi, IQOS Lil Solid, Lambda T3 Device, Lambda CC Device
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(q => q + 1)}
              onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
            />
            <button className="flex-1 bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-colors">
              Add to Cart
            </button>
          </div>
          
          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition-colors">
            Read Review
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm py-4 px-4 bg-gray-50">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          )}
          <Link
            href={item.href}
            className={`hover:text-red-800 ${
              index === items.length - 1 ? 'text-red-800' : 'text-gray-600'
            }`}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  )
}


export function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border-2 p-1 rounded-lg w-20 h-20 ${
              selectedImage === index ? 'border-red-800' : 'border-gray-200'
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
      <div className="flex-1 border rounded-lg p-4">
        <div className="relative aspect-square">
          <Image
            src={images[selectedImage] || "/placeholder.svg"}
            alt="Product main image"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-50"
      >
        -
      </button>
      <span className="w-12 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-10 h-10 flex items-center justify-center border rounded-lg hover:bg-gray-50"
      >
        +
      </button>
    </div>
  )
}