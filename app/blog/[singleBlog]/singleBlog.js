"use client";

import moment from "moment";

const SingleBlog = ({serverData}) => {
console.log(serverData,'serverData')

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">{serverData[0]?.title?.rendered}</h1>
      <p className="text-gray-600 text-sm text-center">{moment(serverData[0].date).format('DD-MM-YYYY HH:mm:ss')}</p>
      <div className="prose lg:prose-lg mx-auto mt-6" dangerouslySetInnerHTML={{ __html: serverData[0].content?.rendered }}></div>
    </div>
  );
};

export default SingleBlog;
