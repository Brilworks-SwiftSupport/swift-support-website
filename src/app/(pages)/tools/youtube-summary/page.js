import React from "react";
import Head from "next/head"; // Import the Head component
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
    <>
      <Head>
        <title>YouTube Video Summarizer - AI-Powered Summaries</title>
        <meta
          name="description"
          content="Discover AI-powered video summaries for YouTube. Get concise summaries and key insights from your favorite YouTube videos."
        />
        <meta name="keywords" content="YouTube Summarizer, Video Summaries, AI Tools, YouTube AI, Video Transcripts" />
        <meta name="author" content="SwiftSupport AI" />
        <meta property="og:title" content="YouTube Video Summarizer - AI-Powered Summaries" />
        <meta
          property="og:description"
          content="Get AI-generated summaries of YouTube videos, providing quick insights and transcripts for easy understanding."
        />
        <meta property="og:image" content="/images/youtube_summary.svg" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}tools/youtube-summary`} />

        <meta property="og:type" content="website" />
      </Head>

      <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
        <div className="mt-20 w-full max-w-[90%] mx-auto">
          <YouTubeSummarizer initialTools={tools} />
        </div>
      </main>
    </>
  );
}

function extractVideoId(url) {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/.*?[?&]v=|https?:\/\/(?:www\.)?youtu\.be\/)([\w-]{11})/;
  const match = url.match(regex);
  return match && match[1] ? match[1] : null;
}
