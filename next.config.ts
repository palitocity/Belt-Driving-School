import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "belt-driving-school-backend-3.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
