import React from 'react'
import { getCategoryBySlug } from '@/app/utils/products';
import Categories from '../categories';

const Page = async ({searchParams, params}) => {
  const id = await searchParams; 
  const categoryId = await params?.categoryProduct; 
  // const data = await getProductsByCategory(categoryId);
  const data = await getCategoryBySlug(categoryId);

  return (
    <Categories productData={data ?? []} />
  )
}

export default Page