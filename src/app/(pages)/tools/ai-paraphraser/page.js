import AiParaphraser from "@/app/components/AiParaphraser/AiParaphraser";
import React from "react";


const fetchAllParaphrase = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  console.log(NEXT_PUBLIC_BE_URL)

  const response = await fetch(`${NEXT_PUBLIC_BE_URL}/content_tools?type=paraphrase`, {method:"GET"});

  const data = await response.json();

  return data.content_tools.map((item) => ({
    text:item.text,
    paraphrased_content:item.paraphrased_content
  }));
};
export default async function Page()  {

  const paraphrase = await fetchAllParaphrase();

  return (
    <main className="mb-10">
      <div className="mt-20 max-w-[1200px] w-full mx-auto px-4">
        <AiParaphraser allParaphraseInfo={paraphrase}/>
      </div>
    </main>
  );
};

