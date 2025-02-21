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
    const url = `${base_url}/wp-json/wc/v3/products/categories?consumer_key=${consumerKey}&consumer_secret=${consumerSecret}&per_page=100`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
    //   console.log(data, "data from api request");
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
  }
  