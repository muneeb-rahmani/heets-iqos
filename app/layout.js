import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/cartProvider";
import CartModal from "./components/Modal";
import config from "@/lib/config";
import { getHomeData, getPagesFromCustom } from "./utils/products";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(props) {
    const homeData = await getHomeData()
  const title = homeData?.rank_math?.rank_math_title || "IQOS Heets Dubai | #1 Trusted Heets IQOS UAE Online Store"

  const description = homeData?.rank_math?.rank_math_description || "Buy IQOS Heets online in Dubai from the #1 trusted store in UAE. Enjoy 20% discount, instant 1 hour delivery, and a wide range of premium heets and terea flavors. Shop now!"

  
  return {
    title,
    description,
    alternates: {
      canonical: `${config.mainifest.url}`,
    },
    openGraph: {
      images: homeData?.acf_fields?.shareimage || "",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
        <meta name="google-site-verification" content="XXcMcA1_SOrvrhkOQu79zFM0yZXCdbCHeyyUmx8ZTdo" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        <Navbar />
        {children}
        <CartModal />
        <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
