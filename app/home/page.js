import React from "react";
import HomePage from "./homepage";
import {
  getHomeData,
} from "../utils/products";

//muneeb

const Page = async () => {

  const homeData = await getHomeData()
  // console.log(homeData, "homeData");
  return (
    <>
      <HomePage  homeData={homeData} />
      
    </>
  );
};

export default Page;
