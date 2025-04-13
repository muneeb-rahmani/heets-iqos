import React from "react";
import {
  getCategories,
  getCategoryData,
  getCategoryMetadata,
  getProducts,
  getProductsByCategory,
  getSEOData,
} from "../utils/products";
import axios from "axios";
import AbuDhabi from "./abuDhabi";
import { getSlug, parseRankMathData } from "../utils/common";
import config from "@/lib/config";
import { unserialize } from "php-serialize";

export async function generateMetadata(props) {
  const data = await getCategoryData('abu-dhabi');
  // console.log(data, "check data from generateMetadata");
  const title = data
    ? data?.rank_math?.title
    : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";

  const description = data
    ? data?.rank_math?.description
    : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";

  const url = config.mainifest.url + "/" + data?.category_details?.cat_slug;
  
  return {
    title,
    description,
    url,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: data?.custom_fields?.cat_share_image,
    },
  };
}



const Page = async (props) => {
  const data = await getCategoryData('abu-dhabi');


  return (
    <>
      <AbuDhabi productData={data}  />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data?.schema_data) || {},
        }}
      />
    </>
  );
};

export default Page;
