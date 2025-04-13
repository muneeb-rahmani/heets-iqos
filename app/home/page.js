import React from "react";
import HomePage from "./homepage";
import {
  getHomeData,
} from "../utils/products";


const Page = async () => {

  const homeData = await getHomeData()
  // console.log(homeData, "homeData");
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
