/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'requitygroup.com',
      },
    ],
  },
};

export default nextConfig;
