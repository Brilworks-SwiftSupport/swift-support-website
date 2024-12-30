const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from the start
        .replace(/-+$/, ""); // Trim - from the end
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://www.swiftsupport.ai",
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
            {
                userAgent: '*',
                disallow: '/?s=',
            },
            {
                userAgent: '*',
                disallow: '/search/',
            },
            {
                userAgent: '*',
                disallow: '/next/static',
            },
        ],
        additionalSitemaps: [
            `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.swiftsupport.ai/"}sitemap.xml`, // Add sitemap with dynamic URL
        ],
    },
    sitemapSize: 5000, // Split large sitemaps
    generateIndexSitemap: false, // If you don't want an index sitemap
    exclude: [], // Paths to exclude from the sitemap

    async additionalPaths(config) {
        // Dynamically generate paths for dynamic routes
        const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

        try {
            const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_summary`);
            const data = await response.json();
            const youtubeData = data.youtube_summary_list;

            return youtubeData.map((record) => ({
                loc: `/tools/youtube-summary/${record.id}/${slugify(record.video_title)}`, // Slugify the title
                lastmod: new Date().toISOString(), // Optional: Add last modified date
            }));
        } catch (error) {
            console.error("Error fetching data for sitemap:", error);
            return [];
        }
    },
};
