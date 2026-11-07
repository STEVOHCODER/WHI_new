import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bundle a self-contained server for container platforms (Render / Railway).
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "www.account.ua",
      },
    ],
  },
};

export default nextConfig;
