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

  const homeData = await getHomeData()

  return (
    <>
      <HomePage  homeData={homeData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeData?.schema_data),
        }}
      />
    </>
  );
};

export default Page;
