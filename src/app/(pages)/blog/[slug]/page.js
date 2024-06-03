import { calculateReadingTime } from "@/app/components/lib/Common";
import { getStoryblokApi } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

export const metadata = {
  openGraph: {
    siteName: "Swiftsupport",
    locale: "en-US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    site: "@_Swiftsupport",
    creator: "@_Swiftsupport",
  },
};

export default async function Page(props) {
  const { params } = props || {};

  const { props: data } = await fetchData(params);

  if (!data?.story) {
    return null;
  }

  const totalDataWord =
    data?.story?.content?.Content_1 +
    data?.story?.content?.Content_2 +
    data?.story?.content?.Content_3;

  return (
    <>
      <head>
        <title>
          {data?.story?.content?.metatags?.title || data?.story?.content?.title}
        </title>

        <meta
          name="description"
          content={data?.story?.content?.metatags?.description}
        />

        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}blog/${data?.story?.slug}/`}
        />

        <meta
          property="og:title"
          content={
            data?.story?.content?.metatags?.og_title ||
            data?.story?.content?.title
          }
        />

        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_BASE_URL}blogs/${data?.story?.slug}/`}
        />

        <meta
          name="og:description"
          content={
            data?.story?.content?.metatags?.og_description ||
            data?.story?.content?.metatags?.description
          }
        />

        <meta
          property="og:image"
          content={
            data?.story?.content?.metatags?.og_image ||
            data?.story?.content?.mobile_banner?.filename
          }
        />
        <meta name="author" content={data?.story?.content?.author} />
        <meta
          name="twitter:image"
          content={
            data?.story?.content?.metatags?.twitter_image ||
            data?.story?.content?.mobile_banner?.filename
          }
        />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content={data?.story?.content?.author} />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta
          name="twitter:data2"
          content={`${calculateReadingTime(totalDataWord)} minutes`}
        />
      </head>
      <StoryblokStory story={data?.story} />
    </>
  );
}

export async function fetchData(params) {
  let slug = params?.slug ? `blogs/${params?.slug}` : "home";
  const storyblokApi = getStoryblokApi();
  let sbParams = {
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
    resolve_links: "url",
  };

  const blogData = await storyblokApi?.get(`cdn/stories/${slug}`, sbParams);
  const { data } = blogData;

  return {
    props: {
      story: data ? data?.story : false,
      key: data ? data?.story?.id : false,
    },
    revalidate: 3600,
  };
}
