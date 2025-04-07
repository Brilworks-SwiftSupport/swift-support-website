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
