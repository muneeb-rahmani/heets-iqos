import axios from "axios";
import { getReviewByProduct, getSingleProduct } from "../utils/products";
import SingleProduct from "./singleProduct";

export default async function Page({searchParams}) {
  const id = await searchParams; 
  const productId = await id?.product; 
  const data = await getSingleProduct(productId);
  const reviews = await getReviewByProduct(productId);
  const relatedProducts = await axios.all(data?.related_ids?.map(id => getSingleProduct(id)))
  // console.log(relatedProducts, 'check data from page')
  

  return (
    <>
      <SingleProduct serverData={data} reviews={reviews} relatedProducts={relatedProducts} />
    </>
  );
}
