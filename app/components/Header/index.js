"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const HeroSection = () => {
  
  return (
    <div className="relative min-h-[600px] w-full bg-gradient-to-b from-cyan-300 to-white overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold leading-tight text-gray-900 max-w-xl">
              IQOS Heets Dubai | #1 Trusted Heets IQOS UAE Online Store
            </h1>
            <Button 
              className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-medium"
            >
              Buy Heets Now
            </Button>
          </div>
          
          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-end">
            <Image
              src="/imgs/trusted-IQOS-Heets-Online-Seller-in-Dubai-UAE.webp"
              alt="IQOS Heets Products"
              // fill={true}
              width={500}
              height={200}
              className="w-full max-w-[500px] h-auto object-contain transform lg:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection