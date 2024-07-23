import BlogList from "@/app/components/Blog/BlogList";
import React from "react";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  return {
    title: "Blog | Swift Support",
    description: "Explore our Blog page to find information about who we are and who we work with, and details about our  product.",
    openGraph: {
      title: "Blog | Swift Support",
      description: "Explore our Blog page to find information about who we are and who we work with, and details about our product.",
      url: `${baseUrl}sitemap/`,
      siteName: "Swift Support",
      images: [
        {
          url: `${baseUrl}images/Prototype.jpg`,
        },
      ],
      locale: "en-US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | Swift Support",
      description: "Explore our Blog page to find information about who we are and who we work with, and details about our product.",
      site: "@_SwiftSupport",
    },
    alternates: {
      canonical: `${baseUrl}/blog`,
    },
  };
}

const page = () => {
  return (
    <div className="bg_contactus">
      <BlogList />
    </div>
  );
};

export default page;
