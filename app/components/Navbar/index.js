"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useCart } from "@/app/context/cartProvider";
import Link from "next/link";
import { fetchCategories, getCategories, getReviews, getTotalSales } from "@/app/utils/products";
import { Home, ShoppingCart, Phone, Search, Menu  } from "lucide-react"
import InfiniteSlider from "../TopSlider";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [reviewLength, setReviewLength] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const { isCartOpen, setIsCartOpen } = useCart();
  const [cartItems, setCartItems] = useState([]);
  let localCart = [];

  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (isCartOpen) {
      let cartData = localStorage.getItem("cart");
      localCart = JSON.parse(cartData);
      setCartItems(localCart || []);
    }
  }, [isCartOpen]);

  // New useEffect for initial cart load
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      setCartItems(parsedCart || []);
    }
  }, []);



  useEffect(() => {
    async function loadCategories() {
      const data = await fetchCategories();
      const reviewLength = await getReviews()
      const totalSale = await getTotalSales()

      setCategories(data);
      setReviewLength(reviewLength)
      setTotalSales(totalSale)
    }
    loadCategories();
  }, []);



  return (
    <>
    <InfiniteSlider reviewLength={reviewLength} totalSales={totalSales}/>
      <div className="px-5 py-5 md:px-5 md:py-0">
        {/* Desktop view start */}
        <div className="hidden md:flex flex-wrap sm:hidden py-1 justify-between items-center">
          <div className="flex items-center w-1/4">
            <Link
              href="/"
              className="logo_img"
              aria-label="Heets IQOS UAE logo"
            >
              <Image
                src="/imgs/heets-iqos-uae-logo.png"
                alt="Heets IQOS UAE logo"
                height={62}
                width={250}
                className="w-[250px] h-[62px]"
              />
            </Link>
          </div>
          <div className="relative w-[36%] mx-auto">
            <form
              className="flex justify-between w-full border-2 border-black rounded-md overflow-hidden items-center"
              autoComplete="off"
            >
              <input
                type="text"
                placeholder="Search your favorite product..."
                autoComplete="off"
                name="search"
                className="w-full p-2"
              />
              <button type="button" className="product_search_desktop w-[30px]">
                <span className="flex items-center">
                  <Image
                    src="/imgs/product_search_icon.webp"
                    alt="Cart"
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            </form>
            <div className="absolute w-full bg-white z-10 rounded-b-[6px] desktop-product-searched"></div>
          </div>
          <div className="flex justify-end items-center w-[16%]">
            <p>
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-transparent sm:bg-black inline-block py-2 px-5 text-white font-semibold rounded-lg transition duration-300 hover:bg-transparent sm:hover:bg-black hover:text-white"
              >
                {/* <i className="fas fa-shopping-cart"></i>{" "} */}
                <div className="hidden md:block">
                  <span id="cart_item">{cartItems && cartItems.length}</span>{" "}
                  Items, <span id="subtotal">{subtotal}</span> AED
                </div>

              </button>
            </p>
          </div>
        </div>
        {/* Desktop view end */}

        {/* Mobile view start */}
        <nav className="bg-white block md:hidden border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className="logo_img"
              aria-label="Heets IQOS UAE logo"
            >
              <Image
                src="/imgs/heets-iqos-uae-logo.png"
                alt="Heets IQOS UAE logo"
                height={62}
                width={250}
                className="w-[250px] h-[62px]"
              />
            </Link>

            {/* Cart & Menu */}
            <div className="flex items-center gap-4">
              <button onClick={() => setIsCartOpen(true)} className="relative">
                <ShoppingCart className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems && cartItems.length}
                </span>
              </button>
              <button className="p-1">
                <Menu className="h-6 w-6 text-black" />
              </button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
          <div className="relative mx-auto">
            <form
              className="flex justify-between w-full border-2 border-black rounded-md overflow-hidden items-center"
              autoComplete="off"
            >
              <input
                type="text"
                placeholder="Search your favorite product..."
                autoComplete="off"
                name="search"
                className="w-full p-2"
              />
              <button type="button" className="product_search_desktop w-[30px]">
                <span className="flex items-center">
                  <Image
                    src="/imgs/product_search_icon.webp"
                    alt="Cart"
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            </form>
            <div className="absolute w-full bg-white z-10 rounded-b-[6px] desktop-product-searched"></div>
          </div>
          </div>
        </nav>
        {/* Mobile view end */}
      </div>



      <nav className="bg-black text-white hidden md:block">
        <div className="relative flex items-center justify-center">
          <ul className="flex items-center space-x-1">
            <li
              className="relative hover:ease-in-out duration-300 "
            >
              <Link
                href="/"
                className="flex items-center px-4 py-4 transition-colors"
              >
                Home
                <span className="ml-2">→</span>
              </Link>
            </li>
            {categories.map((item) => (
              <li
                key={item.id}
                className="relative hover:ease-in-out duration-300 "
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.slug != 'shop' &&
                  <Link
                    href={`/${item.slug}`}
                    className="flex items-center px-2 py-4 transition-colors"
                  >
                    {item?.slug?.split('-').join(' ').toUpperCase()}
                    <span className="ml-2">→</span>
                  </Link>
                }
                {item.children && activeDropdown === item.name && (
                  <div className="absolute left-0 top-full z-50 min-w-[200px] bg-white text-black shadow-lg">
                    <div className="flex">
                      <div className="flex-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={`/${item.slug}/${child.slug}`}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <li
              className="relative hover:ease-in-out duration-300 "
            >
              <Link
                href="/"
                className="flex items-center px-2 py-4 transition-colors"
              >
                Blogs
              </Link>
            </li>
            <li
              className="relative hover:ease-in-out duration-300 "
            >
              <Link
                href="/"
                className="flex items-center px-2 py-4 transition-colors"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile view start*/}
      <nav className="fixed block md:hidden bottom-0 left-0 right-0 z-[9999999] bg-white border-t border-gray-200 py-2">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xs mt-1 text-primary">Home</span>
          </Link>
          <Link href="/cart" className="flex flex-col items-center">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-xs mt-1 text-primary">Cart</span>
          </Link>
          <Link href="tel:+1234567890" className="flex flex-col items-center">
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-xs mt-1 text-primary">Call</span>
          </Link>
          <Link href="https://wa.me/1234567890" className="flex flex-col items-center">
            <Image src='/imgs/whatsapp-icon.svg' width={3} height={3} className="h-6 w-6 text-primary" />
            <span className="text-xs mt-1 text-primary">Whatsapp</span>
          </Link>
        </div>
      </nav>
      {/* Mobile view end*/}
    </>
  );
};

export default Navbar;
