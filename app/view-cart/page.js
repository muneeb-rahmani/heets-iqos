"use client"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import Image from "next/image"

export default function ShoppingCart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-[32px] font-bold text-[#1a1a1a] mb-8">Shopping Cart</h1>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-gray-100 text-primary font-bold">Product</TableHead>
            <TableHead className="bg-gray-100 text-primary font-bold">Price</TableHead>
            <TableHead className="bg-gray-100 text-primary font-bold">Quantity</TableHead>
            <TableHead className="bg-gray-100 text-primary font-bold">Total</TableHead>
            <TableHead className="bg-gray-100 text-primary font-bold">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="flex items-center gap-4">
              <Image
                src="/imgs/circle-card.jpg"
                alt="TEREA Regular"
                width={80}
                height={80}
                className="object-contain"
              />
              <span className="font-medium">TEREA Regular</span>
            </TableCell>
            <TableCell>
              <span className="text-[#8B1F18] font-semibold text-lg">AED 249</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90">
                  -
                </Button>
                <span className="mx-4">1</span>
                <Button variant="outline" size="icon" className="h-8 w-8 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90">
                  +
                </Button>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-[#8B1F18] font-semibold text-lg">AED 249</span>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" className="text-primary">
                <Trash2 className="h-10 w-10 text-2xl" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-6 bg-gray-100 p-4 rounded-sm">
        <div className="flex justify-center items-center">
          <span className="text-2xl font-medium">SUBTOTAL :</span>
          <span className="text-[#8B1F18] text-2xl font-medium">AED 249</span>
        </div>
      </div>

      <div className="mt-4 text-right text-sm text-gray-600">
        <div className="flex items-center justify-end gap-2">
         <Image src='/imgs/free-delivery-logo.webp' width={20} height={20} />
          <span>Free Delivery over 200+ AED</span>
        </div>
        <span>Same Day Delivery in Dubai & Abudhabi</span>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
        <Button variant="outline" className="bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90 px-6 py-2 rounded-lg">
          Continue Shopping
        </Button>
        <Button className="bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90 px-6 py-2 rounded-lg">Proceed to Checkout</Button>
      </div>

      <div className="mt-8 bg-[#CAFFDC] p-4 rounded-lg flex items-center justify-center gap-2">
       <div className="bg-green-600 rounded-full p-2">
            <Image src='/imgs/whatsapp-white.webp' width={40} height={40} />
       </div>
        <p className="text-center font-medium">
          Facing difficulty in placing order? If so, then please send us a screenshot on whatsApp and Let us order for
          you.
        </p>
      </div>
    </div>
  )
}

