/** @type {import('next').NextConfig} */

const nextConfig = {
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
