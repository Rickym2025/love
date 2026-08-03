/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabilita la validazione TypeScript e ESLint durante la build per deploy istantanei (~20sec)
  typescript: {
    ignoreBuildErrors: true,
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
