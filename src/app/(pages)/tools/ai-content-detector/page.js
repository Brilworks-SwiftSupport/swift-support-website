import AiContentDetector from "@/app/components/AiContentDetector/AiContentDetector";
import React from "react";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const fetchAllContent = async () => {


  const response = await fetch(`${NEXT_PUBLIC_BE_URL}/content_tools?type=ai_content`,{method:"GET"});

  const data = await response.json();
  console.log(data)
  return data.content_tools.map((item) => ({
    text: item.text,
    ai_generated: item.ai_generated,
    human_written : item.human_written
  }));
};
export default async function Page()  {

  const all_content = await fetchAllContent();
  
  
  return (

    <main className="mb-10">
      <div className="mt-20">
        <AiContentDetector allContentInfo={all_content}/>

      </div>
    </main>
  );
};

