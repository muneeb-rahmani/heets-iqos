import { getMenu } from "@/app/utils/products";

// /app/api/sitemap.xml/route.js
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_LIVE_URL || "https://example.com"; // Change to your domain
  const menu = await getMenu();

  // Static routes
  const staticRoutes = [
    "", // Home
    "about-us",
    "abu-dhabi",
    "age-policy",
    "ajman",
    "al-ain",
    "checkout",
    "fujairah",
    "heets-iqos-dubai-terms-of-use",
    "home",
    "privacy-policy",
    "products",
    "ras-al-khaimah",
    "sharjah",
    "umm-al-quwain",
    "view-cart",
    "blog"
  ];

  // Flatten all nested menu items
  function flattenMenu(items) {
    let urls = [];

    items.forEach((item) => {
      if (item.actual_url) urls.push(item.actual_url);
      if (item.sub_menu && item.sub_menu.length > 0) {
        urls = urls.concat(flattenMenu(item.sub_menu));
      }
    });

    return urls;
  }

  const dynamicRoutes = flattenMenu(menu);

  // ✅ Deduplicate using Set
  const uniqueUrls = new Set();

  const buildUrlXml = (url, priority = "0.7") => {
    const fullUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;
    if (!uniqueUrls.has(fullUrl)) {
      uniqueUrls.add(fullUrl);
      return `
        <url>
          <loc>${fullUrl}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${priority}</priority>
        </url>`;
    }
    return "";
  };

  // Build sitemap XML
  const staticUrlsXml = staticRoutes.map((route) => buildUrlXml(`/${route}`, "0.8")).join("");
  const dynamicUrlsXml = dynamicRoutes.map((route) => buildUrlXml(route, "0.7")).join("");

  console.log("Static URLs:", staticRoutes.length);
  console.log("Dynamic URLs:", dynamicRoutes.length);
  console.log("Total Sitemap Pages:", uniqueUrls.size); // Count after deduplication
  

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrlsXml}
  ${dynamicUrlsXml}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
}


// import { getMenu } from "@/app/utils/products";

// // /app/sitemap.xml/route.js
// export async function GET() {
//   const baseUrl = process.env.NEXT_PUBLIC_LIVE_URL; // Change to your domain
//   const menu = await getMenu()
  
//   // Static routes (home, about, contact etc.)
//   const staticRoutes = [
//     "", // Home page
//     "about-us",
//     "abu-dhabi",
//     "age-policy",
//     "ajman",
//     "al-ain",
//     "checkout",
//     "fujairah",
//     "heets-iqos-dubai-terms-of-use",
//     "home", // (if /home is separate)
//     "privacy-policy",
//     "products",
//     "ras-al-khaimah",
//     "sharjah",
//     "umm-al-quwain",
//     "view-cart",
//     "blog",
//   ];

//   function flattenMenu(items) {
//     let urls = [];

//     items.forEach((item) => {
//       if (item.actual_url) {
//         urls.push(item.actual_url);
//       }
//       if (item.sub_menu && item.sub_menu.length > 0) {
//         urls = urls.concat(flattenMenu(item.sub_menu));
//       }
//     });

//     return urls;
//   }

//   const dynamicRoutes = flattenMenu(menu); 

//   // Now create XML entries
//   const staticUrlsXml = staticRoutes.map((route) => `
//     <url>
//       <loc>${baseUrl}/${route}</loc>
//       <lastmod>${new Date().toISOString()}</lastmod>
//       <changefreq>weekly</changefreq>
//       <priority>0.8</priority>
//     </url>
//   `).join("");

//   const dynamicUrlsXml = dynamicRoutes.map((route) => `
//     <url>
//       <loc>${baseUrl}${route}</loc>
//       <lastmod>${new Date().toISOString()}</lastmod>
//       <changefreq>weekly</changefreq>
//       <priority>0.7</priority>
//     </url>
//   `).join("");

//   // Final XML
//   const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${staticUrlsXml}
//       ${dynamicUrlsXml}
//     </urlset>`;

//   return new Response(sitemap, {
//     status: 200,
//     headers: {
//       "Content-Type": "application/xml",
//     },
//   });
// }
