import BlogListPage from "@/app/components/Blog/BlogList";
import React from "react";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return {
    title:
      "SwiftSupport.ai Blogs | Learn About Customer Support with AI Chatbots",
    description:
      "Explore SwiftSupport.ai Blogs for expert insights on enhancing customer support with AI chatbots/LiveChats. Learn how to revolutionize your service experience and boost customer satisfaction.",
    openGraph: {
      title:
        "SwiftSupport.ai Blogs | Learn About Customer Support with AI Chatbots",
      description:
        "Explore SwiftSupport.ai Blogs for expert insights on enhancing customer support with AI chatbots/LiveChats. Learn how to revolutionize your service experience and boost customer satisfaction.",
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
      title:
        "SwiftSupport.ai Blogs | Learn About Customer Support with AI Chatbots",
      description:
        "Explore SwiftSupport.ai Blogs for expert insights on enhancing customer support with AI chatbots/LiveChats. Learn how to revolutionize your service experience and boost customer satisfaction.",
      site: "@_SwiftSupport",
    },
    alternates: {
      canonical: `${baseUrl}blog/`,
    },
  };
}

const page = ({ searchParams }) => {
  return (
    <div className="bg_contactus ">
      <BlogListPage searchParams={searchParams} />;
    </div>
  );
};

export default page;
