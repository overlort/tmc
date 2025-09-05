import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  images: {
    remotePatterns: [new URL('https://img-webcalypt.ru/img/thumb/lg/images/meme-templates/7662012bb4b0acd4e1d2240f3dc7250b.jpg.jpg')],
  },
};

export default nextConfig;
