"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

import Article from "./Article";

const components = {
  swiftsupport_article: Article,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  use: [apiPlugin],
  components,
});

export default function StoryblokProvider({ children }) {
  return children;
}
