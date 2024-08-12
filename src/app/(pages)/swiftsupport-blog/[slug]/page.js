import { calculateReadingTime } from "@/app/components/lib/Common";
import StoryblokStory from "@storyblok/react/story";
import { notFound } from "next/navigation";
export const dynamic = 'force-static'
// Fetch data with error handling and caching
async function fetchData(slug) {
  const url = new URL(`https://api.storyblok.com/v2/cdn/stories/swiftsupport-blog/${slug}`);
  url.searchParams.append('token', process.env.NEXT_PUBLIC_ACCESS_TOKEN || '');
  url.searchParams.append('version',process.env.NEXT_PUBLIC_STORYBLOK_VERSION );

  try {
    const res = await fetch(url.toString(), { 
      next: { revalidate: 0 },
      headers: { 'Accept-Encoding': 'gzip' } // Enable compression
    });

    if (!res.ok) throw new Error('Failed to fetch story data');
    return await res.json().then(data => data.story);
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
}


// Main page component with lazy loading
export default async function Page({ params }) {
  const story = await fetchData(params.slug);
  if (!story) return notFound();

  return <StoryblokStory story={story} />;
}

// Generate static params with improved error handling and pagination
export async function generateStaticParams() {
  const stories = await getBlogData();
  return stories.map((story) => ({
    slug: story.slug.replace('blog/', ''),
  }));
}

async function getBlogData() {
  const url = new URL('https://api.storyblok.com/v2/cdn/stories');
  url.searchParams.append('cv', '1721647132');
  url.searchParams.append('filter_query[component][in]', 'swiftsupport_article');
  url.searchParams.append('page', '1');
  url.searchParams.append('per_page', '100');
  url.searchParams.append('starts_with', 'swiftsupport-blog/');
  url.searchParams.append('token', process.env.NEXT_PUBLIC_ACCESS_TOKEN || '');
  url.searchParams.append('version', process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'published');

  try {
    const res = await fetch(url.toString(), { 
      next: { revalidate: 0 },
      headers: { 'Accept-Encoding': 'gzip' } // Enable compression
    });

    if (!res.ok) throw new Error('Failed to fetch blog data');
    const data = await res.json();
    return data.stories || [];
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

export const revalidate = 0;