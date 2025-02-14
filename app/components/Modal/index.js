"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/context/cartProvider";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CartModal() {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [cartItems, setCartItems] = useState([]);
  let localCart = [];
  const removeItem = (id) => {
    let cartData = localStorage.getItem("cart");
    // console.log(cartData, 'cartData')
    localCart = JSON.parse(cartData);

    localCart = localCart.filter((item) => item.id !== id);
    setCartItems(localCart);
    localStorage.setItem("cart", JSON.stringify(localCart));
  };

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isCartOpen) {
      let cartData = localStorage.getItem("cart");
      // console.log(cartData, 'cartData')
      localCart = JSON.parse(cartData);
      setCartItems(localCart);
    }
  }, [isCartOpen]);

  function closeModal(params) {
    setIsCartOpen(false);
  }

  return (
    <div className="p-4">
      {/* Modal */}
      <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
        <DialogTitle className="sr-only">Cart</DialogTitle>
        <DialogContent className="sm:max-w-[65vw] max-h-[90vh] p-0 border-none">
          <div className="relative w-full bg-white rounded-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            {/* Cart Items */}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto overflow-x-hidden p-0">
              {/* TEREA Regular */}
              {cartItems?.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-200">
                  <Image
                    src={item?.image}
                    alt={item?.name}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item?.name}</h3>
                    <p className="text-sm text-gray-600 font-semibold bg-[#f1f1f1] px-2 py-1 rounded-sm max-w-fit">
                      {item?.quantity} Qty x {item?.price} AED = {item?.price * item?.quantity} AED
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        <DialogFooter>
          <div className='flex w-full flex-col'>
            {/* Subtotal */}
            <div className="mt-6 bg-[#8B1F18] text-white p-4  flex justify-between items-center">
              <span className="font-medium">Subtotal</span>
              <span className="font-medium">
                AED {subtotal.toLocaleString()}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center px-4 gap-2 mt-4">
              <Link href="/view-cart" onClick={closeModal}>
                <Button className="bg-[#8B1F18] max-w-fit text-white hover:bg-[#8B1F18]/90">
                  View Cart
                </Button>
              </Link>
              <Button onClick={closeModal} className="bg-[#8B1F18] max-w-fit text-white hover:bg-[#8B1F18]/90">
                Continue Shopping
              </Button>
              <Link href="/checkout" onClick={closeModal}>
                <Button className="bg-[#8B1F18] max-w-fit text-white hover:bg-[#8B1F18]/90">
                  Checkout
                </Button>
              </Link>
            </div>

            {/* Delivery Message */}
            <p className="text-center text-sm font-semibold text-gray-600 pb-4">
              Same Day Delivery In UAE | Free Delivery On Orders 201 AED
            </p>
          </div>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
