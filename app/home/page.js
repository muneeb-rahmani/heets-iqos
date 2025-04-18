import React from "react";
import HomePage from "./homepage";
import {
  getHomeData,
} from "../utils/products";

export const revalidate = 60;

const Page = async () => {

  const homeData = await getHomeData()
  // console.log(homeData, "homeData");
  return (
    <>
      <HomePage  homeData={homeData} />
      {homeData?.schema_data && (

        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeData?.schema_data),
        }}
        />
      )}
    </>
  );
};

export default Page;
