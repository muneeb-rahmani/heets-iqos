"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useCart } from "@/app/context/cartProvider";
import Link from "next/link";
import CartModal from "../Modal";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const {isCartOpen, setIsCartOpen } = useCart();


  const navItems = [
    { title: "Home", href: "/" },
    {
      title: "Heets",
      href: "/heets",
      children: [
        { title: "IQOS ILUMA One", href: "/iqos-iluma-one" },
        { title: "IQOS ILUMA Standard", href: "/iqos-iluma-standard" },
        { title: "IQOS ILUMA PRIME", href: "/iqos-iluma-prime" },
      ],
    },
    {
      title: "Heets Terea Sticks",
      href: "/heets-terea-sticks",
      children: [
        { title: "IQOS ILUMA One", href: "/iqos-iluma-one" },
        { title: "IQOS ILUMA Standard", href: "/iqos-iluma-standard" },
        { title: "IQOS ILUMA PRIME", href: "/iqos-iluma-prime" },
      ],
    },
    {
      title: "IQOS",
      href: "/iqos",
      children: [
        { title: "IQOS ILUMA One", href: "/iqos-iluma-one" },
        { title: "IQOS ILUMA Standard", href: "/iqos-iluma-standard" },
        { title: "IQOS ILUMA PRIME", href: "/iqos-iluma-prime" },
      ],
    },
    {
      title: "IQOS ILUMA i",
      href: "/iqos-iluma-i",
      children: [
        { title: "IQOS ILUMA One", href: "/iqos-iluma-one" },
        { title: "IQOS ILUMA Standard", href: "/iqos-iluma-standard" },
        { title: "IQOS ILUMA PRIME", href: "/iqos-iluma-prime" },
      ],
    },
    {
      title: "IQOS ILUMA",
      href: "/iqos-iluma",
      children: [
        { title: "IQOS ILUMA One", href: "/iqos-iluma-one" },
        { title: "IQOS ILUMA Standard", href: "/iqos-iluma-standard" },
        { title: "IQOS ILUMA PRIME", href: "/iqos-iluma-prime" },
      ],
    },
    {
      title: "IQOS Originals",
      href: "/iqos-originals",
      children: [
        { title: "IQOS ILUMA One", href: "/iqos-iluma-one" },
        { title: "IQOS ILUMA Standard", href: "/iqos-iluma-standard" },
        { title: "IQOS ILUMA PRIME", href: "/iqos-iluma-prime" },
      ],
    },
    {
      title: "LAMBDA Device",
      href: "/lambda-device",
      children: [
        { title: "IQOS ILUMA One", href: "/iqos-iluma-one" },
        { title: "IQOS ILUMA Standard", href: "/iqos-iluma-standard" },
        { title: "IQOS ILUMA PRIME", href: "/iqos-iluma-prime" },
      ],
    },
    { title: "Blogs", href: "/blogs" },
    { title: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <div className="px-5 snipcss-aFEnc">
        <div className="flex flex-wrap py-1 justify-between items-center">
          <div className="flex items-center w-1/4">
            <Link
              href="https://121org.shop/"
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
                    src="https://121org.shop/assets/front/images/product_search_icon.webp"
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
                className="bg-black inline-block py-2 px-5 text-white font-semibold rounded-lg transition duration-300 hover:bg-black hover:text-white"
              >
                <i className="fas fa-shopping-cart"></i>{" "}
                <span id="cart_item">0</span> Items,{" "}
                <span id="subtotal">0</span> AED
              </button>
            </p>
          </div>
          <div className="hidden mobile_menu_wrap">
            <Link
              href="https://121org.shop/cart/"
              className="cart_icon_top text-xl text-[#8b2c2a]"
              aria-label="cart page button"
            >
              <Image
                src="https://121org.shop/assets/front/images/mobile_cart_icon.png"
                alt="Cart"
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
              />
              <span
                id="cart_item_mob"
                className="absolute top-[-5px] right-[-5px] w-[15px] h-[15px] text-[10px] font-semibold text-white flex justify-center items-center border-2 border-black rounded-full bg-black"
              >
                0
              </span>
            </Link>
            <Link href="javascript:;" aria-label="category menu icon">
              <span className="burger">
                <Image
                  src="https://121org.shop/assets/front/images/menu-open-icon.webp"
                  alt="Menu Open"
                  height={30}
                  width={30}
                  className="w-[20px] h-[20px]"
                />
              </span>
              <span className="close_menu">
                <Image
                  src="https://121org.shop/assets/front/images/menu-close-icon.webp"
                  alt="Menu Close"
                  height={30}
                  width={30}
                  className="w-[30px] h-[30px]"
                />
              </span>
            </Link>
            <div className="absolute w-full bg-white top-[75px] z-[99] shadow-lg p-4 mob_menu mob_menu_new_style">
              <Link className="review-link" href="#">
                <div className="flex items-center mb-4">
                  <div className="w-[40px] h-[40px]">
                    <Image
                      src="https://121org.shop/assets/front/images/google-customer-reviews.png"
                      alt="Google Customer Reviews"
                      width={40}
                      height={40}
                      className="w-[40px] h-[40px]"
                    />
                  </div>
                  <div className="ml-2">
                    <p className="text-lg font-semibold text-[#646363]">
                      Google Reviews
                    </p>
                    <p className="text-yellow-400 text-2xl">★★★★★</p>
                    <p className="text-center text-[#646363] font-medium">
                      <strong>4.9</strong> Star Based On{" "}
                      <strong>499 Reviews</strong>
                    </p>
                  </div>
                </div>
              </Link>
              <ul className="list-none p-2">
                <li>
                  <Link
                    href="https://121org.shop/"
                    className="text-[#8b2c2a] font-semibold text-lg"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex justify-between items-center py-2">
                    <Link
                      href="https://121org.shop/heets/"
                      className="drop-menu text-[#8b2c2a] font-semibold text-lg"
                    >
                      Heets
                    </Link>
                    <span className="drop-img">
                      <Image
                        src="https://121org.shop/assets/front/images/plus.webp"
                        alt="menu plus"
                        width={30}
                        height={30}
                        className="w-[30px] h-[30px]"
                      />
                    </span>
                  </div>
                  <div className="submenu_wrap mob-sub-menu bg-[#f1f1f1] shadow-lg">
                    <ul className="py-2 pl-5">
                      <li>
                        <Link
                          href="https://121org.shop/heets/classic-kazakhstan/"
                          className="mob-arrow"
                        >
                          → Heets Classic
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://121org.shop/heets/parliament/"
                          className="mob-arrow"
                        >
                          → Heets Parliament
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://121org.shop/heets/pearl/"
                          className="mob-arrow"
                        >
                          → Heets Pearl
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://121org.shop/heets/heets-bundles/"
                          className="mob-arrow"
                        >
                          → Heets Bundle offer
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://121org.shop/heets/fiit/"
                          className="mob-arrow"
                        >
                          → Heets Fiit
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://121org.shop/heets/dimensions/"
                          className="mob-arrow"
                        >
                          → Heets Dimension
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://121org.shop/heets/creations/"
                          className="mob-arrow"
                        >
                          → Heets Creation
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-black text-white">
        <div className="relative flex items-center justify-center">
          <ul className="flex items-center space-x-1">
            {navItems.map((item) => (
              <li
                key={item.title}
                className="relative hover:ease-in-out duration-300 "
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center px-4 py-4 transition-colors"
                >
                  {item.title}
                  <span className="ml-2">→</span>
                </Link>
                {item.children && activeDropdown === item.title && (
                  <div className="absolute left-0 top-full z-50 min-w-[200px] bg-white text-black shadow-lg">
                    <div className="flex">
                      <div className="flex-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
