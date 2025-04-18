import SingleProduct from "./singleProduct";
import {
  getBreadCrumbsData,
  getProductData,
} from "@/app/utils/products";

import config from "@/lib/config";
export const revalidate = 60;

export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getProductData(params?.products);

  const title = data
    ? data?.seo?.rank_math_title
    : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";

  const description = data
    ? data?.seo?.rank_math_description
    : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";

  const url = data ? `${config.mainifest.url}products/${data?.slug}` : "";


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
  const productData = await getProductData(params?.products);
  const breadCrumb = await getBreadCrumbsData(params?.products);
  
  return (
    <>
      <SingleProduct
        serverData={productData}
        breadCrumb={breadCrumb}
      />
      {productData?.schema_data && (

       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productData?.schema_data) || {},
        }}
        />
      )}
    </>
  );
}
