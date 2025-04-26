"use client";

import dynamic from "next/dynamic";

const CartModal = dynamic(() => import("./Modal"), {
  ssr: false,
  loading: () => null,
});

const Footer = dynamic(() => import("./Footer"), {
  ssr: false,
  loading: () => null,
});

export default function DynamicLayoutClientWrapper({ children }) {
  return (
    <>
      {children}
      <CartModal />
      <Footer />
    </>
  );
}
