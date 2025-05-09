import React from "react";
import {
  getCategoryData,
} from "../utils/products";

import config from "@/lib/config";
import Sharjah from "./sharjah";

//muneeb

export async function generateMetadata(props) {
  const data = await getCategoryData('sharjah');
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
  const data = await getCategoryData('sharjah');


  return (
    <>
      <Sharjah productData={data}  />

      
    </>
  );
};

export default Page;
