import React from 'react'
import { getCategoryBySlug, getCategoryData, getCategoryMetadata, getProductBySlug, getSEOData } from '@/app/utils/products';
import CategoryProduct from './categoryProduct';
import Head from 'next/head';
import config from '@/lib/config';
import { getSlug, parseRankMathData } from '@/app/utils/common';
import Script from 'next/script';
//muneeb

export async function generateMetadata(props) {
  const params = await props.params;
  const { categoryProduct } = await params;
  const data = await getCategoryData(categoryProduct)
  
  const title = data
      ? data?.rank_math?.title
      : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";
  
    const description = data
      ? data?.rank_math?.description
      : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";
  
    const url = data?.category_details?.parent_cat?.slug && data?.category_details?.cat_slug ? `${config.mainifest.url}${data?.category_details?.parent_cat?.slug}/${data?.category_details?.cat_slug}` : "";
    // console.log(data, "category data in metadata")
    
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
  const { categoryProduct } = await paramsUrl;
  const categoryData = await getCategoryData(categoryProduct)
  // console.log(categoryData, "categoryData")
  
  return (
    <>
      <CategoryProduct categoryData={categoryData} />
     
    </>
  )
}

export default Page