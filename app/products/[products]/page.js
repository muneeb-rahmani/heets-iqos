import axios from "axios";
// import { getReviewByProduct, getSingleProduct } from "../utils/products";
import SingleProduct from "./singleProduct";
import { getProductBySlug, getReviewByProduct, getSingleProduct } from "@/app/utils/products";
import { unserialize } from "php-serialize";

export default async function Page({params, searchParams}) {
  const slugData = await getProductBySlug(params.products)
  console.log(slugData, 'check slug data from page')
  const {_harikrutfiwu_wcgallary} = slugData?.meta_data || {};
  const image = Array.isArray(_harikrutfiwu_wcgallary) && _harikrutfiwu_wcgallary.length > 0 
                ? unserialize(_harikrutfiwu_wcgallary[0]) 
                : null;
                console.log(image, 'check image array')
  // console.log(imagesData, 'check images data from page')
  const productId = await slugData?.id; 
  const data = await getSingleProduct(productId);
  const reviews = await getReviewByProduct(productId);
  console.log(reviews, 'check reviews from page')
  const relatedProducts = await axios?.all(data?.related_ids?.map(id => getSingleProduct(id)))
  // console.log(relatedProducts, 'check data from page')
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
      <SingleProduct serverData={slugData} imagesData={image} reviews={reviews} relatedProducts={relatedProducts} />
    </>
  );
}
