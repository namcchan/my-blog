/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { serverComponentsExternalPackages: ['yjs'] },
  images: {
    domains: [
      'pub-cdf148cb143c4a1cb43fc5c2dfd7bb9c.r2.dev',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
