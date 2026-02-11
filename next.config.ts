import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // port: '',
        pathname: '/ddedslqvv/image/upload/**',
      },
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        // port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
