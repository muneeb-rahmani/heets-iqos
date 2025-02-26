import React from 'react'
import HomePage from './homepage'
import { getCategories, getProducts, getProductsByCategory } from '../utils/products';
import axios from 'axios';


const Page = async () => {
  // const productData = await getProducts();
  // console.log(productData, 'check muneeb')
  const categoryIds = await getCategories();
  
  const fetchCategoryAndProducts = async () => {
    const categoryId = categoryIds?.map(({id:itemId,name: itemName}) => ({id: itemId, name: itemName}));
    // console.log(categoryId, "check categoryId data");
    const data = await axios?.all(
    categoryId?.map(async (item) => {
      // console.log(item.id, "check id from categoryId map");
      const products = await getProductsByCategory(item.id);
      return {products, category: item.name};
    }))

    return data;
  }

  const data = await fetchCategoryAndProducts();
  const schema = {
    "microdata": null,
    "jsonld": [
      {
        "@context": "http://schema.org",
        "@type": "LocalBusiness",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "United Arab Emirates",
          "addressLocality": "27 Street 56B - Al Barsha - Al Barsha 3 - Dubai - United Arab Emirates",
          "addressRegion": "UAE",
          "streetAddress": "27 Street 56B - Al Barsha - Al Barsha 3 - Dubai - United Arab Emirates"
        },
        "areaServed": "UAE",
        "image": "https://heetsiqosuae.ae/assets/front/images/trusted-IQOS-Heets-Online-Seller-in-Dubai-UAE.webp",
        "logo": "https://heetsiqosuae.ae/assets/front/images/heets-iqos-uae-logo.png",
        "name": "Heets IQOS UAE",
        "openingHours": [
          "Monday – Sunday 3:00 – 23:00"
        ],
        "priceRange": "40 AED - 800 AED",
        "telephone": "+971526937203",
        "url": "https://heetsiqosuae.ae/"
      },
      {
        "@context": "http://schema.org",
        "@type": "Organization",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "United Arab Emirates",
          "addressLocality": "27 Street 56B - Al Barsha - Al Barsha 3 - Dubai - United Arab Emirates",
          "addressRegion": "UAE",
          "streetAddress": "27 Street 56B - Al Barsha - Al Barsha 3 - Dubai - United Arab Emirates"
        },
        "areaServed": "United Arab Emirates",
        "email": "order@heetsiqosuae.ae",
        "image": "https://heetsiqosuae.ae/assets/front/images/trusted-IQOS-Heets-Online-Seller-in-Dubai-UAE.webp",
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "United Arab Emirates",
            "addressLocality": "27 Street 56B - Al Barsha - Al Barsha 3 - Dubai - United Arab Emirates",
            "addressRegion": "UAE",
            "streetAddress": "27 Street 56B - Al Barsha - Al Barsha 3 - Dubai - United Arab Emirates"
          }
        },
        "logo": "https://heetsiqosuae.ae/assets/front/images/heets-iqos-uae-logo.png",
        "name": "Heets IQOS UAE",
        "telephone": "+971526937203",
        "url": "https://heetsiqosuae.ae/"
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "url": "https://heetsiqosuae.ae/",
        "name": "IQOS Heets Dubai | #1 Trusted Heets IQOS UAE Online Store",
        "dateModified": "2025-02-20T08:35:13+0000",
        "description": "Buy IQOS Heets online in Dubai from the #1 trusted store in UAE. Enjoy 20% discount, instant 1 hour delivery, and a wide range of premium heets and terea flavors. Shop now!",
        "inLanguage": "en",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [
              "https://heetsiqosuae.ae/"
            ]
          }
        ]
      }
    ],
    "graph": null
  }

  return (
    <>
      <HomePage productData={data} productCategories={categoryIds} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
    
  )
}

export default Page