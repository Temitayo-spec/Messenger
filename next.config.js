/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['links.papareact.com', 'platform-lookaside.fbsbx.com'],
  },
};

module.exports = nextConfig;
