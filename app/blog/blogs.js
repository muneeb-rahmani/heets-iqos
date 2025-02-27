"use client"; // Since we are fetching dynamically on the client-side

import { useEffect, useState } from "react";
import Link from "next/link";

const BlogPage = ({serverData}) => {
//     console.log(serverData, 'serverData')
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const response = await fetch("https://121org.shop/wp-json/wp/v2/posts");
//         if (!response.ok) throw new Error("Failed to fetch blogs");
//         const data = await response.json();
//         setBlogs(data);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBlogs();
//   }, []);

//   if (loading) return <p className="text-center">Loading blogs...</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serverData.map((blog) => (
          <div key={blog.id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/blogs/${blog.slug}`} className="hover:text-red-600">
                  {blog.title.rendered}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {new Date(blog.date).toLocaleDateString()}
              </p>
              <p className="text-gray-800 mt-2" dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}></p>
              <Link href={`/blog/${blog.slug}`} className="text-red-500 font-semibold mt-4 inline-block">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
