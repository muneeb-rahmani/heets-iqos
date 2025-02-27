import React from 'react'
import { getCategoryBySlug, getCategoryMetadata, getSEOData } from '@/app/utils/products';
import CategoryProduct from './categoryProduct';
import Head from 'next/head';


const Page = async ({params}) => {
  const paramsUrl = await params; 
  const { categories,categoryProduct } = await paramsUrl;
  // console.log(paramsUrl, 'paramsUrl');
  // const categoryId = await paramsUrl?.categoryProduct; 
  const seoData = await getSEOData(`${categories}/${categoryProduct}`);
  // console.log(seoData, 'seoData');
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