/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
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
