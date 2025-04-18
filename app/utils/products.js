// Converted Axios-based API functions to native fetch() with revalidation support

const isServer = () => typeof window === "undefined";

const base_url = isServer()
  ? process.env.BASE_URL
  : process.env.NEXT_PUBLIC_BASE_URL;
const consumerKey = isServer()
  ? process.env.CONSUMER_KEY
  : process.env.NEXT_PUBLIC_CONSUMER_KEY;
const consumerSecret = isServer()
  ? process.env.CONSUMER_SECRET
  : process.env.NEXT_PUBLIC_CONSUMER_SECRET;

const handleFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      next: { revalidate: 60 } // default caching behavior
    });

    if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
    return await res.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    return null;
  }
};

export async function getHomeData() {
  return await handleFetch(`${base_url}/wp-json/custom/v1/homepage?category_slug=classic-kazakhstan,dimensions,one`);
}

export async function getCategoryData(slug) {
  return await handleFetch(`${base_url}/wp-json/schema/v1/fetch-all-by-slug/${slug}`);
}

export async function getProductData(slug) {
  return await handleFetch(`${base_url}/wp-json/custom/v1/product/${slug}`);
}

export async function getSingleBlogData(slug) {
  return await handleFetch(`${base_url}/wp-json/custom/v1/post/${slug}`);
}

export async function getProductsList() {
  return await handleFetch(`${base_url}/wp-json/custom/v1/products`);
}

export async function getAbout() {
  return await handleFetch(`${base_url}/wp-json/custom/v1/about`);
}

export async function getAgePolicy() {
  return await handleFetch(`${base_url}/wp-json/custom/v1/agepolicy`);
}

export async function getTermsUse() {
  return await handleFetch(`${base_url}/wp-json/custom/v1/terms-of-use`);
}

export async function getReviews() {
  const data = await handleFetch(`${base_url}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`);
  return data?.length || 0;
}

export async function getProductBySlug(slug) {
  return await handleFetch(`${base_url}/wp-json/custom-api/v1/product-details/${slug}`);
}

export async function getProductImages(slug) {
  return await handleFetch(`${base_url}/wp-json/custom-api/v1/product-all-images/${slug}`);
}

export async function getBlogs() {
  return await handleFetch(`${base_url}/wp-json/custom-api/v1/blogs`);
}

export async function getSEOData(slug) {
  return await handleFetch(`${base_url}/wp-json/rankmath/v1/getHead?url=${base_url}${slug}`);
}

export async function getSingleBlog(slug) {
  return [await handleFetch(`${base_url}/wp-json/custom-api/v1/post/${slug}`)];
}

export async function getCategoryBySlug(slug) {
  return await handleFetch(`${base_url}/wp-json/custom-api/v1/products-by-category/${slug}`);
}

export async function getCategoryMetadata(slug) {
  return [await handleFetch(`${base_url}/wp-json/custom-api/v1/category-all-details/${slug}`)];
}

export async function getSubcategoriesUrl(slug) {
  return await handleFetch(`${base_url}/wp-json/custom-api/v1/subcategories/${slug}`);
}

export async function getCategories() {
  return await handleFetch(`${base_url}/wp-json/wc/v3/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`);
}

export async function getProductsByCategory(id) {
  return await handleFetch(`${base_url}/wp-json/wc/v3/products?category=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
}

export async function getSingleProduct(id) {
  return await handleFetch(`${base_url}/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`);
}

export async function getReviewByProduct(id) {
  return await handleFetch(`${base_url}/wp-json/wc/v3/products/reviews?product=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`);
}

export async function getBreadCrumbsData(category) {
  return await handleFetch(`${base_url}/wp-json/custom-api/v1/product-category/${category}`);
}

export async function getPages(pageid) {
  return await handleFetch(`${base_url}/wp-json/wp/v2/pages/${pageid}`);
}

export async function getPagesFromCustom(pageid) {
  return await handleFetch(`${base_url}/wp-json/custom/v1/${pageid}`);
}

export async function getMenu() {
  return await handleFetch(`${base_url}/wp-json/custom/v1/menu/primary`);
}


// ========================================================================

// import axios from "axios";

// // Helper function to detect environment
// const isServer = () => typeof window === "undefined";

// const base_url = isServer()
//   ? process.env.BASE_URL
//   : process.env.NEXT_PUBLIC_BASE_URL;
// const consumerKey = isServer()
//   ? process.env.CONSUMER_KEY
//   : process.env.NEXT_PUBLIC_CONSUMER_KEY;
// const consumerSecret = isServer()
//   ? process.env.CONSUMER_SECRET
//   : process.env.NEXT_PUBLIC_CONSUMER_SECRET;

// // Add logging to track request origin
// const logRequestOrigin = (functionName) => {
//   console.log(
//     `${functionName} called from: ${isServer() ? "Server" : "Client"} Side`
//   );
// };

// // new api written start
// export async function getHomeData() {
//   try {
//     const url = `${base_url}/wp-json/custom/v1/homepage?category_slug=classic-kazakhstan,dimensions,one`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getHomeData");
//     return null;
//   }
// }

// export async function getCategoryData(slug) {
//   try {
//     const url = `${base_url}/wp-json/schema/v1/fetch-all-by-slug/${slug}`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getCategoryData");
//     return null;
//   }
// }

// export async function getProductData(slug) {
//   try {
//     const url = `${base_url}/wp-json/custom/v1/product/${slug}`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getProductData");
//     return null;
//   }
// }

// export async function getSingleBlogData(slug) {
//   try {
//     const url = `${base_url}/wp-json/custom/v1/post/${slug}`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getSingleBlogData");
//     return null;
//   }
// }

// export async function getProductsList() {
//   try {
//     const url = `${base_url}/wp-json/custom/v1/products`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getProductsList");
//     return null;
//   }
// }
// export async function getAbout() {
//   try {
//     const url = `${base_url}/wp-json/custom/v1/about`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getAbout");
//     return null;
//   }
// }
// export async function getAgePolicy() {
//   try {
//     const url = `${base_url}/wp-json/custom/v1/agepolicy`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getAgePolicy");
//     return null;
//   }
// }
// export async function getTermsUse() {
//   try {
//     const url = `${base_url}/wp-json/custom/v1/terms-of-use`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getTermsUse");
//     return null;
//   }
// }


// // new api written end





// // export async function getProducts() {
// //   try {
// //     const url = `${base_url}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`;
// //     // console.log(url, 'check url from getproducts')
// //     const req = await axios.get(url);
// //     console.log(req.data, "req from getProducts");
// //     return req.data;
// //   } catch (error) {
// //     console.log(error, "error from getProducts");
// //     return null;
// //   }
// // }

// // export async function getTotalSales() {
// //   try {
// //     const data = await getProducts()
// //     const totalSales = data
// //                         ?.filter(product => product.total_sales !== undefined) // Filter out products without total_sales
// //                         .reduce((acc, product) => acc + (product.total_sales || 0), 0);
// //     // console.log(totalSales, 'check url from getTotalSales')
// //     return totalSales;
// //   } catch (error) {
// //     console.log(error, "error from getTotalSales");
// //     return null;
// //   }
// // }

// export async function getReviews() {
//   try {
//     const url = `${base_url}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`;
//     // console.log(url, 'check url from getReviews')
//     const req = await axios.get(url);
//     return req.data.length;
//   } catch (error) {
//     console.log(error, "error from getReviews");
//     return null;
//   }
// }

// export async function getProductBySlug(slug) {
//   try {
//     const url = `${base_url}/wp-json/custom-api/v1/product-details/${slug}`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getProductBySlug");
//     return null;
//   }
// }

// export async function getProductImages(slug) {
//   try {
//     const url = `${base_url}/wp-json/custom-api/v1/product-all-images/${slug}`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getProductImages");
//     return null;
//   }
// }

export async function getSliderData() {
  try {
    const response = await fetch("/api/slider");
    const categories = await response.json();
    return [categories];
  } catch (error) {
    console.log(error, "error from getSliderData");
    return null;
  }
}

// export async function getBlogs() {
//   try {
//     const response = await fetch(`${base_url}/wp-json/custom-api/v1/blogs`);
//     // console.log(response, 'response')
//     const blogsData = await response.json();
//     return blogsData;
//   } catch (error) {
//     console.log(error, "error from getBlogs");
//     return null;
//   }
// }

// export async function getSEOData(slug) {
//   try {
//     let url = `${base_url}/wp-json/rankmath/v1/getHead?url=${slug}`;
//     // console.log(url, 'response from seo data')
//     const response = await fetch(`${base_url}/wp-json/rankmath/v1/getHead?url=${base_url}${slug}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch SEO data");
//     }
//     const seoData = await response.json();
//     return seoData; // Returns full SEO data
//   } catch (error) {
//     console.error("Error fetching SEO data:", error);
//     return null;
//   }
// }


// export async function getSingleBlog(slug) {
//   try {
//     const response = await fetch(`${base_url}/wp-json/custom-api/v1/post/${slug}`);
//     // console.log(`${base_url}/wp-json/wp/v2/posts?slug=${slug}`, 'response')
//     const blogsData = await response.json();
//     return [blogsData];
//   } catch (error) {
//     console.log(error, "error from getBlogs");
//     return null;
//   }
// }

// export async function getCategoryBySlug(slug) {
//   try {
//     const url = `${base_url}/wp-json/custom-api/v1/products-by-category/${slug}`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req.data, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getCategoryBySlug");
//     return null;
//   }
// }

// export async function getCategoryMetadata(slug) {
//   try {
//     const url = `${base_url}/wp-json/custom-api/v1/category-all-details/${slug}`;
//     // console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return [req.data];
//   } catch (error) {
//     console.log(error, "error from getCategoryMetadata");
//     return null;
//   }
// }

// export async function getSubcategoriesUrl(slug) {
//   try {
//     const url = `${base_url}/wp-json/custom-api/v1/subcategories/${slug}`;
//     console.log(url, 'check url from getproducts')
//     const req = await axios.get(url);
//     // console.log(req, "req from getProducts");
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getSubcategoriesUrl");
//     return null;
//   }
// }

// export async function getCategories() {
//   try {
//     const url = `${base_url}/wp-json/wc/v3/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`;
//     const req = await axios.get(url);
//     // console.log(url,'check req') 
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getCategories from utils");
//     return null;
//   }
// }
// export async function getProductsByCategory(id) {
//   try {
//     const url = `${base_url}/wp-json/wc/v3/products?category=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
//     const req = await axios.get(url);
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getProductsByCategory");
//     return null;
//   }
// }

// export async function getSingleProduct(id) {
//   try {
//     const url = `${base_url}/wp-json/wc/v3/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
//     // console.log(url, 'check url from getSingleProduct')
//     const req = await axios.get(url);
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getSingleProduct");
//     return null;
//   }
// }

// export async function getReviewByProduct(id) {
//   try {
//     const url = `${base_url}/wp-json/wc/v3/products/reviews?product=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`;
//     // console.log(url, 'check url from reviews')
//     const req = await axios.get(url);
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getReviewByProduct");
//     return null;
//   }
// }

// export async function createOrder(data) {
//   logRequestOrigin("createOrder");
//   try {
//     // Fix: Change & to ? in URL parameters
//     const url = `${base_url}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
    
//     const req = await axios.post(url, data, config);
//     console.log("Order Response:", req.data);
//     sendDetails(req.data.id);

//     return req.data;
//   } catch (error) {
//     console.error("Create Order Error:", {
//       status: error.response?.status,
//       message: error.response?.data?.message || error.message,
//       url: error.config?.url,
//     });
//     throw error; // Re-throw to handle in component
//   }
// }

// export async function sendDetails(id) {
  
//   try {
//     // Fix: Change & to ? in URL parameters
//     const sendOrderDetails = `${base_url}/wp-json/wc/v3/orders/${id}/actions/send_order_details?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
  
//     const req = await axios.post(sendOrderDetails, config);
//     console.log("Order details:", req.data);

//     return req.data;
//   } catch (error) {
//     console.error("Error while sending details:", {
//       status: error.response?.status,
//       message: error.response?.data?.message || error.message,
//       url: error.config?.url,
//     });
//     throw error; // Re-throw to handle in component
//   }
// }


export async function fetchCategories() {
  try {
    const response = await fetch("/api/proxy");
    const categories = await response.json();

    if (!categories || categories.length === 0) {
      console.warn("⚠️ No categories found.");
      return [];
    }

    // Step 1: Create a lookup object for categories
    const categoryMap = {};

    categories ? categories?.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    }) : [];

    // Step 2: Arrange categories into parent-child hierarchy
    const structuredCategories = [];

    categories?.forEach((category) => {
      if (category.parent === 0) {
        // Top-level category
        structuredCategories.push(categoryMap[category.id]);
      } else {
        // Child category - Add to its parent's children array
        if (categoryMap[category.parent]) {
          categoryMap[category.parent].children.push(categoryMap[category.id]);
        }
      }
    });

    // console.log("✅ Structured Categories:", structuredCategories);
    return structuredCategories;

  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
}


// export async function getBreadCrumbsData(category){
//   try {
//     const url = `${base_url}/wp-json/custom-api/v1/product-category/${category}`;
//     // console.log(url, 'check url from getBreadCrumbsData')
//     const req = await axios.get(url);
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getBreadCrumbsData");
//     throw error
//   }
// }


// export async function getPages(pageid){
//   try {
//     const url = `${base_url}/wp-json/wp/v2/pages/${pageid}`;
//     // console.log(url, 'check url from getBreadCrumbsData')
//     const req = await axios.get(url);
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getPages");
//     throw error
//   }
// }

// export async function getPagesFromCustom(pageid){
//   try {
//     const url = `${base_url}/wp-json/custom/v1/${pageid}`;
//     // console.log(url, 'check url from getBreadCrumbsData')
//     const req = await axios.get(url);
//     return req.data;
//   } catch (error) {
//     console.log(error, "error from getPagesFromCustom");
//     throw error
//   }
// }

