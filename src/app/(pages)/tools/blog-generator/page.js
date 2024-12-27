import BlogGenerator from "@/app/components/BlogGenerator/BlogGenerator";
import React from "react";

export const metadata = {
  title: "Free AI blog Generator: Create blogs Within Seconds",
  description:
    "Create well-written blogs effortlessly with our AI Blog Generator tool based on your description.",
  keywords:
    "AI blog generator, blog creation, AI content generator, create blogs with AI, blog writing tool, text generator, generate blogs, AI writing assistant, blog maker, create custom blogs, AI-powered blog generator",
  openGraph: {
    title: "Free AI Blog Generator: Create Blogs Within Seconds",
    description:
      "Create well-written blogs effortlessly with our AI Blog Generator tool based on your description.",
    images: [
      {
        url: "/blog-generator/images/blog_generator.svg",
        width: 1200,
        height: 630,
        alt: "AI Content Detector tool",
      },
    ],
  },
};


const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const fetchBlogs = async () => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BE_URL}/blog_creation`,{method: "GET",
      next: { revalidate: 10 },
    });
    const data = await response.json();

    return data.blogs.map((item) => ({
      text: item.text,
      title: item.title,
      image_url: item.image_url,
      description: item.description,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};

export default async function Page() {
  const all_content = await fetchBlogs();

  return (
    <main className="mb-10">
      <div className="mt-20">
        <BlogGenerator allContentInfo={all_content} />
      </div>
    </main>
  );
}
