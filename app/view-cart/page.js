"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../context/cartProvider";

export default function ShoppingCart() {
  const [quantity, setQuantity] = useState(null);
  const [data, setData] = useState([]);
  const { cartItems, setCartItems } = useCart();

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subFinal = () => {
    return cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  useEffect(() => {
    // just for debugging
    subFinal();
    console.log(cartItems, "cartItems updated");
  }, [cartItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-8">
        Shopping Cart
      </h1>

      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="border w-full">
            {/* Header Row - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-5 w-full">
              <div className="bg-gray-100 text-primary font-bold p-4">Product</div>
              <div className="bg-gray-100 text-primary font-bold p-4">Price</div>
              <div className="bg-gray-100 text-primary font-bold p-4">Quantity</div>
              <div className="bg-gray-100 text-primary font-bold p-4">Total</div>
              <div className="bg-gray-100 text-primary font-bold p-4">Delete</div>
            </div>

            {/* Table Body */}
            <div className="w-full">
              {cartItems.map((item, index) => (
                <div key={index} className="border-t">
                  {/* Desktop View */}
                  <div className="hidden md:grid grid-cols-5 w-full">
                    {/* Product Cell */}
                    <div className="p-4">
                      <div className="flex items-center gap-4">
                        <Image
                          src={item?.image?.trimEnd() || "/placeholder.svg"}
                          overrideSrc={item?.image?.trimEnd() || "/placeholder.svg"}
                          alt={item?.name}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                        <span className="font-medium">{item?.name}</span>
                      </div>
                    </div>

                    {/* Price Cell */}
                    <div className="p-4 flex items-center">
                      <span className="text-[#8B1F18] font-semibold text-lg">AED {item?.price}</span>
                    </div>

                    {/* Quantity Cell */}
                    <div className="p-4 flex items-center">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                          size="icon"
                          className="h-8 w-8 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90"
                        >
                          -
                        </Button>
                        <span className="mx-4">{item?.quantity}</span>
                        <Button
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                          size="icon"
                          className="h-8 w-8 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Total Cell */}
                    <div className="p-4 flex items-center">
                      <span className="text-[#8B1F18] font-semibold text-lg">
                        AED {Number.parseInt(item?.price.toString()) * item?.quantity}
                      </span>
                    </div>

                    {/* Delete Cell */}
                    <div className="p-4 flex items-center">
                      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-primary">
                        <Trash2 className="h-10 w-10 text-2xl" />
                      </Button>
                    </div>
                  </div>

                  {/* Mobile View - Card Style */}
                  <div className="md:hidden p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={item?.image?.trimEnd() || "/placeholder.svg"}
                          overrideSrc={item?.image?.trimEnd() || "/placeholder.svg"}
                          alt={item?.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                        <span className="font-medium text-sm">{item?.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="text-primary p-1">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Price:</span>
                      <span className="text-[#8B1F18] font-semibold">AED {item?.price}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                          size="icon"
                          className="h-7 w-7 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90"
                        >
                          -
                        </Button>
                        <span className="mx-3">{item?.quantity}</span>
                        <Button
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                          size="icon"
                          className="h-7 w-7 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total:</span>
                      <span className="text-[#8B1F18] font-semibold">
                        AED {Number.parseInt(item?.price.toString()) * item?.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 bg-gray-100 p-4 rounded-sm">
            <div className="flex justify-center items-center">
              <span className="text-2xl font-medium">SUBTOTAL :</span>
              <span className="text-[#8B1F18] text-2xl font-bold ml-4">
                AED {subFinal()}{" "}
              </span>
            </div>
          </div>

          <div className="mt-4 text-center md:text-right text-sm text-gray-600">
            <div className="flex items-center justify-center md:justify-end gap-2">
              <Image
                src="/imgs/free-delivery-logo.webp"
                alt="delivery logo"
                width={20}
                height={20}
              />
              <span>Free Delivery over 200+ AED</span>
            </div>
            <span>Same Day Delivery in Dubai & Abudhabi</span>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center md:justify-between gap-4">
            <Link href="/">
              <Button
                variant="outline"
                className="bg-[#8B1F18] text-white hover:text-white hover:bg-[#8B1F18]/90 px-6 py-2 rounded-lg"
              >
                Continue Shopping
              </Button>
            </Link>
            <Link href="/checkout">
            <Button className="bg-[#8B1F18] text-white hover:text-white hover:bg-[#8B1F18]/90 px-6 py-2 rounded-lg">
              Proceed to Checkout
            </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex w-full flex-col gap-6 justify-center items-center h-auto">
          <p className="font-medium text-2xl">Your Cart is empty</p>
          <Link href="/">
            <Button
              variant="outline"
              className="bg-[#8B1F18] text-white hover:text-white hover:bg-[#8B1F18]/90 px-6 py-2 rounded-lg"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}

      <div className="mt-8 bg-[#CAFFDC] p-4 rounded-lg flex items-center justify-center gap-2">
        <div className="bg-green-600 rounded-full p-2">
          <Image
            src="/imgs/whatsapp-white.webp"
            alt="whatsapp"
            width={40}
            height={40}
          />
        </div>
        <p className="text-center font-medium text-[11px] md:text-sm">
          Facing difficulty in placing order? If so, then please send us a
          screenshot on whatsApp and Let us order for you.
        </p>
      </div>
    </div>
  );
}
