import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // basePath: "/novesta-bot", // Set the base path for your application
  basePath: "/novesta-bot", // Set the base path for your application
};

export default nextConfig;
