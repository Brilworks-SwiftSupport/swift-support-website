"use client"
import React, { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Send } from "lucide-react";

const YouTubeVideoDetails = ({ pageData }) => {
  const [isScrollAreaVisible, setIsScrollAreaVisible] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null); // New ref for the input element

  const [videoId, setVideoId] = useState("");
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;


  const opts = {
    height: "315",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/(?:www\.)?youtube\.com\/.*?[?&]v=|https?:\/\/(?:www\.)?youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : null;
  };

  useEffect(() => {
    if (pageData?.youtube_url) {
      const id = extractVideoId(pageData.youtube_url);
      setVideoId(id);
    }
  }, [pageData.youtube_url]);

  useEffect(() => {
    inputRef.current?.focus();
    if (scrollAreaRef.current) {
      requestAnimationFrame(() => {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      });
    }
  }, [chatHistory])

  const handleQuestionSubmit = async (e) => {
    setIsScrollAreaVisible(true)
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    const newQuestion = { type: "question", content: question };
    setChatHistory((prev) => [...prev, newQuestion]);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          transcript: pageData.transcript,
        }),
      });

      const data = await response.json();
      const newAnswer = { type: "answer", content: data.answer };
      setChatHistory((prev) => [...prev, newAnswer]);

    } catch (error) {
      const errorMessage = {
        type: "answer",
        content: "Sorry, I couldn't process your question. Please try again.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setQuestion("");
    }
  };

  return (
    <main className="mt-5 md:mt-5 mx-auto px-4">
      <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent mb-32">

        <div className="flex flex-col mt-28 mb-5">
            <Link href="/tools/youtube-summary">
            <div className="flex items-center space-x-2">
              <img src="/images/back-arrow.svg" alt="Back" className="w-8 h-8" />
              <span className="text-sm md:text-base">Back</span>
            </div>
            </Link>
        </div>


        <div className="text-center">
          <h1 className="md:text-3xl text-xl font-bold mb-4 mt-2">
            {pageData.video_title || "Video Title"}
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 px-4 sm:px-8">
          {videoId ? (
            <div className="w-full max-w-md sm:max-w-xl">
              <YouTube
                videoId={videoId}
                opts={opts}
                className="rounded-md shadow-lg w-full"
              />
            </div>
          ) : (
            <p className="text-center text-gray-500 text-sm sm:text-base">
              Unable to load video.
            </p>
          )}

          <a
            href={pageData?.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white rounded-full py-3 px-8 text-center font-semibold hover:bg-gray-800 transition duration-300"
          >
            Watch Video
          </a>
        </div>

       


        {/* Summary Section */}
        <h2 className="text-2xl font-semibold mb-4 text-center mt-8">Summary</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg max-h-[400px] overflow-y-auto">
          <p className="text-gray-900 whitespace-pre-wrap md:text-xl text-sm">
            {pageData.summary || "Summary is not available for this video."}
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-center mt-8">
          Chat With YouTube Video
        </h2>
        {/* Chat Interface */}
        <Card className="mt-8 p-4 mb-4 bg-gray-100">
          {isScrollAreaVisible && (
            <div ref={scrollAreaRef}
              className="h-[300px] mb-4 p-4 rounded-md bg-gray-50 overflow-y-scroll">
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${message.type === "question" ? "text-right" : "text-left"
                    }`}
                >
                  <div
                    className={`inline-block p-3 font-semibold rounded-lg max-w-[80%] ${message.type === "question"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          )}
          <form onSubmit={handleQuestionSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the video..."
              disabled={isLoading}
              className="flex-1"
            />



            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : <Send className="h-4 w-4" />}
            </Button>
          </form>

        </Card>

        {/* Full Transcript Section */}
        <h2 className="text-2xl font-semibold mb-4 text-center mt-8">
          Full Transcript
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-h-[600px] overflow-y-auto">
          <p className="text-gray-900 whitespace-pre-wrap md:text-xl text-sm">
            {pageData.transcript || "Transcript is not available for this video."}
          </p>
        </div>

        <div className="flex flex-col mt-10 mb-5 items-center ">
            <Link href="/tools/youtube-summary">
            <div className="flex items-center space-x-2">
              <img src="/images/back-arrow.svg" alt="Back" className="w-8 h-8" />
              <span className="text-sm md:text-base">Back</span>
            </div>
            </Link>
        </div>
      </div>
    </main>
  );
};

export default YouTubeVideoDetails;