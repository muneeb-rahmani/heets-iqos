import SingleProduct from "./singleProduct";
import {
  getBreadCrumbsData,
  getProductData,
} from "@/app/utils/products";

import config from "@/lib/config";
//muneeb

export async function generateMetadata(props) {
  const parameter = await props.params;
  const data = await getProductData(parameter?.products);
console.log(data, "product data in metadata")
  const title = data
    ? data?.seo?.rank_math_title
    : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";

  const description = data
    ? data?.seo?.rank_math_description
    : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";

  const url = data ? `${config.mainifest.url}${data?.actual_slug}` : "";


  return {
    title,
    description,
    url,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: data?.main_image[0],
    },
  };
}

export default async function Page({ params}) {
  const parameter = await params;
  const productData = await getProductData(parameter?.products);
  const breadCrumb = await getBreadCrumbsData(parameter?.products);
  
  return (
    <>
      <SingleProduct
        serverData={productData}
        breadCrumb={breadCrumb}
      />
      
    </>
  );
}
