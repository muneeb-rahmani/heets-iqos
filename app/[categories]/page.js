import React from 'react'
import { getCategories, getCategoryBySlug, getProducts, getProductsByCategory } from '../utils/products';
import axios from 'axios';
import Categories from './categories';

const Page = async ({searchParams, params}) => {
  const id = await searchParams; 
  const categoryId = await params?.categories; 
  // const data = await getProductsByCategory(categoryId);
  const data = await getCategoryBySlug(categoryId);

  return (
    <Categories productData={data ?? []} />
  )
}

export default Page