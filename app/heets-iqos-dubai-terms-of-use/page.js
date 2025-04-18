import React from 'react'
import {  getTermsUse } from '../utils/products'

export const revalidate = 60;
const Page = async () => {
  const data = await getTermsUse()
    // console.log(data, 'check data from privacy')
  return (
    <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">{data?.title}</h1>
        <div className="prose lg:prose-lg mx-auto mt-6" dangerouslySetInnerHTML={{ __html: data?.content }}></div>
    </div>
  )
}

export default Page