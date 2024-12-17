"use client";
import React, { useState} from "react";
import YouTube from "react-youtube";
import axios from "axios";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import freeForever from "@/app/images/freeForever.svg";
import quickVideoSummaries from "@/app/images/quick_video_summaries.svg";
import easyToUseInterface from "@/app/images/easy_to_use_interface.svg";
import accurateAndConcise from "@/app/images/accurate_and_concise.svg";
import Image from "next/image";
import youTubeIcon from "@/app/images/youtube-icon.svg";
import { YoutubeTranscript } from "youtube-transcript";
import HandleText from "../Tools/HandleText";
const NEXT_PUBLIC_BE_URL=process.env.NEXT_PUBLIC_BE_URL


const  YouTubeSummarizer = ({ initialTools = []}) =>  {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const [summary, setSummary] = useState("");
  const [transcriptText, setFullTranscript] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("summary"); // Default to "summary"
  const [visibleCount, setVisibleCount] = useState(3); // Initial 6 items for a 3x2 grid
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;
  const [activeFAQ, setActiveFAQ] = useState(null);

  const features = [
    {
      icon: quickVideoSummaries,
      title: "Quick Video Summaries",
      description:
        "Instantly generate summaries of YouTube videos, capturing key points and ideas, so you don't miss important details.",
    },
    {
      icon: easyToUseInterface,
      title: "Easy-to-Use Interface",
      description:
        "Simply paste the video link, and the tool quickly processes the content to generate a brief, readable summary.",
    },
    {
      icon: accurateAndConcise,
      title: "Accurate and Concise",
      description:
        "The tool ensures the summary remains true to the video's main messages, making it easy to grasp important takeaways in just a few sentences.",
    },
  ];

  const faqItems = [
    {
      question: "How do I summarize a YouTube video?",
      answer:
        "Simply paste the YouTube video link into the tool, and it will generate a brief, clear summary based on the video content.",
    },
    {
      question: "Can I summarize any YouTube video?",
      answer:
        "Yes, you can summarize any publicly available YouTube video, whether it's educational, professional, or entertainment content.",
    },
    {
      question: "How accurate are the summaries?",
      answer:
        "The tool accurately summarizes the video, capturing the main ideas while ensuring no essential information is missed.",
    },
    {
      question: "Is there any payment required?",
      answer:
        "No, you don’t need to provide any credit card details or make payments. The YouTube Video Summarizer is completely free to use.",
    },
    {
      question: "Do I need to create an account to use the tool?",
      answer:
        "No, there’s no need to create an account or log in. You can start summarizing videos immediately without any registration process.",
    },
  ];



  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  const videoUrls = {
    "Automating Emails": "https://www.youtube.com/watch?v=fclfUlRC9MU",
    "Swiftsupport Overview": "https://www.youtube.com/watch?v=jIYZddc4f0A",
    "Deploy AI Agent": "https://www.youtube.com/watch?v=WFA536oxEn4",
    "How to Automate Emails": "https://www.youtube.com/watch?v=fclfUlRC9MU",
  };
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 6 more items
  };
  const handleClick = (item) => {
    setYoutubeUrl(videoUrls[item]);
  };

  const extractVideoId = (youtubeUrl) => {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/.*?[?&]v=|https?:\/\/(?:www\.)?youtu\.be\/)([\w-]{11})/;
    const match = youtubeUrl.match(regex);
    return match && match[1] ? match[1] : null;
  };
  

  const handleSummaryClick = () => {
    setActiveTab("summary");
  };



  const fetchSummary = async (textData, youtubeUrl) => {
    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_BE_URL}/youtube_summary`,
        {
          youtube_url: youtubeUrl,
          transcript_text: textData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSummary(response.data.summarized_text);

      setActiveTab("summary");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const opts = {
    height: "315",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!youtubeUrl.trim()) {
      alert("Please provide a valid YouTube URL!");
      return;
    }
    const videoId = extractVideoId(youtubeUrl);
    setVideoId(videoId);
    const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
    console.log(transcriptData)
    const textData = transcriptData.map((item) => item.text).join(" ");
    const updatedText = textData.replace(/&amp;#39;/g, "'");
    setFullTranscript(updatedText);
    await fetchSummary(updatedText, youtubeUrl); // Call the API fetch function
  };

  return (
    <main className="mt-12 md:mt-32">
      <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent mb-32">
        <Image
          className="mx-auto w-auto h-auto"
          src={freeForever}
          alt="free-forever"
          width={300}
          height={100}
        />

        {/* Title Section */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-[54px] font-urbanist font-bold leading-[1.2] mb-4 mt-6 md:mt-12">
          <span className="inline-block md:mb-6">
            Cut the clutter, capture the core;
          </span>{" "}
          <span className="inline-block md:mb-6">
            <span className="relative inline-block mb-2 md:mb-6">
              Video summaries
              <div className="absolute left-0 banner-underline md:!mt-2 !w-[275px] md:!w-[720px] !max-w-none"></div>{" "}
            </span>{" "}
            <span className="inline-block md:mb-6"> at your fingertips</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-center text-#212121 font-urbanist font-medium text-base md:text-[24px] mt-6 px-4">
          Simply paste your{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            YouTube link
          </span>{" "}
          below and let the magic happen in seconds.
        </p>

        <div className="flex flex-col gap-4 mb-2 mt-5 sm:flex-row sm:flex-wrap sm:justify-center">
        <p className="text-xs sm:text-sm mt-1 font-bold text-center sm:text-left">Quick Try:</p>
        <div className="flex flex-col sm:flex-row sm:gap-4 items-center justify-center w-full sm:w-auto gap-2">
          {Object.keys(videoUrls).map((item, index) => (
            <button
              key={index}
              className="inline-flex items-center px-3 border py-1 text-xs sm:text-sm font-medium bg-white text-red-500 rounded-full shadow-sm cursor-pointer hover:bg-red-200"
              onClick={() => handleClick(item)}
            >
              <Image src={youTubeIcon} className="mr-2" />
              {item}
            </button>
          ))}
        </div>
      </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-4 mt-5 mb-5 w-full">
          <div className="flex-grow">
            <input
              type="url"
              name="youtubeUrl"
              placeholder="Paste your link here..."
              className="w-full py-3 px-4 text-gray-800 bg-gray-100 shadow-sm outline-none rounded-[50px]"
              onChange={(e) => setYoutubeUrl(e.target.value)}
              value={youtubeUrl}
              required
            />
          </div>
          <button
            type="submit"
            className={`py-3 px-6 h-12 w-[150px] mx-auto sm:mx-0 text-center common-button header-btn rounded-full transition-colors ${
              loading ? "cursor-not-allowed opacity-50" : "hover:bg-red-500 hover:text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Summarizing..." : "Get Summary"}
          </button>
        </form>
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <p className="text-xs sm:text-sm text-red-500 font-bold">
            Note: To use this tool please install this chrome extension{" "}
            <button className="inline-flex px-3 py-1 text-xs sm:text-sm font-medium bg-red-100 text-black-500 rounded-full shadow-sm cursor-pointer hover:bg-red-200">
              <a
                href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf"
                target="_blank"
              >
                Allow CORS
              </a>
            </button>{" "}
            and enable the extension
          </p>
        </div>

        {/* Tabs for Summary and Full Transcript */}
        { summary &&

          <div className="flex justify-center gap-4 mt-6">
          <button
            className={`!px-4 mr-2 py-2 sm:py-5 text-sm sm:text-base common-button header-btn ${
              activeTab === "summary"
            }`}
            onClick={handleSummaryClick}
          >
            Summary
          </button>

          <button
            className={`!px-4 mr-2 py-2 sm:py-5 text-sm sm:text-base common-button header-btn ${
              activeTab === "transcript"
            }`}
            onClick={() => setActiveTab("transcript")}
          >
            Full Transcript
          </button>
          </div>
        
        }
     

        {/* Display Summary or Full Transcript */}
        <div className="mt-5 p-4 rounded">
          {activeTab === "summary" && summary && (
            <div className="flex flex-col sm:flex-row mt-4">
              <div className="w-full sm:w-1/2">
                <h3 className="text-[#3B82F6] font-bold">Summary:</h3>
                <p>{summary}</p>
              </div>
              <div className="w-full sm:w-1/2 p-4">
                {videoId ? (
                  <YouTube videoId={videoId} opts={opts} className="w-full" />
                ) : null}
              </div>
            </div>
          )}
          {activeTab === "transcript" && transcriptText && (
            <>
              <h3 className="text-[#3B82F6] font-bold">Full Transcript:</h3>
              <p>{transcriptText}</p>
            </>
          )}
        </div>

        {/* Tools Section */}
        <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Just In - The Latest Summaries for You!
        </h2>

        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialTools.slice(0, visibleCount).map((tool, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-[#E4E4E4] rounded shadow flex flex-col justify-between"
              >
                <img
                  src={tool.imageUrl}
                  alt={tool.title}
                  className="w-full h-40 object-cover rounded"
                />
            


                <div className="mt-4 mb-4">
                      <HandleText text={tool.summary} type=""/>
                </div>
                
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="justify text-center w-full py-4 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 w-[340px] h-[60px]"
                >
                  Watch Video
                </a>
              </div>
            ))}
          </div>
          {/* Load More Button */}
          {visibleCount <  initialTools.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300"

              >
                Load More
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-5 p-4 bg-red-100 text-red-800 rounded">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Content Section */}
        <DetailSection
          title="Get Quick Video Insights with YouTube Summarizer"
          description="Get key insights from YouTube videos in seconds with our YouTube Video Summarizer. Whether you're reviewing educational content, interviews, or entertainment, this tool provides concise and accurate summaries, saving you time while retaining essential information."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does the YouTube Video Summarizer Work?"
          explanation={[
            "The YouTube Video Summarizer uses advanced Natural Language Processing (NLP) and AI algorithms to analyze the content of YouTube videos. After processing the video’s speech and text, it extracts the most relevant information, filtering out unnecessary details to create a concise, coherent summary.",
            "Once the summary is generated, the tool presents a clear and structured overview of the video’s main points, making it easy for you to understand the key message without watching the entire video.",
          ]}
        />
        <FAQSection
          faqItems={faqItems}
          activeFAQ={activeFAQ}
          toggleFAQ={toggleFAQ}
        />
      </div>
    </main>
  );
};

export default YouTubeSummarizer;
