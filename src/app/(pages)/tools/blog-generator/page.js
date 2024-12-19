import BlogGenerator from "@/app/components/BlogGenerator/BlogGenerator";
import React from "react";
import axios from "axios";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${NEXT_PUBLIC_BE_URL}/blog_creation`);
    console.log("API Response:", response.data);

    return response.data.blogs.map((item) => ({
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
