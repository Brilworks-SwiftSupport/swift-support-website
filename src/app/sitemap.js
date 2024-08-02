
import {  sitemapData ,blogData} from "./components/lib/Constant";
// import { getblogData } from "./lib/getblog";

export default async function sitemap() {
  const staticPagesData = sitemapData.map((data) => ({
    url: data.loc,
    lastModified: data.lastmod,
  }));

  // const blogData = await getblogData(0, 100);

  const blog = blogData.map((data) => ({
    url: `${data?.loc}`,
    lastModified: data?.lastmod || new Date(),
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