import axios from "axios";
// import { getReviewByProduct, getSingleProduct } from "../utils/products";
import SingleProduct from "./singleProduct";
import {
  getBreadCrumbsData,
  getProductBySlug,
  getProductImages,
  getReviewByProduct,
  getSEOData,
  getSingleProduct,
} from "@/app/utils/products";
import { unserialize } from "php-serialize";
import { getSlug, parseRankMathData } from "@/app/utils/common";
import config from "@/lib/config";

export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getProductBySlug(params?.products);

  const title = data
    ? data?.meta_data?.rank_math_title[0]
    : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";

  const description = data
    ? data?.meta_data?.rank_math_description[0]
    : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";

  const url = data ? `${config.mainifest.url}products/${data?.permalink}` : "";
  const serializedData =  data?.meta_data?._harikrutfiwu_url[0];

  const result = unserialize(serializedData);

  return {
    title,
    description,
    url,
    alternates: {
      canonical: `${config.mainifest.url}products/${data?.slug}`,
    },
    openGraph: {
      images: result?.img_url,
    },
  };
}

export default async function Page({ params, searchParams }) {
  const slugData = await getProductBySlug(params?.products);
  const breadCrumb = await getBreadCrumbsData(params?.products);
  const { _harikrutfiwu_wcgallary } = slugData?.meta_data || {};
  const image =
    Array.isArray(_harikrutfiwu_wcgallary) && _harikrutfiwu_wcgallary.length > 0
      ? unserialize(_harikrutfiwu_wcgallary[0])
      : null;
  const imagesArray = await getProductImages(params?.products);
  // console.log(imagesArray, 'check imagesArray')
  
  const productId = await slugData?.id;
  
  const data = await getSingleProduct(productId);
  const reviews = await getReviewByProduct(productId);
  
  const relatedProducts = await axios?.all(
    data?.related_ids?.map((id) => getSingleProduct(id))
  );
  

  const rankMathData = await getSEOData(slugData?.permalink);
  const jsonLdData = parseRankMathData(rankMathData);
  // console.log(rankMathData, 'check jsonLdData')

  return (
    <>
      <SingleProduct
        serverData={slugData}
        imagesData={imagesArray.images}
        reviews={reviews}
        relatedProducts={relatedProducts}
        breadCrumb={breadCrumb}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData, null, 2) || {},
        }}
      />
    </>
  );
}
