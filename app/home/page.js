import React from "react";
import HomePage from "./homepage";
import {
  getCategories,
  getHomeData,
  getPages,
  getPagesFromCustom,
  getProducts,
  getProductsByCategory,
  getSEOData,
} from "../utils/products";
import axios from "axios";
import { parseRankMathData } from "../utils/common";

const Page = async () => {
  // const productData = await getProducts();
  // console.log(productData, 'check muneeb')
  const homeData = await getHomeData()
  console.log(homeData, 'check muneeb')

  const categoryIds = await getCategories();
  const fetchCategoryAndProducts = async () => {
    try {
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
      // console.log(data, "check category data");
  
      return data;
      
    } catch (error) {
      console.log("Error in  fetchCategoryAndProducts", error);
      throw error
    }
  };

  const homepageDescripton = await getPagesFromCustom("homepage")
  // console.log(homepageDescripton , 'check homepageDescripton')
  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const data = await fetchCategoryAndProducts();
  const rankMathData = await getSEOData(url)
  const jsonLdData = parseRankMathData(rankMathData);

  return (
    <>
      <HomePage productData={data} homeData={homeData} homepageDescripton={homepageDescripton} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData, null, 2),
        }}
      />
    </>
  );
};

export default Page;
