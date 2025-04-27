import React from 'react'
import { getPages } from '../utils/products'
//muneeb

const Page = async () => {
  const data = await getPages(4993)
    // console.log(data, 'check data from privacy')
  return (
    <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-center mb-6">{data?.title?.rendered}</h1>
        <div className="prose lg:prose-lg mx-auto mt-6" dangerouslySetInnerHTML={{ __html: data?.content?.rendered }}></div>
    </div>
  )
}

export default Page