import StoryblokClient from "storyblok-js-client";

const Storyblok = new StoryblokClient({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
});

export async function getblog() {
  let stories = await Storyblok.get(
    "cdn/stories",
    {
      starts_with: "blogs/",
      per_page: 100,
      version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
      // sort_by: "first_published_at:",
    },
    {
      next: { revalidate: 7200 },
    }
  );
  const storyData = stories.data.stories;
  return storyData;
}

export async function getblogData(
  page_no,
  limit_per_page,
  filter_category,
  search_query
) {
  // Define the base parameters for the API call
  let apiParams = {
    starts_with: "blogs/",
    page: page_no || 1,
    per_page: limit_per_page || 9,
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
  };

  if (filter_category) {
    // Check if filter_category is present in props
    apiParams.filter_query = {
      Category: {
        in: filter_category,
      },
    };
  }
  if (search_query) {
    // If search_query is present, add search_term to apiParams
    apiParams.search_term = search_query;
  }

  // Make the API call with the constructed parameters
  let stories = await Storyblok.get("cdn/stories", apiParams, {
    next: { revalidate: 3600 },
  });

  return {
    storyData: stories.data.stories,
    totalData: stories.total,
  };
}

export async function getblogDataCategorization(
  page_no,
  limit_per_page,
  filter_category,
  search_query
) {
  // Define the base parameters for the API call
  let apiParams = {
    starts_with: "blogs/",
    page: page_no || 1,
    per_page: limit_per_page || 9,
    version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
  };

  // Check if filter_category is present in props
  if (filter_category) {
    // If filter_category is present, add filter_query to apiParams
    apiParams.filter_query = {
      subcategory: {
        in: filter_category,
      },
    };
  }
  if (search_query) {
    // If search_query is present, add search_term to apiParams
    apiParams.search_term = search_query;
  }

  // Make the API call with the constructed parameters
  let stories = await Storyblok.get("cdn/stories", apiParams, {
    next: { revalidate: 3600 },
  });

  return {
    storyData: stories.data.stories,
    totalData: stories.total,
  };
}

// export async function singlePopularBlog() {
//   try {
//     let stories = await Storyblok.get("cdn/stories", {
//       starts_with: "blog/",
//       per_page: 100,
//       cv: Math.random(),
//       version: process.env.NEXT_PUBLIC_STORYBLOK_VERSION,
//     });

//     const storyData = stories.data.stories;
//     // Filter the data to include only items with priority field equal to 1
//     const OnePopularData = storyData.filter(
//       (item) => item && +item?.content?.Priority === 1
//     );

//     return OnePopularData;
//   } catch (error) {
//     console.error("Error fetching blog data:", error);
//     return [];
//   }
// }
