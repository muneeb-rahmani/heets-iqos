"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const HeroSection = ({header, isHome,featureImg,shortDesc}) => {
  
  return (
    <div className="relative w-full bg-gradient-to-b from-cyan-300 to-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold leading-tight text-gray-900 max-w-xl">
              {header ? header : "IQOS Heets Dubai | #1 Trusted Heets IQOS UAE Online Store"}
            </h1>
            {shortDesc && <p className="text-lg text-gray-700 max-w-lg mx-auto lg:mx-0">{shortDesc}</p>}
            {isHome && (
              <Button 
              className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-medium"
              >
              Buy Heets Now
            </Button>
            )}
          </div>
          
          {/* Right Content */}
          <div className="relative flex justify-center lg:justify-end">
            {featureImg && (
              <Image
                src={featureImg?.trimEnd() || "-"}
                alt="IQOS Heets Products"
                // fill={true}
                width={500}
                height={200}
                overrideSrc={featureImg?.trimEnd()}
                className="w-full max-w-[500px] h-auto object-contain transform lg:scale-110"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection