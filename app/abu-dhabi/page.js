import React from "react";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "../utils/products";
import axios from "axios";
import AbuDhabi from "./abuDhabi";

const Page = async ({params}) => {
  // const productData = await getProducts();
  // console.log(productData, 'check muneeb')
  const categoryIds = await getCategories();
  const url = await params
  console.log(url, 'check url')
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

  return (
    <>
      <AbuDhabi productData={data} productCategories={categoryIds} />
    </>
  );
};

export default Page;
