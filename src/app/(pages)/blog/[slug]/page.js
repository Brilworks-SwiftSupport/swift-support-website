import { calculateReadingTime } from "@/app/components/lib/Common";
import StoryblokStory from "@storyblok/react/story";
import { notFound } from "next/navigation";

// Fetch data with error handling and caching
async function fetchData(slug) {
  const url = new URL(`https://api.storyblok.com/v2/cdn/stories/blog/${slug}`);
  url.searchParams.append('token', process.env.NEXT_PUBLIC_ACCESS_TOKEN || '');
  url.searchParams.append('version', process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'published');

  try {
    const res = await fetch(url.toString(), { 
      next: { revalidate: 3600 },
      headers: { 'Accept-Encoding': 'gzip' } // Enable compression
    });

    if (!res.ok) throw new Error('Failed to fetch story data');
    return await res.json().then(data => data.story);
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
}

// Generate metadata with improved error handling
export async function generateMetadata({ params }){
  const story = await fetchData(params.slug);
  if (!story) return notFound();

  const { content } = story;
  const totalDataWord = [content?.Content_1, content?.Content_2, content?.Content_3].filter(Boolean).join(' ');
  const ogImage = content?.metatags?.og_image || content?.mobile_banner?.filename;

  return {
    title: content?.metatags?.title || content?.title,
    description: content?.metatags?.description,
    openGraph: {
      title: content?.metatags?.og_title || content?.title,
      description: content?.metatags?.og_description || content?.metatags?.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${story.slug}/`,
      siteName: "Swiftsupport",
      locale: "en-US",
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: content?.title }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@_Swiftsupport",
      creator: "@_Swiftsupport",
      images: [content?.metatags?.twitter_image || content?.mobile_banner?.filename],
    },
    authors: [{ name: content?.author }],
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}blog/${story.slug}/`,
    },
    other: {
      "twitter:label1": "Written by",
      "twitter:data1": content?.author,
      "twitter:label2": "Est. reading time",
      "twitter:data2": `${calculateReadingTime(totalDataWord)} minutes`,
    },
  };
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
  url.searchParams.append('starts_with', 'blog/');
  url.searchParams.append('token', process.env.NEXT_PUBLIC_ACCESS_TOKEN || '');
  url.searchParams.append('version', process.env.NEXT_PUBLIC_STORYBLOK_VERSION || 'published');

  try {
    const res = await fetch(url.toString(), { 
      next: { revalidate: 3600 },
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

export const revalidate = 3600;