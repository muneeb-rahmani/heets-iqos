"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    emirate: "",
    address: "",
    shippingMethod: "free",
    paymentMethod: "cod",
  })

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid lg:grid-cols-2 gap-20">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Customer Information */}
          <Card className="p-6">
            <h2 className="text-[#8B1F18] font-medium mb-4 text-center rounded-md border-l-4 border-red-800 bg-gray-100 p-2">CUSTOMER INFORMATION</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" placeholder="Eg. John Kai" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" placeholder="Eg. +971 565656545" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Eg. john.kai@gmail.com" className="mt-1" />
              </div>
            </div>
          </Card>

          {/* Ship To */}
          <Card className="p-6">
            <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">SHIP TO</h2>
            <div className="space-y-4">
              <div>
                <Label>Country</Label>
                <Input value="United Arab Emirates" disabled className="mt-1 bg-gray-50" />
              </div>
              <div>
                <Label htmlFor="emirate">Emirate</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select an Option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dubai">Dubai</SelectItem>
                    <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                    <SelectItem value="sharjah">Sharjah</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <textarea
                  id="address"
                  placeholder="Please enter full address"
                  className="w-full mt-1 p-2 border rounded-md min-h-[100px]"
                />
              </div>
            </div>
          </Card>

          {/* Shipping Method */}
          <Card className="p-6">
            <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">SHIPPING METHOD</h2>
            <RadioGroup defaultValue="free" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free">Free Delivery</Label>
                <span className="ml-auto">AED 0</span>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express">Express Delivery</Label>
                <span className="ml-auto">AED 50</span>
              </div>
            </RadioGroup>
          </Card>

          {/* Payment Options */}
          <Card className="p-6">
            <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">PAYMENT OPTIONS:</h2>
            <RadioGroup defaultValue="cod" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash On Delivery (COD)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Credit Card Machine On Delivery</Label>
              </div>
            </RadioGroup>

            <div className="mt-4 flex items-start space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I have read and agreed to the{" "}
                <Link href="#" className="text-[#8B1F18]">
                  delivery information
                </Link>
              </Label>
            </div>

            <Button className="mt-4 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90">Send an Order</Button>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">Total</h2>

            {/* Product List */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Image
                  src='/imgs/circle-card.jpg'
                  alt="TEREA Regular"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <div>
                  <h3 className="font-medium">TEREA Regular</h3>
                  <p className="text-[#8B1F18] font-medium">AED 249</p>
                  <p className="text-sm text-gray-600">QTY: 1</p>
                </div>
              </div>
            <hr/>
              <div className="flex gap-4">
                <Image
                  src='/imgs/circle-card.jpg'
                  alt="IQOS Heets Silver"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <div>
                  <h3 className="font-medium">IQOS Heets Silver Label Selection</h3>
                  <p className="text-[#8B1F18] font-medium">AED 89</p>
                  <p className="text-sm text-gray-600">QTY: 4</p>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-2 p-4 bg-gray-100 rounded-md border-l-4 border-red-800">
              <div className="flex justify-between">
                <span>SUBTOTAL</span>
                <span className="text-[#8B1F18] font-semibold">AED 605</span>
              </div>
              <div className="flex justify-between">
                <span>DELIVERY CHARGES</span>
                <span className="text-[#8B1F18] font-semibold">AED 0</span>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>TOTAL</span>
                <span className="text-[#8B1F18] font-semibold">AED 605</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

