/* eslint-disable import/no-extraneous-dependencies */
const bundleAnalyzer = require("@next/bundle-analyzer");
const { i18n } = require("./next-i18next.config");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  i18n,
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
