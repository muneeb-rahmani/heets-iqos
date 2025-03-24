import React from 'react'
import { getCategoryBySlug, getCategoryMetadata, getProductBySlug, getSEOData } from '@/app/utils/products';
import CategoryProduct from './categoryProduct';
import Head from 'next/head';
import config from '@/lib/config';
import { unserialize } from 'php-serialize';
import { getSlug, parseRankMathData } from '@/app/utils/common';
import Script from 'next/script';

export async function generateMetadata(props) {
  const params = await props.params;
  const { categoryProduct } = await params;
  const data = await getCategoryMetadata(categoryProduct);
  // console.log(data,'categoryData');
  
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

  const rankMathData = await getSEOData(`${categoryProduct}/${categories}`);
  const jsonLdData = parseRankMathData(rankMathData);
  // Dynamic URL replacement
  const currentUrl = `${config.mainifest.url}/${categories}/${categoryProduct}`;

  // Modify the jsonLdData to have the correct url.
  if (jsonLdData && Array.isArray(jsonLdData['@graph'])) {
    jsonLdData['@graph'] = jsonLdData['@graph'].map((item) => {
      if (item['@type'] === 'WebPage' && item.url === '%url%') {
        return { ...item, url: currentUrl, potentialAction: item.potentialAction.map(action => {
          if(action['@type'] === 'ReadAction'){
            return {...action, target: [currentUrl]};
          }
          return action;
        })};
      }
      if (item['@type'] === 'WebPage' && item['@id'] === '#webpage'){
        return {...item, url: currentUrl};
      }
      return item;
    });
  }

  console.log(jsonLdData, "check jsonLdData data");
  return (
    <>
      {/* <Head> */}
        <div dangerouslySetInnerHTML={{ __html: metaTags }} />
        {jsonLdData && (
          <Script
            type="application/ld+json"
            strategy="beforeInteractive"
            // strategy="worker"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
          />
        )}
      {/* </Head> */}
      <CategoryProduct productData={data} categoryData={categoryData} />
    </>
  )
}

export default Page