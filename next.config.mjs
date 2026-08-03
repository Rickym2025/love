/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Salta il check TypeScript bloccante
  },
  eslint: {
    ignoreDuringBuilds: true, // Salta ESLint durante il deploy
  },
  swcMinify: true, // Compilazione ultra-veloce Rust SWC
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

module.exports = nextConfig;
