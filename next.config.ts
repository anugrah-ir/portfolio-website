import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arkdkqkhbfpcf1pr.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
