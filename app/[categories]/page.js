import React from 'react'
import { getCategories, getProducts, getProductsByCategory } from '../utils/products';
import axios from 'axios';
import Categories from './categories';

const Page = async ({searchParams}) => {
  const id = await searchParams; 
  const categoryId = await id?.id; 

  const data = await getProductsByCategory(categoryId);

  return (
    <Categories productData={data} />
  )
}

export default Page