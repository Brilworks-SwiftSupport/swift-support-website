import React from "react";
import YouTubeSummarizer from "@/app/components/YouTube/YouTubeSummarizer";

const fetchYouTubeData = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_summary`);
  const data = await response.json();

  return data.youtube_summary_list.map((item) => ({
    
    imageUrl: `https://img.youtube.com/vi/${extractVideoId(item.youtube_url)}/0.jpg`,
    title: "Summary",
    summary: item.summary,
    link: item.youtube_url,
    showFullDescription: item.transcript,
  }));
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
};