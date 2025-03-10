/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  env: {
    HOST: process.env.HOST,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: process.env.HOST,
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname:"heetsiqosuae.ae",
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname:"121heets.shop",
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname:"pandavapor.ae",
            port: '',
            pathname: '/**',
            search: '',
          },
        ],
      },
};

export default nextConfig;
