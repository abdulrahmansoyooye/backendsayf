/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "utfs.io",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    domains: ["res.cloudinary.com"],

  },
   webpack: (config) => {
       config.resolve.alias.canvas = false;
    
      return config;
    },
};

export default nextConfig;
