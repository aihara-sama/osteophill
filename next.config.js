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
    AWS_BUCKET: process.env.AWS_BUCKET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.AWS_BUCKET.substring(8),
      },
    ],
  },
});
