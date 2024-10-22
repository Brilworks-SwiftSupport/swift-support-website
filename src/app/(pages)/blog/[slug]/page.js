import {
  blogAuthor,
  calculateReadingTime,
  formattedDate,
} from "@/app/components/lib/Common";
import Svgs from "@/app/components/lib/Svgs";
import StoryblokStory from "@storyblok/react/story";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
export const dynamic = "force-static";
// Fetch data with error handling and caching
async function fetchData(slug) {
  const url = new URL(
    `https://api.storyblok.com/v2/cdn/stories/swiftsupport-blog/${slug}`
  );
  url.searchParams.append("token", process.env.NEXT_PUBLIC_ACCESS_TOKEN || "");
  url.searchParams.append("version", process.env.NEXT_PUBLIC_STORYBLOK_VERSION);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
      headers: { "Accept-Encoding": "gzip" }, // Enable compression
    });

    if (!res.ok) throw new Error("Failed to fetch story data");
    return await res.json().then((data) => data.story);
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
}

// Generate metadata with improved error handling
export async function generateMetadata({ params }) {
  const story = await fetchData(params.slug);
  if (!story) return notFound();

  const { content } = story;
  const totalDataWord = [
    content?.Content_1,
    content?.Content_2,
    content?.Content_3,
  ]
    .filter(Boolean)
    .join(" ");
  const ogImage =
    content?.metatags?.og_image || content?.mobile_banner?.filename;

  return {
    title: content?.metatags?.title || content?.title,
    description: content?.metatags?.description,
    openGraph: {
      title: content?.metatags?.og_title || content?.title,
      description:
        content?.metatags?.og_description || content?.metatags?.description,
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
      images: [
        content?.metatags?.twitter_image || content?.mobile_banner?.filename,
      ],
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

  const blogTableOfContent =
    story?.content?.Content_1 +
      story?.content?.Content_2 +
      story?.content?.Content_3 +
      `${story?.content?.FAQ?.length && "<h2>FAQ</h2>"}` || "";

  const readingTime = calculateReadingTime(blogTableOfContent);

  const author = blogAuthor(story?.content?.BlogAuthor);

  return (
    <>
      <div className="md:pt-[8rem] pt-[6rem] blog-main">
        <div className="container max-w-[1280px] mx-auto my-0 !px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="sxl:basis-3/4 sxl:flex-shrink-0 sxl:flex-grow-0 sxl:max-w-[75%] sxl:ml-[20%] sxl:mb-6 mb-4 !px-4 min-h-[1px] w-full">
              <div className="slg:w-[calc(100%_-_170px)]">
                <h1 className="md:!text-[3rem] !text-[2rem] !font-bold !mb-5 md:leading-[57px] leading-[44px] -tracking-[.52px]">
                  {story?.content?.title}
                </h1>
              </div>
              <div className="slg:w-[calc(100%_-_170px)] flex xl:items-end items-start xl:flex-row flex-col justify-between md:gap-1 gap-2">
                {author && (
                  <div className="flex items-center justify-between">
                    <Image
                      src={author?.authorImage}
                      width="54"
                      height="56"
                      alt={author?.name}
                      className="!rounded-full md:!w-14 md:!h-14 !w-10 !h-10"
                    />
                    <div className="pl-[10px]">
                      <Link
                        className="md:text-[20px] text-base font-bold text-colorDarkBlue"
                        href={author?.authorLinkedIn}
                        title={`Posts by ${author?.name}`}
                        rel="author external"
                      >
                        {author?.name}
                      </Link>
                      <br />
                      <span className=" text-colorGray">
                        {formattedDate(story?.content?.Published)}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex sxl:items-center items-start sxl:flex-row flex-col !text-[16px] pb-1 md:mt-4 md:gap-0 gap-2">
                  <div className="flex items-center md:mr-5 text-colorGray">
                    <Svgs name="clock-icon" />
                    &nbsp;
                    {readingTime} mins read
                  </div>
                  <div className="flex items-center text-colorGray">
                    <Svgs name="calendar-icon" />
                    &nbsp; Last updated {formattedDate(story?.published_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4">
            <div className="sxl:basis-3/4 sxl:flex-shrink-0 sxl:flex-grow-0 sxl:max-w-[75%] sxl:ml-[20%] !px-4 min-h-[1px] w-full">
              <div className="h-auto relative md:mb-6 mb-4 slg:!w-[calc(100%_-_170px)] overflow-hidden bg-cover bg-center">
                <Image
                  className="rounded-lg block md:hidden max-h-[288px] h-auto object-cover"
                  src={
                    story?.content?.mobile_banner?.filename ||
                    story?.content?.image?.filename
                  }
                  alt={story?.content?.image?.alt}
                  width="343"
                  height="177"
                  priority={true}
                  sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                />
                <Image
                  className="rounded-lg hidden md:block max-h-[288px] h-auto object-cover"
                  src={
                    story?.content?.image?.filename ||
                    story?.content?.mobile_banner?.filename
                  }
                  alt={story?.content?.image?.alt}
                  width="758"
                  height="169"
                  priority={true}
                  sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                />
              </div>
              {story?.content?.Quick_Summary && (
                <div>
                  <div className="slg:w-[calc(100%_-_170px)] w-full text-left text-xl md:mb-6 mb-4 text-colorBlack">
                    <span className="font-bold text-colorDarkBlue">
                      Quick Summary:-{" "}
                    </span>
                    {story?.content?.Quick_Summary}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[200vh] blog-main">
        <StoryblokStory story={story} />
      </div>
    </>
  );
}

// Generate static params with improved error handling and pagination
export async function generateStaticParams() {
  const stories = await getBlogData();
  return stories.map((story) => ({
    slug: story.slug.replace("blog/", ""),
  }));
}

async function getBlogData() {
  const url = new URL("https://api.storyblok.com/v2/cdn/stories");
  url.searchParams.append("cv", "1721647132");
  url.searchParams.append(
    "filter_query[component][in]",
    "swiftsupport_article"
  );
  url.searchParams.append("page", "1");
  url.searchParams.append("per_page", "100");
  url.searchParams.append("starts_with", "swiftsupport-blog/");
  url.searchParams.append("token", process.env.NEXT_PUBLIC_ACCESS_TOKEN || "");
  url.searchParams.append(
    "version",
    process.env.NEXT_PUBLIC_STORYBLOK_VERSION || "published"
  );

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
      headers: { "Accept-Encoding": "gzip" }, // Enable compression
    });

    if (!res.ok) throw new Error("Failed to fetch blog data");
    const data = await res.json();
    return data.stories || [];
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export const revalidate = 3600;
