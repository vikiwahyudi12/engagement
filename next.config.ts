import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  

  images: {
    unoptimized: true,
  },


  basePath: '/engagement',
  assetPrefix: '/engagement',
};

export default nextConfig;