import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
});

export async function getblogData(
  page_no,
  limit_per_page,
  filter_category,
  search_query
) {
  // Define the base parameters for the API call
  let apiParams = {
    starts_with: "blog/",
    // with_tag: "Swiftsupport",
    page: page_no || 1,
    per_page: limit_per_page || 9,
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
    filter_query: {
      component: {
        in: "swiftsupport_article",
      },
    },
  };

  if (filter_category) {
    apiParams.filter_query.Category = {
      in: filter_category,
    };
  }

  if (search_query) {
    // If search_query is present, add search_term to apiParams
    apiParams.search_term = search_query;
  }

  // Make the API call with the constructed parameters
  let stories = await Storyblok.get("cdn/stories", apiParams, {
    next: { revalidate: 0 },
  });

  return {
    storyData: stories.data.stories,
    totalData: stories.total,
  };
}
