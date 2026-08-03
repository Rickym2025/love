/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabilita il check ESLint ridondante durante ogni deploy su Vercel per velocizzare la build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Autorizza le immagini esterne per la galleria e i loghi
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
