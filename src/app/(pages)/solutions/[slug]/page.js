import { Suspense } from "react";
import { notFound } from "next/navigation";
import BeatLoader from "@/app/components/Loader";
import SolutionHeroSection from "@/app/components/Solutions/SolutionHeroSection";
import SolutionSection2 from "@/app/components/Solutions/SolutionSection2";
import SolutionKeyAdvantages from "@/app/components/Solutions/SolutionKeyAdvantages";
import SolutionHowAIAgent from "@/app/components/Solutions/SolutionHowAIAgent";
import SolutionWhyChooseUs from "@/app/components/Solutions/SolutionWhyChooseUs";
import SolutionCTA from "@/app/components/Solutions/SolutionCTA";
import WhatPeopleSay from "@/app/components/Home/WhatPeopleSay";
import HowToAddAIAgent from "@/app/components/Solutions/HowToAddAIAgent";
import BeforeAndAfterSection from "@/app/components/Home/BeforeAndAfterSection";
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
  const url = `https://api.storyblok.com/v2/cdn/stories?starts_with=solutions/&version=${process.env.NEXT_PUBLIC_STORYBLOK_VERSION}&token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;

  const options = {
    [process.env.VERCEL_ENV === "production" ? "next" : "cache"]:
      process.env.VERCEL_ENV === "production"
        ? { revalidate: 3600 }
        : "no-store",
  };

  const data = await fetchWithErrorHandling(url, options);

  return data.stories.map((story) => story.slug.replace("solutions/", ""));
}

async function getSolutionsData(slug) {
  const url = `https://api.storyblok.com/v2/cdn/stories/solutions/${slug}?version=${process.env.NEXT_PUBLIC_STORYBLOK_VERSION}&token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`;
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
    const storyData = await getSolutionsData(params.slug);
    const { title, description } = storyData?.story?.content?.SEO;
    return {
      title: title || storyData?.story?.name,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}solutions/${params.slug}/`,
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
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}solutions/${params.slug}/`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

export default async function Page({ params }) {
  const storyData = await getSolutionsData(params.slug);
  const {
    title,
    description,
    image,
    buttontext,
    section2,
    keyAdvantage,
    beforVsAfter,
    HowAIAgent,
    whyChooseUs,
    CTA1,
    guideSuggestion,
    testimonial_title,
    CTA2,
  } = storyData.story.content;

  return (
    <Suspense fallback={<BeatLoader />}>
      <SolutionHeroSection
        title={title}
        description={description}
        buttontext={buttontext}
        image={image}
      />
      <SolutionSection2 data={section2?.[0]} />
      <SolutionKeyAdvantages
        title={keyAdvantage?.[0]?.title}
        rightSideImage={keyAdvantage?.[1]?.image}
        leftSideData={keyAdvantage}
      />
      {beforVsAfter?.[0]?.title &&
        beforVsAfter?.[0]?.subTitleBefore &&
        beforVsAfter?.[0]?.subTitleAfter && (
          <BeforeAndAfterSection
            title={beforVsAfter?.[0]?.title}
            subTitleBefore={beforVsAfter?.[0]?.subTitleBefore}
            listItemBefore={beforVsAfter?.[0]?.listItemBefore}
            subTitleAfter={beforVsAfter?.[0]?.subTitleAfter}
            listItemAfter={beforVsAfter?.[0]?.listItemAfter}
          />
        )}
      {HowAIAgent?.[0]?.title && HowAIAgent?.length && (
        <SolutionHowAIAgent
          title={HowAIAgent?.[0]?.title}
          aiAgentTransformation={HowAIAgent}
        />
      )}
      <SolutionWhyChooseUs
        title={whyChooseUs?.[0]?.title}
        description={whyChooseUs?.[1]?.Display_text}
        keyValueData={whyChooseUs}
      />
      <SolutionCTA
        title={CTA1?.[0]?.title}
        desc={CTA1?.[0]?.description}
        buttonText={CTA1?.[0]?.button_text}
      />
      <HowToAddAIAgent howToAddAIAgentData={guideSuggestion} />
      <WhatPeopleSay title={testimonial_title} />
      <SolutionCTA
        title={CTA2?.[0]?.title}
        desc={CTA2?.[0]?.description}
        buttonText={CTA2?.[0]?.button_text}
      />
    </Suspense>
  );
}
