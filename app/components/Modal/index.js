"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/app/context/cartProvider"

export default function CartModal({ isModalOpen, setIsModalOpen }) {
  const { isCartOpen, setIsCartOpen } = useCart()

  return (
    <div className="p-4">
      {/* Trigger Button */}
      {/* <Button onClick={() => setIsOpen(true)} className="bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90">
        Open Cart Modal
      </Button> */}

      {/* Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogContent className="sm:max-w-[65vw] p-0 border-none">
          <div className="relative w-full max-h-[90vh] bg-white rounded-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            {/* Cart Items */}
            <div className="space-y-4 p-0">
              {/* TEREA Regular */}
              <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                <Image
                  src="/imgs/circle-card.jpg"
                  alt="TEREA Regular"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-medium">TEREA Regular</h3>
                  <p className="text-sm text-gray-600 font-semibold bg-[#f1f1f1] px-2 py-1 rounded-sm max-w-fit">1 Qty x 249 AED = 249 AED</p>
                </div>
              </div>

              {/* IQOS Heets Silver */}
              <div className="flex items-center gap-4 p-4 pt-0 border-b border-gray-200">
                <div className="w-[60px] h-[60px] bg-gray-100 rounded flex items-center justify-center">
                  <Image
                    src="/imgs/circle-card.jpg"
                    alt="IQOS Heets Silver"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">IQOS Heets Silver Label Selection</h3>
                  <p className="text-sm text-gray-600 font-semibold bg-[#f1f1f1] px-2 py-1 rounded-sm max-w-fit">3 Qty x 89 AED = 267 AED</p>
                </div>
              </div>

              {/* Subtotal */}
              <div className="mt-6 bg-[#8B1F18] text-white p-4  flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">AED 516</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center px-4 gap-2 mt-4">
                <Button className="bg-[#8B1F18] max-w-fit text-white hover:bg-[#8B1F18]/90">
                  View Cart
                </Button>
                <Button className="bg-[#8B1F18] max-w-fit text-white hover:bg-[#8B1F18]/90">
                  Continue Shopping
                </Button>
                <Button className="bg-[#8B1F18] max-w-fit text-white hover:bg-[#8B1F18]/90">Checkout</Button>
              </div>

              {/* Delivery Message */}
              <p className="text-center text-sm font-semibold text-gray-600 pb-4">
                Same Day Delivery In UAE | Free Delivery On Orders 201 AED
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

