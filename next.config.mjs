/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/awaken',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
