import React from 'react'
import { getProductsList } from '../utils/products';
import ProductList from './productList';


const Page = async () => {
 const homeData = await getProductsList()
   // console.log(homeData, "homeData");
   return (
     <>
       <ProductList  data={homeData} />
       <script
         type="application/ld+json"
         dangerouslySetInnerHTML={{
           __html: JSON.stringify(homeData?.schema_data),
         }}
       />
     </>
   );
}

export default Page