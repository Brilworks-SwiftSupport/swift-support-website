"use client"
import React, { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub-flavored markdown (tables, checkboxes, etc.)

const PrdAgent1 = () => {
  const [isScrollAreaVisible, setIsScrollAreaVisible] = useState(false);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null); // New ref for the input element

  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;


 

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
    const newQuestion = { type: "question", content: question,timestamp: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second:"2-digit",
      hour12: true,
    }), };
    setChatHistory((prev) => [...prev, newQuestion]);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BE_URL}/document_generator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          chatHistory
        }),
      });

      const data = await response.json();
      const newAnswer = { type: "answer", content: data.answer,timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second:"2-digit",
        hour12: true,
      }), };
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
            <Link href="/ai-agents">
            <div className="flex items-center space-x-2">
              <img src="/images/back-arrow.svg" alt="Back" className="w-8 h-8" />
              <span className="text-sm md:text-base">Back</span>
            </div>
            </Link>
        </div>


        <div className="relative text-center flex items-center justify-center space-x-4 mb-4 flex-col md:flex-row">
      

        {/* Share Button */}
        <button
          className="flex bg-gray-200 rounded-md p-4 md:absolute md:top-1 md:right-7 md:space-x-4 justify-center space-x-4 md:justify-end mt-4 md:mt-0"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: document.title,
                text: "Check out this page!",
                url: window.location.href,
              })
                .then(() => console.log("Page shared successfully!"))
                .catch((error) => console.error("Error sharing the page:", error));
            } else {
              const currentUrl = window.location.href;
              navigator.clipboard.writeText(currentUrl);
              alert(
                "Sharing is not supported in your browser. The page link has been copied to your clipboard instead."
              );
            }
          }}
          aria-label="Share this page"
          style={{ zIndex: 1 }}
        >
          <img
            src="/images/share.svg"
            alt="Share"
            className="w-6 h-6"
          />
        </button>
      </div>



        <h2 className="text-2xl font-semibold mb-4 text-center mt-8">
          Chat With Product Requirements Document Generator Agent
        </h2>

        
        <Card className="mt-8 p-4 mb-4 bg-gray-100">
        {isScrollAreaVisible && (
          <div
            ref={scrollAreaRef}
            className="h-[500px] mb-4 p-4 rounded-md bg-gray-50 overflow-y-scroll"
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.type === "question" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 font-semibold rounded-lg max-w-[80%] ${
                    message.type === "question"
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.type === "answer" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline font-medium"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
                <div
                  className={`text-xs mt-1 ${
                    message.type === "question"
                      ? "text-black-800 text-right"
                      : "text-black-800 text-left"
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            ))}
            {/* Loader when generating an answer */}
            {isLoading && (
              <div className="text-left mt-4">
                <div className="inline-block p-3 font-semibold rounded-lg bg-gray-100 text-gray-800">
                  <div className="loader-animation mt-2">
                    <span className="dot dot-1"></span>
                    <span className="dot dot-2"></span>
                    <span className="dot dot-3"></span>
                  </div>
                </div>
                <style jsx>{`
                  .loader-animation {
                    display: flex;
                    gap: 4px;
                    justify-content: center;
                    align-items: center;
                    margin-top: 8px;
                  }

                  .dot {
                    width: 14px;
                    height: 14px;
                    background-color: #3498db; /* Blue */
                    border-radius: 50%;
                    animation: pulse 1.5s infinite ease-in-out;
                  }

                  .dot-1 {
                    animation-delay: 0s;
                  }

                  .dot-2 {
                    animation-delay: 0.3s;
                  }

                  .dot-3 {
                    animation-delay: 0.6s;
                  }

                  @keyframes pulse {
                    0%,
                    80%,
                    100% {
                      transform: scale(0);
                      background-color: #3498db; /* Blue */
                    }
                    40% {
                      transform: scale(1);
                      background-color: #2ecc71; /* Green */
                    }
                  }
                `}</style>
              </div>
            )}

          </div>
        )}
        <form onSubmit={handleQuestionSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the finance..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </Card>


        {/* Predefined Questions Section */}
        <div className="mb-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Quick Questions:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Generate Product Requirements Document for ai chatbot with personal data"].map(
              (presetQuestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuestion(presetQuestion)}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-600"
                >
                  {presetQuestion}
                </button>
              )
            )}
          </div>
        </div>

       
       
      </div>
    </main>
  );
};

export default PrdAgent1;