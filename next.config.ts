import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "camo.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "sbce.ac.in",
      },
      {
         protocol: "https",
         hostname: "github.com",
      },
      {
         protocol: "https",
         hostname: "avatars.githubusercontent.com",
      },
    ],
  },

};

export default nextConfig;
