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


  export async function GET() {
    let products = [];
    let page = 1;
    let totalPages = 1;
  
    try {
      while (page <= totalPages) {
        const url = `${base_url}/wp-json/wc/v3/products?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100&page=${page}`;
  
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        products = products.concat(data); // Append fetched products
  
        totalPages = parseInt(response.headers.get("X-WP-TotalPages"), 10);
        page++;
      }
  
      return Response.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return Response.json({ error: "Failed to fetch products" }, { status: 500 });
    }
  }