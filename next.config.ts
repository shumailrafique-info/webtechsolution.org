import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  redirects() {
    return [
      {
        source: "/digital-marketing",
        destination: "/services/digital-marketing",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
