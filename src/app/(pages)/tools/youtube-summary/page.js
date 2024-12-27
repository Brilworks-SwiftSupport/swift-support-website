import React from "react";
import YouTubeSummarizer from "@/app/components/YouTube/YouTubeSummarizer";

export const metadata = {
  title: "Free YouTube Video Summarizer to Get Quick Highlights",
  description:
    "Summarize YouTube videos instantly with our AI-powered YouTube Video Summarizer tool for quick insights.",
  keywords:
    "YouTube video summarizer, video summary, AI video summarizer, YouTube highlights, video insights, summarize YouTube videos, AI-powered summarizer, video content summary, YouTube summary tool, quick video summary, YouTube transcription",
  openGraph: {
    title: "Free YouTube Video Summarizer to Get Quick Highlights",
    description:
      "Summarize YouTube videos instantly with our AI-powered YouTube Video Summarizer tool for quick insights.",
    images: [
      {
        url: "/youtube-summary/images/youtube_summary.svg",
        width: 1200,
        height: 630,
        alt: "YouTube Video Summarizer tool",
      },
    ],
  },
};

const fetchYouTubeData = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  try {
    const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_summary`, {method: "GET",
      next: { revalidate: 10 },
    });
    const data = await response.json();

    return data.youtube_summary_list.map((item) => ({
      imageUrl: `https://img.youtube.com/vi/${extractVideoId(
        item.youtube_url
      )}/0.jpg`,
      title: item.video_title,
      summary: item.summary,
      link: item.youtube_url,
      transcript: item.transcript,
      id:item.id

    }));
  } catch (error) {
    console.error("Error fetching YouTube data:", error);
    return [];
  }
};

export default async function Page() {
  const tools = await fetchYouTubeData();

  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <YouTubeSummarizer initialTools={tools} />
      </div>
    </main>
  );
}

function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/.*?[?&]v=|https?:\/\/(?:www\.)?youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match && match[1] ? match[1] : null;
}
