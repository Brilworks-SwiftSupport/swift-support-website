/** @type {import('next').NextConfig} */

const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "youtube.com",
      },
      {
        protocol: "https",
        hostname: "d11qzsb0ksp6iz.cloudfront.net",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: `/home`,
        destination: `/`,
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
