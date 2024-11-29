"use client"
import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import freeForever from "@/app/images/freeForever.svg"
import Image from "next/image";
import BannerLine from "../Tools/BannerLine";


const YouTubeSummarizer = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  const [summary, setSummary] = useState("");
  const [transcriptText, setFullTranscript] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("summary"); // Default to "summary"
  const [tools, setTools] = useState([]);


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
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?v=|(?:[A-Za-z0-9-]+&)*))([\w-]{11})/;
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
        const response = await fetch("https://devapi.swiftsupport.ai/api/youtube_summary"
          , { method: "GET" }); // Adjust the URL if necessary
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Map API response to match Tools component props
        const formattedTools = data.youtube_summary_list.map((item) => ({
          imageUrl: `https://img.youtube.com/vi/${extractVideoId(item.youtube_url)}/0.jpg`,
          title: "Summary",
          description: item.summary,
          link: item.youtube_url,
          showFullDescription: false
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

  const fetchSummary = async (transcriptText) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://devapi.swiftsupport.ai/api/youtube_summary",
        {
          youtube_url: youtubeUrl,
          video_transcript: transcriptText,

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
    e.preventDefault()
  
    if (!youtubeUrl.trim()) {
      alert("Please provide a valid YouTube URL!");
      return;
    }
   
    const videoId = extractVideoId(youtubeUrl);
    setVideoId(videoId);
    const transcriptData = await YoutubeTranscript.fetchTranscript(videoId);
    const textData = transcriptData.map((item) => item.text).join(" ");
    setFullTranscript(textData);
    await fetchSummary(textData); // Call the API fetch function
  };

  return (
    <main className="flex mt-32 justify-center w-full max-w-[90%] mx-auto">

      <div className="container bg-transparent w-full max-w-[90%] mx-auto">
        <Image className="mx-auto" src={freeForever} alt="free-forever" width={"auto"} />
        <br></br>
        {/* Title Section */}
        <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-4 w-full max-w-[90%] mx-auto">
          <span>
            Cut the clutter, capture the core;
          </span>
        </h1>
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4 w-full max-w-[90%] mx-auto">
          <span>
            Video summaries at your fingertips
          </span>

        </h2>
        <BannerLine mLeft={"auto"} mRight={"auto"}/>
      
        {/* Subtitle */}
        <p className="text-center text-gray-600 font-bold b-8 mt-5 mb-4">
          Simply paste your <span className="bg-clip-text text-transparent bg-text-theme-gradient">YouTube link</span>  below and let the magic happen in seconds.
        </p>
   

        <form onSubmit={handleSubmit}>

          <div className="relative flex items-center w-full mb-6">
            <input
              type="url"
              name="youtubeUrl"
              placeholder="Paste your link here..."
              className="w-full py-3 px-4 text-gray-800 bg-gray-100 shadow-sm outline-none rounded-[50px] "
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

        <div className="flex justify-center items-center gap-4 mb-4">
          <p className="text-sm text-red-500 font-bold">Note: To use this tool please install this chrome extension <button className="inline-flex items-center px-3 py-1 text-sm font-medium bg-red-100 text-black-500 rounded-full shadow-sm cursor-pointer hover:bg-red-200">
          <a href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf" target="_blank"> Allow CORS </a> 
          </button> and  enable the extension
          </p>
        </div>

        <div className="flex items-center gap-4 mb-4">
          {/* Quick Try Label */}
          <p className="text-sm">Quick Try:</p>

          {/* List of Items */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(videoUrls).map((item, index) => (
              <button
                key={index}
                className="inline-flex items-center px-3 py-1 text-sm font-medium bg-red-100 text-red-500 rounded-full shadow-sm cursor-pointer hover:bg-red-200"
                onClick={() => handleClick(item)} // Handle button click
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M10 15l5-3-5-3v6z" />
                </svg>
                {item}
              </button>
            ))}
          </div>
        </div>


        {/* Tabs for Summary and Full Transcript */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className={`!px-4 mr-2 py-5 common-button header-btn ${activeTab === "summary"
              }`}
            onClick={handleSummaryClick}
          >


            Summary
          </button>

          <button
            className={`!px-4 mr-2 py-5 common-button header-btn ${activeTab === "transcript"
              }`}
            onClick={() => setActiveTab("transcript")}
          >
            Full Transcript
          </button>
        </div>

        {/* Display Summary or Full Transcript */}
        <div className="mt-5 p-4 rounded">
          {activeTab === "summary" && summary && (
            <div className="flex mt-4">

              <div className="w-1/2">
                <h3 className="text-[#3B82F6] font-bold">Summary:</h3>
                <p>{summary}</p>
              </div>
              <div className="w-full sm:w-1/2 p-4">

                {videoId ? (
                  <YouTube videoId={videoId} opts={opts} className="h-full" />
                ) : (<></>
                )}
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


        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-4 w-full max-w-[90%] mx-auto">
          Just In - The Latest Summaries for You!
        </h2>
        <div className="mt-20">
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <div key={index} className="p-4 bg-gray-100 rounded shadow flex flex-col items-center">
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
