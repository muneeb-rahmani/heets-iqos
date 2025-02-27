import React from 'react'
import { getCategoryBySlug, getCategoryMetadata } from '@/app/utils/products';
import CategoryProduct from './categoryProduct';


const Page = async ({params}) => {
  const paramsUrl = await params; 
  const categoryId = await paramsUrl?.categories; 
  // const data = await getProductsByCategory(categoryId);
  const data = await getCategoryBySlug(categoryId);
  const categoryData = await getCategoryMetadata(categoryId);

  return (
    <CategoryProduct productData={data} categoryData={categoryData} />
  )
}

export default Page