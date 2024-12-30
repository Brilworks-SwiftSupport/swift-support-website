import { sitemapData } from "./components/lib/Constant";
import { getblog } from "./lib/getblog";

// Function to slugify the title
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

async function getYoutubeSummary() {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  try {
    const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_summary`);
    const data = await response.json();
    const youtubeData = data.youtube_summary_list;
    return youtubeData.map((record) => {
      // Convert record.timestamp to a valid Date format (if necessary)
      const lastModified = new Date(record.timestamp); // If timestamp is already a valid date string, this works
      return {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}tools/youtube-summary/${record.id}/${slugify(record.video_title)}`, // Slugify the title
        lastModified: lastModified.toISOString(), // Use timestamp as lastModified
      };
    });
  } catch (error) {
    console.error("Error fetching data for sitemap:", error);
    return []; 
  }
}

export default async function sitemap() {
  const staticPagesData = sitemapData.map((data) => ({
    url: data.loc,
    lastModified: data.lastmod,
  }));

  const blogData = await getblog();

  const blog = blogData.map((data) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${data?.slug}/`,
    lastModified: data?.published_at || new Date(),
  }));
  const youtubeSummaryData = await getYoutubeSummary(); // Fetch YouTube summary data  

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://swiftsupport.ai";

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...staticPagesData,
    ...blog,
    ...youtubeSummaryData,
  ];
}
