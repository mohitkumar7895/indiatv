import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["mysql2"],
  compress: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async rewrites() {
    return {
      afterFiles: [
        { source: "/uploads/:path*", destination: "/api/media/file/:path*" },
      ],
    };
  },
};

export default nextConfig;
