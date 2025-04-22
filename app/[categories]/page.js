
import React from 'react'
import { getCategoryData, getSubcategoriesUrl } from '../utils/products';
import axios from 'axios';
import Categories from './categories';
import config from '@/lib/config';

//muneeb
export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getCategoryData(params?.categories);
  
  const title = data
  ? data?.rank_math?.title
  : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";
  
  const description = data
  ? data?.rank_math?.description
  : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";
  
  const url = data?.category_details?.cat_slug ? `${config.mainifest.url}${data?.category_details?.cat_slug}` : "";
  
  // console.log(url, "category data in metadata")

  
  return {
    title,
    description,
    url,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: data?.custom_fields?.cat_share_image,
    },
  };
}

const Page = async ({params}) => {
  const paramsUrl = await params; 
  const categoryId = await paramsUrl?.categories; 

  const categoryData = await getCategoryData(categoryId)

  const subCategory = await getSubcategoriesUrl(categoryId)
console.log(categoryData, "category data in page")
  return (
    <>
      <Categories subCategory={subCategory} categoryData={categoryData} />
      {categoryData?.schema_data && (
        <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryData?.schema_data),
        }}
        />
      )}
    </>
  )
}

export default Page