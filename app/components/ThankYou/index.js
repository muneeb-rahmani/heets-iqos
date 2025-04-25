"use client";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

export default function ThankYou({ orderId }) {
  return (
    <div className="w-full p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl p-6 relative">
        <div className="absolute right-4 top-4">
          <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
            Order No: {orderId}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 pt-8">
          {/* Checkmark Icon */}
          <div className="w-20 h-20 rounded-full border-2 border-green-200 flex items-center justify-center">
            <Check className="w-10 h-10 text-green-500" />
          </div>

          {/* Thank You Text */}
          <h1
            className="text-[#1a2b4b] text-4xl md:text-5xl lg:text-6xl font-serif"
            style={{ fontFamily: "Brush Script MT, cursive" }}
          >
            Thank You!
          </h1>

          {/* Confirmation Message */}
          <p className="text-gray-600 text-lg md:text-xl text-center">
            Your order is received
          </p>

          {/* Divider */}
          <div className="w-full border-t border-gray-200 my-8"></div>

          {/* Note Section */}
          <div className="w-full space-y-6">
            <h2 className="text-[#1a2b4b] text-xl md:text-2xl font-medium text-center">
              Please follow below Note
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 text-center">
                Please pay by cash or credit card upon delivery. Your order will
                be confirmed. If not, please send your order screenshot to <Link prefetch={false} href="tel:+971526937203">+971
                52 693 7203</Link> or click the WhatsApp icon to chat with us. Payment
                will be collected at the time of delivery. Thank you!
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
