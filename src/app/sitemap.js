
import {  sitemapData } from "./components/lib/Constant";
import { getblogData } from "./lib/getblog";

export default async function sitemap() {
  const staticPagesData = sitemapData.map((data) => ({
    url: data.loc,
    lastModified: data.lastmod,
  }));

  const blogData = await getblogData(0, 100);

  const blog = blogData.storyData.map((data) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://swiftsupport.ai/'}${data.full_slug}`,
    lastModified: data.published_at,
  }));


  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://swiftsupport.ai';

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    ...staticPagesData,
    ...blog,
  ];
}