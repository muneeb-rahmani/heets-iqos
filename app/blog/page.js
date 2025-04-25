import React from 'react'
import axios from 'axios';
import BlogPage from './blogs';
import { getBlogs } from '../utils/products';
import { getSlug } from '../utils/common';
import config from '@/lib/config';
//muneeb


export async function generateMetadata(props) {
  
  const title = "Blog | Heets IQOS UAE"

  const description = ""

  const url = `${config.mainifest.url}blog/`


  return {
    title,
    description,
    url,
    alternates: {
      canonical: url,
    },
  };
}

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