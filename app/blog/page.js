import React from 'react'
import axios from 'axios';
import BlogPage from './blogs';
import { getBlogs } from '../utils/products';
import { getSlug } from '../utils/common';
//muneeb


const Page = async () => {
    const serverData = await getBlogs();
   
 console.log(serverData, 'serverData')
  return (
    <>
      <BlogPage serverData={serverData} />
    </>
    
  )
}

export default Page