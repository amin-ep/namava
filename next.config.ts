import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        port: "8000",
        pathname: "/static/**",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
