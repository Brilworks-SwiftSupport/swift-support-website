import React from "react";
import AiContentDetector from "@/app/components/AiContentDetector/AiContentDetector";

export const metadata = {
  title: "Free AI Content Detector for Identifying Text",
  description:
    "Detect AI-generated content quickly with our AI Content Detector tool for accurate results.",
  keywords:
    "AI content detector, AI-generated text, content identification, AI text detector, detect AI writing, AI detection tool, detect artificial intelligence content, content analysis, text analysis tool, free AI detector",
  openGraph: {
    title: "Free AI Content Detector for Identifying Text",
    description:
      "Detect AI-generated content quickly with our AI Content Detector tool for accurate results.",
    images: [
      {
        url: "/ai-content-detector/images/ai_content.png",
        width: 1200,
        height: 630,
        alt: "AI Content Detector tool",
      },
    ],
  },
};

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const fetchAllContent = async () => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BE_URL}/content_tools?type=ai_content`,{ method: "GET",
        next: { revalidate: 10 },}
    );
    const data = await response.json();
    return data.content_tools.map((item) => ({
      text: item.text,
      ai_generated: item.ai_generated,
      human_written: item.human_written,
    }));
  } catch (error) {
    console.error("Error fetching content tools:", error);
    return [];
  }
};

export default async function Page() {
  const all_content = await fetchAllContent();

  return (
    <main className="mb-10">
      <div className="mt-20">
        <AiContentDetector allContentInfo={all_content} />
      </div>
    </main>
  );
}
