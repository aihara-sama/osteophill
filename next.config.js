/* eslint-disable import/no-extraneous-dependencies */
const bundleAnalyzer = require("@next/bundle-analyzer");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  env: {
    BUCKET: process.env.BUCKET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.BUCKET.substring(8),
      },
    ],
  },
});
