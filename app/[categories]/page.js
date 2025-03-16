import React from 'react'
import { getCategories, getCategoryBySlug, getCategoryMetadata, getProductBySlug, getProducts, getProductsByCategory, getSubcategoriesUrl } from '../utils/products';
import axios from 'axios';
import Categories from './categories';
import config from '@/lib/config';
import { unserialize } from 'php-serialize';
import { getSlug } from '../utils/common';

export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getCategoryMetadata(params?.categories);
  // console.log(data, 'check data from category')

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
      images: `${config.mainifest.url}/uploads/productIMG/${trimmedUrl}`,
    },
  };
}

const Page = async ({params}) => {
  const paramsUrl = await params; 
  const categoryId = await paramsUrl?.categories; 
  // const data = await getProductsByCategory(categoryId);
  const data = await getCategoryBySlug(categoryId);
  const location = await getCategoryBySlug("/abu-dhabi");
  console.log(location, 'check location data')
  // console.log(paramsUrl, 'check categor ka data')
  const categoryData = await getCategoryMetadata(categoryId);
  const subCategory = await getSubcategoriesUrl(categoryId)
  // console.log(subCategory, 'data from sub category')
  return (
    <Categories productData={data} subCategory={subCategory} categoryData={categoryData} />
  )
}

export default Page