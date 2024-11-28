
import { Tools } from "@/app/components/Tools/Tools";
import React from "react";

const page = () => {
  const tools = [
    {
      imageUrl: "/images/youtube-1.png",
      title: "YouTube Video Summarizer",
      description: "Summarize YouTube videos and identify the important ideas and facts of videos",
      link: "/tools/youtube-summary",
      button_title:'Generate Summary'
    },
    {
      imageUrl: "/images/ai_plag_banner.png",
      title: "Plagiarism Checker",
      description: "Quickly scan your content for plagiarism and ensure its originality with AI accuracy.",
      link: "/tools/plagiarism-checker",
      button_title: "Check Plagiarism",
    },
    {
      imageUrl: "/images/ai_content.png", // Update this with the correct image path
      title: "AI Content Detector",
      description: "Identify whether your content is AI-generated or human-crafted with advanced detection.",
      link: "/tools/ai-content-detector",
      button_title: "Detect AI Content",
    },
    {
      imageUrl: "/images/ai_para_banner.png", // Update this with the correct image path
      title: "AI Paraphraser",
      description: "Effortlessly rephrase text to make it unique and clearer with AI-powered paraphrasing.",
      link: "/tools/ai-paraphraser",
      button_title: "Detect AI Content",
    },
    
   
  ];

  return (
    <main className="min-h-[500px]">
     
      <div className="mt-20"> 
        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
