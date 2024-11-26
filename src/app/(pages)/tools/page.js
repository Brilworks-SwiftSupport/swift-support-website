
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
