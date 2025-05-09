import React from 'react'
import { getSingleBlog, getSingleBlogData } from '@/app/utils/products';
import SingleBlog from './singleBlog';
import config from '@/lib/config';

//muneeb
export async function generateMetadata(props) {
  const params = await props.params;
  const data = await getSingleBlogData(params.singleBlog);
  // console.log(serverData, "serverData");
  const title = data
    ? data?.title
    : "Best Dermatologists in India - Find Top Rated Dermatologists Near You";

  const description = data
    ? data?.excerpt
    : "Explore detailed reviews, contact information, and opening hours. Learn about their expert skin and hair care treatments tailored to your needs. Discover personalized dermatology solutions today!";

  const url = data?.actual_slug ? `${config.mainifest.url}${data?.actual_slug}` : "";


  return {
    title,
    description,
    url,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: data?.featured_image,
    },
  };
}

const Page = async ({params}) => {
  const paramsUrl = await params
    const serverData = await getSingleBlogData(paramsUrl.singleBlog);

  return (
    <>
      <SingleBlog serverData={serverData} />
      
    </>
    
  )
}

export default Page