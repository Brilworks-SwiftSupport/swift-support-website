import Plagiarism from "@/app/components/Plagiarism/Plagiarism";
import React from "react";
import axios from "axios";

export const metadata = {
  title: "Free Plagiarism Checker online - Fast & Accurate",
  description:
    "Ensure content originality with our AI-powered Plagiarism Checker tool to prevent duplicate content.",
  keywords:
    "plagiarism checker, AI plagiarism detector, duplicate content checker, plagiarism prevention, plagiarism detection tool, content originality checker, free plagiarism checker, online plagiarism checker, check for plagiarism, plagiarism checker online, anti-plagiarism tool",
  openGraph: {
    title: "Free Plagiarism Checker online - Fast & Accurate",
    description:
      "Ensure content originality with our AI-powered Plagiarism Checker tool to prevent duplicate content.",
    images: [
      {
        url: "/plagiarism-checker/images/ai_plag_banner.png",
        width: 1200,
        height: 630,
        alt: "Plagiarism Checker tool",
      },
    ],
  },
};

const fetchAllPlagiarism = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BE_URL}/content_tools?type=plagiarism`
    );
    const data = response.data;

    return data.content_tools.map((item) => ({
      text: item.text,
      plagiarised_content: item.plagiarised_content,
      source_links: item.source_links,
      plagiarism_percentage: item.plagiarism_percentage,
    }));
  } catch (error) {
    console.error("Error fetching plagiarism data:", error);
    return [];
  }
};

export default async function Page() {
  const allPlagiarism = await fetchAllPlagiarism();
  return (
    <main className="mb-10">
      <div className="mt-20 max-w-[1200px] w-full mx-auto px-4">
        <Plagiarism allPlagiarismInfo={allPlagiarism} />
      </div>
    </main>
  );
}
