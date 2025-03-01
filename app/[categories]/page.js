import React from 'react'
import { getCategories, getCategoryBySlug, getCategoryMetadata, getProducts, getProductsByCategory, getSubcategoriesUrl } from '../utils/products';
import axios from 'axios';
import Categories from './categories';

const Page = async ({params}) => {
  const paramsUrl = await params; 
  const categoryId = await paramsUrl?.categories; 
  // const data = await getProductsByCategory(categoryId);
  const data = await getCategoryBySlug(categoryId);
  const categoryData = await getCategoryMetadata(categoryId);
  const subCategory = await getSubcategoriesUrl(categoryId)
  // console.log(subCategory, 'data from sub category')
  return (
    <Categories productData={data} subCategory={subCategory} categoryData={categoryData} />
  )
}

export default Page