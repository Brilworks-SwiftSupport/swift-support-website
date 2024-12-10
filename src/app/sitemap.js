import { sitemapData } from "./components/lib/Constant";
import { getblog } from "./lib/getblog";

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://swiftsupport.ai";

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...staticPagesData,
    ...blog,
  ];
}
