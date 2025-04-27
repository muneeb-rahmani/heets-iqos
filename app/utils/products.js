// Converted Axios-based API functions to native fetch() with revalidation support

import axios from "axios";

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

export async function createOrder(data) {
  try {
    // Fix: Change & to ? in URL parameters
    const url = `${base_url}/wp-json/wc/v3/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    const req = await axios.post(url, data, config);
    console.log("Order Response:", req.data);
    sendDetails(req.data.id);

    return req.data;
  } catch (error) {
    console.error("Create Order Error:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });
    throw error; // Re-throw to handle in component
  }
}

export async function sendDetails(id) {
  
  try {
    // Fix: Change & to ? in URL parameters
    const sendOrderDetails = `${base_url}/wp-json/wc/v3/orders/${id}/actions/send_order_details?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const req = await axios.post(sendOrderDetails, config);
    console.log("Order details:", req.data);

    return req.data;
  } catch (error) {
    console.error("Error while sending details:", {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });
    throw error; // Re-throw to handle in component
  }
}


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
