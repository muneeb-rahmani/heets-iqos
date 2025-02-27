import React from 'react'
import { getSingleBlog } from '@/app/utils/products';
import SingleBlog from './singleBlog';


const Page = async ({params}) => {
  const paramsUrl = await params
    const serverData = await getSingleBlog(paramsUrl.singleBlog);
//  console.log(params, 'serverData params')
  return (
    <>
      <SingleBlog serverData={serverData} />
    </>
    
  )
}

export default Page