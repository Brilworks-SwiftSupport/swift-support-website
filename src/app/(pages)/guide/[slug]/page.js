import { Suspense } from "react";
import { notFound } from "next/navigation";
import BeatLoader from "@/app/components/Loader";
import GuideContentSection from "@/app/components/Guide/GuideContentSection";
import GuideFirstSection from "@/app/components/Guide/GuideFirstSection";
async function fetchWithErrorHandling(url, options) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}
async function getAllSlugs() {
  const url = `https://api.storyblok.com/v2/cdn/stories?starts_with=swiftsupport/guide/&version=${process.env.NEXT_PUBLIC_STORYBLOK_VERSION}&token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;

  const options = {
    [process.env.VERCEL_ENV === "production" ? "next" : "cache"]:
      process.env.VERCEL_ENV === "production"
        ? { revalidate: 3600 }
        : "no-store",
  };

  const data = await fetchWithErrorHandling(url, options);

  return data.stories.map((story) => story.slug.replace("guide/", ""));
}

async function getGuideData(slug) {
  const url = `https://api.storyblok.com/v2/cdn/stories/swiftsupport/guide/${slug}?version=${process.env.NEXT_PUBLIC_STORYBLOK_VERSION}&token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
  const options = {
    [process.env.VERCEL_ENV === "production" ? "next" : "cache"]:
      process.env.VERCEL_ENV === "production"
        ? { revalidate: 3600 }
        : "no-store",
  };
  return fetchWithErrorHandling(url, options);
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const storyData = await getGuideData(params.slug);
    const { title, description } = storyData?.story?.content?.Metatags;
    return {
      title: title || storyData?.story?.name,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}guide/${params.slug}/`,
        siteName: "Swiftsupport",
        locale: "en-US",
        type: "website",
      },
      twitter: {
        title: title,
        description: description,
        card: "summary_large_image",
        site: "@_Swiftsupport",
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}guide/${params.slug}/`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

export default async function Page({ params }) {
  const storyData = await getGuideData(params.slug);
  const { title_section, FAQ_section, content } = storyData.story.content;

  return (
    <Suspense fallback={<BeatLoader />}>
      <GuideFirstSection data={title_section?.[0]} />
      <GuideContentSection content={content?.content} FAQData={FAQ_section} />
    </Suspense>
  );
}
