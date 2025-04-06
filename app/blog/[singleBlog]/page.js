import React from 'react'
import { getSingleBlog, getSingleBlogData } from '@/app/utils/products';
import SingleBlog from './singleBlog';


const Page = async ({params}) => {
  const paramsUrl = await params
    const serverData = await getSingleBlogData(paramsUrl.singleBlog);

  return (
    <>
      <SingleBlog serverData={serverData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serverData?.schema_data) || {},
        }}
      />
    </>
    
  )
}

export default Page