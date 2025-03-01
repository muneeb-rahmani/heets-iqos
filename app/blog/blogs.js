"use client"; // Since we are fetching dynamically on the client-side

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSlug } from "../utils/common";

const BlogPage = ({serverData}) => {

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Latest Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serverData.map((blog, index) => {
          const formattedUrl = getSlug(blog.url)
          return (
          <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <Link href={formattedUrl} className="blogTitle">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={400}
                  height={200}
                />
              </Link>
              <h2 className="text-xl font-semibold">
                <Link href={formattedUrl} className="blogTitle">
                  {blog.title}
                </Link>
              </h2>
              {/* <p className="text-gray-600 text-sm mt-2">
                {new Date(blog.date).toLocaleDateString()}
              </p> */}
              {/* <p className="text-gray-800 mt-2" dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}></p> */}
              <Link href={`/blog/${formattedUrl}`} className="text-red-500 font-semibold mt-4 inline-block">
                Read More →
              </Link>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default BlogPage;
