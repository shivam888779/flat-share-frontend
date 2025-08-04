/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.flatmate.in', 'localhost', '35.232.250.35', 'flat-share-backend-service-production.up.railway.app'],
  },
};

export default nextConfig;
