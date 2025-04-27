import pkg from '@next/bundle-analyzer';
const { withBundleAnalyzer } = pkg;

/** @type {import('next').NextConfig} */
const baseConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  experimental: {
    nextScriptWorkers: true,
  },
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
      },
      {
        protocol: 'https',
        hostname: 'heetsiqosuae.ae',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '121heets.shop',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pandavapor.ae',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'yourwebsite.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// ✅ Apply analyzer only if ANALYZE=true **AND** in production mode
const isAnalyze = process.env.ANALYZE === 'true' && process.env.NODE_ENV === 'production';

const finalConfig = isAnalyze
  ? withBundleAnalyzer({ enabled: true })(baseConfig)
  // ? pkg({ enabled: true })(baseConfig)
  : baseConfig;

export default finalConfig;
