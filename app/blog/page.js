import React from 'react'
import axios from 'axios';
import BlogPage from './blogs';
import { getBlogs } from '../utils/products';
import { getSlug } from '../utils/common';
import config from '@/lib/config';
//muneeb


// export async function generateMetadata(props) {
  
//   const data = await getBlogs();
//   console.log(data, "data");
//   const title = data
//     ? data?.title
//     : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";

//   const description = data
//     ? data?.excerpt
//     : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";

//   const url = data ? `${config.mainifest.url}${data?.slug}` : "";


//   return {
//     title,
//     description,
//     url,
//     alternates: {
//       canonical: url,
//     },
//     openGraph: {
//       images: data?.featured_image,
//     },
//   };
// }

const Page = async () => {
    const serverData = await getBlogs();
   
//  console.log(serverData, 'serverData')
  return (
    <>
      <BlogPage serverData={serverData} />
    </>
    
  )
}

export default Page