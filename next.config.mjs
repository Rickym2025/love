/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Salta il check TypeScript bloccante durante il build
  },
  eslint: {
    ignoreDuringBuilds: true, // Salta ESLint durante la build
  },
  swcMinify: true,
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

// Sintassi ESM corretta per file .mjs
export default nextConfig;
