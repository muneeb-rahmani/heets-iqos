"use client";

import moment from "moment";
import Image from "next/image";

const SingleBlog = ({serverData}) => {
console.log(serverData,'single blog ka data')

  return (
    <div className="container mx-auto px-4 py-6">
      <Image className="mx-auto mb-6" src={serverData?.featured_image?.trimEnd()} overrideSrc={serverData?.featured_image?.trimEnd()} alt={serverData?.title} width={600} height={400} />
      <h1 className="text-3xl font-bold text-center mb-6">{serverData?.title}</h1>
      <p className="text-gray-600 text-sm text-center">{serverData.date}</p>
      <div className="prose lg:prose-lg mx-auto mt-6" dangerouslySetInnerHTML={{ __html: serverData?.content }}></div>
      {serverData?.schema_data && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serverData?.schema_data) || {},
          }}
        />
      )}
    </div>
  );
};

export default SingleBlog;
