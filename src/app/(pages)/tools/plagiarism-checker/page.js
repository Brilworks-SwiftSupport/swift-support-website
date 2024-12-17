import Plagiarism from "@/app/components/Plagiarism/Plagiarism";
import React from "react";


const fetchAllPlagiarsim = async () => {

  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  const response = await fetch(`${NEXT_PUBLIC_BE_URL}/content_tools?type=plagiarism`, {method:"GET"});

  const data = await response.json();
  return data.content_tools.map((item) => ({
    text: item.text,
    plagiarised_content: item.plagiarised_content,
    source_links : item.source_links,
    plagiarism_percentage : item.plagiarism_percentage,
  }));
};
export default async function Page() {
  const all_plagiarsim = await fetchAllPlagiarsim();
  return (
    <main className="mb-10">
      <div className="mt-20 max-w-[1200px] w-full mx-auto px-4">
        <Plagiarism allPlagiarismInfo={all_plagiarsim}/>
      </div>
    </main>
  );
};

