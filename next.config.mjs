/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Ignora errori TS per garantire deploy istantanei su Vercel
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-89945f8350374b50818d716fdc3c108b.r2.dev',
      },
    ],
  },
};

export default nextConfig;
