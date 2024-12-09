"use client";
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import freeForever from "@/app/images/freeForever.svg";
import Image from "next/image";
import youTubeIcon from "@/app/images/youtube-icon.svg";

const YouTubeSummarizer = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const [summary, setSummary] = useState("");
  const [transcriptText, setFullTranscript] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("summary"); // Default to "summary"
  const [tools, setTools] = useState([]);

  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  const videoUrls = {
    "Automating Emails": "https://www.youtube.com/watch?v=fclfUlRC9MU",
    "Swiftsupport Overview": "https://www.youtube.com/watch?v=jIYZddc4f0A",
    "Deploy AI Agent": "https://www.youtube.com/watch?v=WFA536oxEn4",
    "How to Automate Emails": "https://www.youtube.com/watch?v=fclfUlRC9MU",
  };
  const handleClick = (item) => {
    setYoutubeUrl(videoUrls[item]);
  };
  const extractVideoId = (youtubeUrl) => {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?v=|(?:[A-Za-z0-9-]+&)*))([\w-]{11})/;
    const match = youtubeUrl.match(regex);
    return match && match[1] ? match[1] : null;
  };

  const handleSummaryClick = () => {
    setActiveTab("summary");
  };

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_summary`, {
          method: "GET",
        }); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Map API response to match Tools component props
        const formattedTools = data.youtube_summary_list.map((item) => ({
          imageUrl: `https://img.youtube.com/vi/${extractVideoId(
            item.youtube_url
          )}/0.jpg`,
          title: "Summary",
          description: item.summary,
          link: item.youtube_url,
          showFullDescription: false,
        }));

        setTools(formattedTools); // Update tools state
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  const toggleDescription = (index) => {
    setTools((prevTools) =>
      prevTools.map((tool, i) =>
        i === index
          ? { ...tool, showFullDescription: !tool.showFullDescription }
          : tool
      )
    );
  };
  const fetchTranscriptAPI = async (videoId, lang = "en") => {
    try {
      const response = await fetch(`/api/youtube-api/?videoId=${videoId}&lang=${lang}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      const transcript = await response.json();

      return transcript.data;
    } catch (error) {
      console.error("Error fetching transcript:", error.message);
    }
  };

  const fetchSummary = async (transcriptText) => {
    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 3000));
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_BE_URL}/youtube_summary`,
        {
          youtube_url: youtubeUrl,
          video_transcript: transcriptText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSummary(response.data.summarized_text);
      handleSummaryClick();
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
    const dataText=await fetchTranscriptAPI(videoId)
   
    setFullTranscript(dataText);
    await fetchSummary(dataText); // Call the API fetch function
  };

  return (
    <main className="mt-12 md:mt-32">
      <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent">
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

        <div className="flex flex-wrap gap-4 mb-2 mt-5">
          <div className="flex flex-wrap gap-2 items-center justify mx-auto">
          <p className="text-xs sm:text-sm mt-1 font-bold ">Quick Try:</p>

            {Object.keys(videoUrls).map((item, index) => (
              <button
                key={index}
                className="inline-flex items-center px-3 border py-1 text-xs sm:text-sm font-medium bg-white text-red-500 rounded-full shadow-sm cursor-pointer hover:bg-red-200"
                onClick={() => handleClick(item)}
              >

            
                <Image src={youTubeIcon} className="mr-2"/>

                
                {item}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="relative flex items-center w-full my-3 mt-5">
            <input
              type="url"
              name="youtubeUrl"
              placeholder="Paste your link here..."
              className="w-full py-3 px-4 text-gray-800 bg-gray-100 shadow-sm outline-none rounded-[50px]"
              onChange={(e) => setYoutubeUrl(e.target.value)}
              value={youtubeUrl}
              required
            />
            <button
              type="submit"
              className="absolute right-0 !px-4 mr-2 py-5 common-button header-btn"
              disabled={loading}
            >
              {loading ? "Summarizing..." : "Get Summary"}
            </button>
          </div>
        </form>
        

       
        {/* Tabs for Summary and Full Transcript */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded shadow flex flex-col items-center"
              >
                <img
                  src={tool.imageUrl}
                  alt={tool.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="font-bold text-lg mt-4">...</h3>
                <p className="mt-2">
                  {tool.showFullDescription
                    ? tool.description
                    : `${tool.description.slice(0, 100)}...`}
                </p>
                <button
                  onClick={() => toggleDescription(index)}
                  className="text-blue-500 mt-4"
                >
                  {tool.showFullDescription ? "Read Less" : "Read More"}
                </button>
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-blue-600"
                >
                  Watch Video
                </a>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-5 p-4 bg-red-100 text-red-800 rounded">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default YouTubeSummarizer;
