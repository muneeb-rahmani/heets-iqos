import React from 'react'
import { getCategoryBySlug, getCategoryMetadata, getProductBySlug, getSEOData } from '@/app/utils/products';
import CategoryProduct from './categoryProduct';
import Head from 'next/head';
import config from '@/lib/config';
import { unserialize } from 'php-serialize';
import { getSlug } from '@/app/utils/common';

export async function generateMetadata(props) {
  const params = await props.params;
  const { categoryProduct } = await params;
  const data = await getCategoryMetadata(categoryProduct);
  console.log(data,'categoryData');
  
  const title = data
      ? data[0]?.meta_data?.rank_math_title[0]
      : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";
  
    const description = data
      ? data[0]?.meta_data[0]?.rank_math_description[0]
      : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";
  
    const url = data ? `${config.mainifest.url}/products/${data[0]?.permalink}` : "";
  
    const serializedData = `a:3:{s:7:"img_url";s:90:"https://121heets.shop/uploads/productIMG/heets-bronze-selection-sticks-for-iqos-device.jpg";s:5:"width";i:600;s:6:"height";i:600;}`;
  
    const result = unserialize(serializedData);
    const trimmedSlug = getSlug(data[0]?.permalink,'split');
    const trimmedUrl = getSlug(result?.img_url,'split');
    
    return {
      title,
      description,
      url,
      alternates: {
        canonical: `${config.mainifest.url}/${trimmedSlug}`,
      },
      openGraph: {
        images: data[0]?.meta_data[0]?.cat_share_image[0],
      },
    };
}

const Page = async ({params}) => {
  const paramsUrl = await params; 
  const { categories,categoryProduct } = await paramsUrl;
  
  const seoData = await getSEOData(`${categories}/${categoryProduct}`);
  const data = await getCategoryBySlug(categoryProduct);
  const categoryData = await getCategoryMetadata(categoryProduct);

    // Extract meta tags & schema from API response
    const metaTags = seoData?.head || "";
    const schemaScript = seoData?.head?.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1];

  return (
    <>
      <Head>
        <div dangerouslySetInnerHTML={{ __html: metaTags }} />
        {schemaScript && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaScript }} />
        )}
      </Head>
      <CategoryProduct productData={data} categoryData={categoryData} />
    </>
  )
}

export default Page