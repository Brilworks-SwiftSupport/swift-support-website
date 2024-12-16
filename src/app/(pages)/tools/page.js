import { Tools } from "@/app/components/Tools/Tools";
import React from "react";

const page = () => {
  const tools = [
    {
      imageUrl: "/images/text-to-voice.svg",
      title: "Text to Voice",
      description:
        "Transform your text into lifelike, natural-sounding audio with ease.",
      link: "/tools/text-to-voice",
      button_title: "Generate Voice",
    },

    {
      imageUrl: "/images/voice-to-text.png",
      title: "Voice to Text",
      description:
        "Convert spoken words into accurate, editable text instantly.",
      link: "/tools/voice-to-text",
      button_title: "Transcribe Now",
    },

    {
      imageUrl: "/images/image_generator.svg",
      title: "AI Image Generator",
      description:
        "Create stunning visuals from your ideas with AI-driven precision.",
      link: "/tools/image-generator",
      button_title: "Generate Image",
    },

    {
      imageUrl: "/images/ai_para_banner.png",
      title: "AI Paraphraser",
      description:
        "Effortlessly rephrase text to make it unique and clearer with AI-powered paraphrasing.",
      link: "/tools/ai-paraphraser",
      button_title: "Detect AI Content",
    },

    {
      imageUrl: "/images/ai_plag_banner.png",
      title: "Plagiarism Checker",
      description:
        "Quickly scan your content for plagiarism and ensure its originality with AI accuracy.",
      link: "/tools/plagiarism-checker",
      button_title: "Check Plagiarism",
    },

    {
      imageUrl: "/images/ai_content.png",
      title: "AI Content Detector",
      description:
        "Identify whether your content is AI-generated or human-crafted with advanced detection.",
      link: "/tools/ai-content-detector",
      button_title: "Detect AI Content",
    },

    {
      imageUrl: "/images/youtube_summary.svg",
      title: "YouTube Video Summarizer",
      description:
        "Get concise summaries of YouTube videos in seconds - save time and learn faster.",
      link: "/tools/youtube-summary",
      button_title: "Generate Summary",
    },

    {
      imageUrl: "/images/chatpdf.svg",
      title: "Talk with Document",
      description:
        "Ask questions and get answers from your document instantly.",
      link: "/tools/chat-pdf",
      button_title: "Ask Now",
    },
    {
      imageUrl: "/images/chatpdf.svg",
      title: "AI Document Generator",
      description:
        "Generate document using ai",
      link: "/tools/ai-doc-generator",
      button_title: "Generate Now",
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="mt-10">
        <div className="container mx-auto py-8 px-4 ">
          <h1 className="text-center text-[54px] font-urbanist font-bold leading-[72px] mt-20 mb-10">
            <span>Explore our</span>{" "}
            <span className="relative inline-block mb-2">
              AI Tools
              <div className="absolute left-0 -bottom-1 banner-underline !max-w-none"></div>
            </span>
          </h1>
          <div className="flex items-center justify-center gap-16 flex-wrap mx-auto mb-20">
            {tools.map((tool, index) => (
              <Tools
                key={index}
                imageUrl={tool.imageUrl}
                title={tool.title}
                description={tool.description}
                link={tool.link}
                button_title={tool.button_title}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
