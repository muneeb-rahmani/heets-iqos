import React from "react";
import {
  getCategories,
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
  const data = await getCategoryMetadata('abu-dhabi');
  // console.log(data, "check data from generateMetadata");
  const title = data
    ? data[0]?.meta_data.rank_math_title[0]
    : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";

  const description = data
    ? data[0]?.meta_data?.rank_math_description[0]
    : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";

  const url = getSlug(data[0]?.permalink,'split');
  
  return {
    title,
    description,
    url,
    alternates: {
      canonical: `${config.mainifest.url}${url}`,
    },
    openGraph: {
      images: data[0]?.meta_data?.cat_share_image[0],
    },
  };
}



const Page = async (props) => {
  const categoryIds = await getCategories();
  // console.log(categoryIds, "check categoryIds data");
  const fetchCategoryAndProducts = async () => {
    const categoryId = categoryIds?.map(({ id: itemId, name: itemName }) => ({
      id: itemId,
      name: itemName,
    }));
    // console.log(categoryId, "check categoryId data");
    const data = await axios?.all(
      categoryId?.map(async (item) => {
        // console.log(item.id, "check id from categoryId map");
        const products = await getProductsByCategory(item.id);
        return { products, category: item.name };
      })
    );

    return data;
  };

  const data = await fetchCategoryAndProducts();
  const rankMathData = await getSEOData(`${config.mainifest.url}/abu-dhabi`);
  const jsonLdData = parseRankMathData(rankMathData);
  const metaData = await getCategoryMetadata('abu-dhabi');

  return (
    <>
      <AbuDhabi productData={data} metaData={metaData} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData, null, 2) || {},
        }}
      />
    </>
  );
};

export default Page;
