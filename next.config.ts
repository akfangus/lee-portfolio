import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fqne1e1vih055r1l.public.blob.vercel-storage.com",
      },
    ],
    domains: ["fqne1e1vih055r1l.public.blob.vercel-storage.com"],
  },
}

export default nextConfig
