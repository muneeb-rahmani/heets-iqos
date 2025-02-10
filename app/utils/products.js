import axios from "axios";

// Helper function to detect environment
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

// Add logging to track request origin
const logRequestOrigin = (functionName) => {
  console.log(
    `${functionName} called from: ${isServer() ? "Server" : "Client"} Side`
  );
};

export async function getProducts() {
  try {
    const url = `${base_url}/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    // console.log(url, 'check url from getproducts')
    const req = await axios.get(url);
    // console.log(req, "req from getProducts");
    return req.data;
  } catch (error) {
    console.log(error, "error from getProducts");
    return null;
  }
}

export async function getCategories() {
  try {
    const url = `${base_url}/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`;
    const req = await axios.get(url);
    // console.log(req,'check req')
    return req.data;
  } catch (error) {
    console.log(error, "error from getCategories from utils");
    return null;
  }
}
export async function getProductsByCategory(id) {
  try {
    const url = `${base_url}/products?category=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    console.log(error, "error from getProductsByCategory");
    return null;
  }
}

export async function getSingleProduct(id) {
  try {
    const url = `${base_url}/products/${id}?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    // console.log(url, 'check url from getSingleProduct')
    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    console.log(error, "error from getSingleProduct");
    return null;
  }
}

export async function getReviewByProduct(id) {
  try {
    const url = `${base_url}/products/reviews?product=${id}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    // console.log(url, 'check url from reviews')
    const req = await axios.get(url);
    return req.data;
  } catch (error) {
    console.log(error, "error from getReviewByProduct");
    return null;
  }
}

export async function createOrder(data) {
  logRequestOrigin("createOrder");
  try {
    // Fix: Change & to ? in URL parameters
    const url = `${base_url}/orders?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    
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
    const sendOrderDetails = `${base_url}/orders/${id}/actions/send_order_details?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
    
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
    const response = await fetch("http://localhost:3000/api/proxy");
    const categories = await response.json();

    if (!categories || categories.length === 0) {
      console.warn("⚠️ No categories found.");
      return [];
    }

    // Step 1: Create a lookup object for categories
    const categoryMap = {};

    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    // Step 2: Arrange categories into parent-child hierarchy
    const structuredCategories = [];

    categories.forEach((category) => {
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
