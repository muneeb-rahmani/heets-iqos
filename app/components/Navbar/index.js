"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useCart } from "@/app/context/cartProvider";
import Link from "next/link";
import {
  fetchCategories,
  getMenu,
  getSliderData,
} from "@/app/utils/products";
import { Home, ShoppingCart, Phone,  Menu } from "lucide-react";
const InfiniteSlider = dynamic(() => import("../TopSlider"), {
  ssr: false,
  loading: () => null, // or a minimal loader if you want
});

const Accordion = dynamic(() => import("@/components/ui/accordion").then(mod => mod.Accordion), {
  ssr: false,
});
const AccordionItem = dynamic(() => import("@/components/ui/accordion").then(mod => mod.AccordionItem), {
  ssr: false,
});
const AccordionTrigger = dynamic(() => import("@/components/ui/accordion").then(mod => mod.AccordionTrigger), {
  ssr: false,
});
const AccordionContent = dynamic(() => import("@/components/ui/accordion").then(mod => mod.AccordionContent), {
  ssr: false,
});


const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [categories, setCategories] = useState([]);
  const [reviewLength, setReviewLength] = useState("");
  const [totalSales, setTotalSales] = useState("");
  const { isCartOpen, setIsCartOpen,cartItems, setCartItems } = useCart();
  // const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggleMenu, settoggleMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const dropdownRef = useRef(null);

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

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products"); // Replace with your API endpoint
        const data = await response.json();
        // console.log(data, "data from api request");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    // Fetch only when user starts typing
  if (searchTerm.length > 0 && products.length === 0) {
    fetchProducts();
  }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      // console.log(products, "list of products");
      const results = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // console.log(results, "filtered result");
      setFilteredProducts(results);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    async function loadCategories() {
      const sliderData = await getSliderData();
      setReviewLength(sliderData[0]?.total_reviews);
      setTotalSales(sliderData[0]?.total_orders);
      getMenuData()
    }

    loadCategories();
  }, []);

  async function getMenuData() {
    const menu = await getMenu()
    // console.log(menu, "menu data from getMenuData")
    setCategories(menu)
    return menu
  }
  return (
    <>
      <InfiniteSlider reviewLength={reviewLength} totalSales={totalSales} />
      <div className=" relative">
        {/* Desktop view start */}
        <div className="hidden md:flex flex-wrap sm:hidden py-1 justify-between items-center">
          <div className="flex items-center w-1/4">
            <Link prefetch={false} href="/" className="logo_img" aria-label="Heets IQOS UAE logo">
              <Image
                src="/imgs/heets-iqos-uae-logo.png"
                overrideSrc="/imgs/heets-iqos-uae-logo.png"
                alt="Heets IQOS UAE logo"
                height={62}
                width={250}
                className="w-[250px] h-[62px]"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="relative w-[36%] mx-auto" ref={dropdownRef}>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="button" className="product_search_desktop w-[30px]">
                <span className="flex items-center">
                  <Image
                    src="/imgs/product_search_icon.webp"
                    alt="Search"
                    width={20}
                    height={20}
                  />
                </span>
              </button>
            </form>

            {/* Search Results Dropdown */}
            {showDropdown && (
              <div className="searchBar absolute w-full bg-white z-10 rounded-b-[6px] shadow-lg border mt-1 max-h-[250px] overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Link
                      key={index}
                      prefetch={false}
                      href={`/products/${product.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSearchTerm("")
                        setShowDropdown(false)
                      }}
                    >
                      {product.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">No products found</p>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end items-center w-[16%]">
            <p>
              <Link prefetch={false} href="/view-cart">
                <button
                  // onClick={() => setIsCartOpen(true)}
                  className="bg-transparent sm:bg-black inline-block py-2 px-5 text-white font-semibold rounded-lg transition duration-300 hover:bg-transparent sm:hover:bg-black hover:text-white"
                >
                  {/* <i className="fas fa-shopping-cart"></i>{" "} */}
                  <div className="hidden md:block">
                    <span id="cart_item">{cartItems && cartItems.length}</span>{" "}
                    Items, <span id="subtotal">{subtotal}</span> AED
                  </div>
                </button>
              </Link>
            </p>
          </div>
        </div>
        {/* Desktop view end */}

        {/* Mobile view start */}
        <nav className="bg-white block md:hidden border-b border-gray-200 px-5 py-5 md:px-5 md:py-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo */}
            <Link prefetch={false} href="/" className="logo_img" aria-label="Heets IQOS UAE logo">
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
              <Link prefetch={false} href='/view-cart' className="relative">
                <ShoppingCart className="h-6 w-6 text-black" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems && cartItems.length}
                </span>
              </Link>
              <button
                className="p-1"
                onClick={() => settoggleMenu(!toggleMenu)}
              >
                <Menu className="h-6 w-6 text-black" />
              </button>
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <div className="relative mx-auto" ref={dropdownRef}>
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="button"
                  className="product_search_desktop w-[30px]"
                >
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

              {/* Search Results Dropdown */}
              {showDropdown && (
                <div className="searchBar absolute w-full bg-white z-10 rounded-b-[6px] shadow-lg border mt-1 max-h-[250px] overflow-y-auto">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                      <Link
                      prefetch={false}
                        key={index}
                        href={`/products/${product.slug}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {product.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No products found</p>
                  )}
                </div>
              )}

              <div className="absolute w-full bg-white z-10 rounded-b-[6px] desktop-product-searched"></div>
            </div>
          </div>
        </nav>
        {/* Mobile view end */}
      </div>

      {toggleMenu && (
        <div className="searchBar absolute w-full bg-white z-10 rounded-b-[6px] shadow-lg border">
          <Link prefetch={false} href="/">Home Page</Link>
          <Accordion className="w-full px-4 mt-4">
            {categories.map((item) => (
              <AccordionItem
                key={item.id}
                value={item?.title || "-"}
                className="w-full"
              >
                {item.actual_url != "shop" && item.actual_url != "products" && (
                  <AccordionTrigger className="text-left p-0 w-full">
                    <Link
                      prefetch={false}
                      href={item?.actual_url || "#"}
                      className="flex items-center px-2 py-4 transition-colors w-full arrowTrigger"
                    >
                        {item?.title || "-"}
                    </Link>
                  </AccordionTrigger>
                )}
                <AccordionContent>
                  <ul>
                    {item?.sub_menu?.map((child) => (
                      <li key={child.id}>
                        <span className="mob-arrow">→</span>
                        <Link
                          prefetch={false}
                          href={child?.actual_url || "#"}
                          aria-label={child?.title}
                        >
                          {child?.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}

      <nav className="bg-black text-white hidden md:block">
        <div className="relative flex items-center justify-center">
          <ul className="flex items-center space-x-1">
            {categories.map((item) => (
              <li
                key={item.id}
                className="relative hover:ease-in-out duration-300 "
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.actual_url != "shop" && item.actual_url != "products" && (
                  <Link
                    prefetch={false}
                    href={item.actual_url}
                    className="flex items-center px-2 py-4 transition-colors"
                  >
                    {item?.title || "-"}
                    <span className="ml-2">→</span>
                  </Link>
                )}
                {item.sub_menu && activeDropdown === item.id && (
                  <div className="absolute left-0 top-full z-50 min-w-[200px] bg-white text-black shadow-lg">
                    <div className="flex">
                      <div className="flex-1">
                        {item.sub_menu.map((child) => (
                          <Link
                            prefetch={false}
                            key={child.title}
                            href={child?.actual_url || "#"}
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
            <li className="relative hover:ease-in-out duration-300 ">
              <Link
                prefetch={false}
                href="/blog"
                className="flex items-center px-2 py-4 transition-colors"
              >
                Blogs
              </Link>
            </li>
            <li className="relative hover:ease-in-out duration-300 ">
              <Link
              prefetch={false}
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
          <Link prefetch={false} href="/view-cart" className="flex flex-col items-center">
            <ShoppingCart className="h-6 w-6 text-primary" />
            <span className="text-xs mt-1 text-primary">Cart</span>
          </Link>
          <Link prefetch={false} href="tel:+1234567890" className="flex flex-col items-center">
            <Phone className="h-6 w-6 text-primary" />
            <span className="text-xs mt-1 text-primary">Call</span>
          </Link>
          <Link
          prefetch={false}
            href="https://wa.me/1234567890"
            className="flex flex-col items-center"
          >
            <Image
              src="/imgs/whatsapp-icon.svg"
              alt="whatsapp icon"
              width={3}
              height={3}
              className="h-6 w-6 text-primary"
            />
            <span className="text-xs mt-1 text-primary">Whatsapp</span>
          </Link>
        </div>
      </nav>
      {/* Mobile view end*/}

      {/* Whatsapp icon */}
      <a
        href="https://api.whatsapp.com/send?phone=971526937203&amp;text=Hello There, What are the offers provided by your website? Can I know more about your products. - https://heetsiqosuae.ae/"
        className="whatsapp-float"
        target="_blank"
        aria-label="whatsapp button"
      >
        <div className="footer-sticky">
          <div className="footer-sticky-left">
            <p>
              Want us to order for you? We are happy to take your order on
              WhatsApp. <span>Connect Now</span>
            </p>
          </div>
          <div className="footer-sticky-right">
            <div className="rounded-icon">
              <p>
                <Image
                  src="https://heetsiqosuae.ae/assets/front/images/footerbar_desktop_whatsapp_icon.webp"
                  alt="whatsapp"
                  width={50}
                  height={50}
                />
              </p>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};

export default Navbar;
