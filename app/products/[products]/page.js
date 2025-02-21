import axios from "axios";
// import { getReviewByProduct, getSingleProduct } from "../utils/products";
import SingleProduct from "./singleProduct";
import { getProductBySlug, getReviewByProduct, getSingleProduct } from "@/app/utils/products";

export default async function Page({params, searchParams}) {
  const id = await searchParams; 
  const slugData = await getProductBySlug(params.products)
  const productId = await slugData?.id; 
  const data = await getSingleProduct(productId);
  const reviews = await getReviewByProduct(productId);
  console.log(reviews, 'check reviews from page')
  const relatedProducts = await axios?.all(data?.related_ids?.map(id => getSingleProduct(id)))
  // console.log(relatedProducts, 'check data from page')
  

  return (
    <>
      <SingleProduct serverData={slugData} reviews={reviews} relatedProducts={relatedProducts} />
    </>
  );
}
