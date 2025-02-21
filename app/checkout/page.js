"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "../utils/products";
import ThankYou from "../components/ThankYou";
import { Loader2 } from "lucide-react";

export default function CheckoutForm() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [showThankyou, setShowThankyou] = useState(false);
  const [subTotalValue, setSubTotalValue] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  useEffect(() => {
    const fetchLocalData = () => {
      try {
        const checkoutData = JSON.parse(localStorage.getItem("cart"));
        setData(checkoutData);
      } catch (error) {
        console.log(error, "error in fetching checkoutData");
      }
    };

    fetchLocalData();
  }, []);

  const calculateProductTotal = (price, quantity) => {
    return price * quantity;
  };


  useEffect(() => {
    // function subTotal() {
    const subValue = data.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setSubTotalValue(subValue)
    // return subValue;
    // }

  }, [data])

  useEffect(() => {
    const calculateTotal = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const subVal = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      setTotalPayment(subVal + value);
      return subVal + value;
    };

    calculateTotal();
  }, [value]);

  const shippingFee = useMemo(() => {
    if (deliveryOption === "express") {
      return 49; // Express is always AED 49
    } else {
      // For "standard": free if subtotal >= 200, else AED 49
      return subTotalValue >= 200 ? 0 : 49;
    }
  }, [deliveryOption, subTotalValue]);

  useEffect(() => {
    setTotalPayment(subTotalValue + shippingFee);
  }, [subTotalValue, shippingFee]);

  const radioHandleChange = (val) => {
    setDeliveryOption(val);
    // console.log("Selected delivery option:", val);
  };

  async function handleForm(e) {
    e.preventDefault();
    setIsLoading(true)
    try {
      const form = new FormData(e.target);
      const formatted = Object.fromEntries(form);
      // const total = total();
      // console.log(formatted, 'check formatted');

      const localCart = JSON.parse(localStorage.getItem("cart"));
      const lineItems = localCart.map((item) => ({
        product_id: item.id,
        // variation_id: item?.variantId,
        quantity: item.quantity,
      }));

      // console.log(formatted)
      const data = {
        payment_method:
          formatted.paymentMode == "cod"
            ? "Cash on Delivery"
            : "Online Payment",
        payment_method_title: "",
        set_paid: true,
        billing: {
          first_name: formatted.fullName,
          last_name: "",
          address_1: formatted.address,
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
          email: formatted.email,
          phone: formatted.phone,
        },
        shipping: {
          first_name: formatted.fullName,
          last_name: "",
          address_1: formatted.address,
          address_2: "",
          city: "",
          state: "",
          postcode: "",
          country: "",
        },
        line_items: lineItems,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: totalPayment.toLocaleString(),
          },
        ],
      };

      const response = await createOrder(data);
      if (response) {
        setOrderId(response?.id)
        setIsLoading(false)
        setShowThankyou(true)

        // Clear localStorage
        localStorage.removeItem("cart");

        // Reset form
        e.target.reset();

        // Reset states
        setData([]);
        setValue(0);
        setTotalPayment(0);

        // Reset radio selections
        const radioGroups = e.target.querySelectorAll('input[type="radio"]');
        radioGroups.forEach(radio => radio.checked = false);

        // Reset checkbox
        const checkbox = e.target.querySelector('input[type="checkbox"]');
        if (checkbox) checkbox.checked = false;
      }
      console.log("Order placed:", response);
    } catch (error) {
      console.log("Order submission failed", error);
    }
  }
  return (
    <div className="container mx-auto p-4 md:p-6">
      {showThankyou ? (
        <ThankYou orderId={orderId} />
      ) : (
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <form onSubmit={handleForm}>
              {/* Customer Information */}
              <Card className="p-6">
                <h2 className="text-[#8B1F18] font-medium mb-4 text-center rounded-md border-l-4 border-red-800 bg-gray-100 p-2">
                  CUSTOMER INFORMATION
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Eg. John Kai"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Eg. +971 565656545"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Eg. john.kai@gmail.com"
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              {/* Ship To */}
              <Card className="p-6">
                <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">
                  SHIP TO
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label>Country</Label>
                    <Input
                      value="United Arab Emirates"
                      disabled
                      className="mt-1 bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emirate">Emirate</Label>
                    <Select name="country">
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select an Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai</SelectItem>
                        <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="sharjah">Sharjah</SelectItem>
                        <SelectItem value="Ajman">Ajman</SelectItem>
                        <SelectItem value="Fujairah">Fujairah</SelectItem>
                        <SelectItem value="Al-Ain">Al Ain</SelectItem>
                        <SelectItem value="Ras-Al">Ras Al</SelectItem>
                        <SelectItem value="Khaimah">Khaimah</SelectItem>
                        <SelectItem value="Umm-Al-Quwain">
                          Umm Al Quwain
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <textarea
                      id="address"
                      name="address"
                      placeholder="Please enter full address"
                      className="w-full mt-1 p-2 border rounded-md min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Order Note</Label>
                    <textarea
                      id="note"
                      name="note"
                      placeholder="Order Note"
                      className="w-full mt-1 p-2 border rounded-md min-h-[100px]"
                    />
                  </div>
                </div>
              </Card>

              {/* Shipping Method */}
              <Card className="p-6">
                <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">
                  SHIPPING METHOD
                </h2>
                <RadioGroup
                  value={deliveryOption}
                  onValueChange={radioHandleChange}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">
                      {subTotalValue >= 200 ? "Free Delivery" : "Standard Delivery"}
                    </Label>
                    <span className="ml-auto">AED {subTotalValue >= 200 ? 0 : 49}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express Delivery</Label>
                    <span className="ml-auto">AED 49</span>
                  </div>
                </RadioGroup>
              </Card>

              {/* Payment Options */}
              <Card className="p-6">
                <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">
                  PAYMENT OPTIONS:
                </h2>
                <RadioGroup
                  defaultValue="cod"
                  required
                  name="paymentMode"
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash On Delivery (COD)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit Card Machine On Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Bank Transfer</Label>
                  </div>
                </RadioGroup>

                <div className="mt-4 flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    name="terms"
                    required
                    onCheckedChange={(checked) => console.log("muneeb")}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I have read and agreed to the{" "}
                    <Link href="#" className="text-[#8B1F18]">
                      delivery information
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="mt-4 bg-[#8B1F18] text-white hover:bg-[#8B1F18]/90"
                >
                  {isLoading ? `Placing Order...` : `Send an Order`}
                  {isLoading && <Loader2 className="animate-spin" />}
                </Button>
              </Card>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            <Card className="p-6 sticky top-0">
              <h2 className="text-[#8B1F18] font-medium mb-4 bg-gray-100 p-2 text-center rounded-md border-l-4 border-red-800">
                Total
              </h2>

              {/* Product List */}
              <div className="space-y-4">
                {data.map((item, index) => (
                  <>
                    <div key={index} className="flex gap-4">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        width={90}
                        height={90}
                        className="object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{item?.name}</h3>
                        <p className="text-[#8B1F18] font-medium">
                          AED{" "}
                          {calculateProductTotal(
                            parseInt(item?.price),
                            item?.quantity
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          QTY: {item?.quantity}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 space-y-2 p-4 bg-gray-100 rounded-md border-l-4 border-red-800">
                <div className="flex justify-between">
                  <span>SUBTOTAL</span>
                  <span className="text-[#8B1F18] font-semibold">
                    AED {subTotalValue}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>DELIVERY CHARGES</span>
                  <span className="text-[#8B1F18] font-semibold">
                    AED {shippingFee}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>TOTAL</span>
                  <span className="text-[#8B1F18] font-semibold">
                    AED {totalPayment}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
