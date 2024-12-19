import AiParaphraser from "@/app/components/AiParaphraser/AiParaphraser";
import React from "react";

export const metadata = {
  title: "Free AI Paraphraser for Clear and Concise Rewriting",
  description:
    "Rephrase your content seamlessly using our AI Paraphraser tool for clearer, more readable text.",
  keywords:
    "AI paraphraser, content rephrasing, rephrase text, AI rewriter, paraphrasing tool, improve writing, text rewriting, paraphrasing AI, clear and concise writing, AI writing assistant",
  openGraph: {
    title: "Free AI Paraphraser for Clear and Concise Rewriting",
    description:
      "Rephrase your content seamlessly using our AI Paraphraser tool for clearer, more readable text.",
    images: [
      {
        url: "/ai-paraphraser/images/ai_para_banner.png",
        width: 1200,
        height: 630,
        alt: "AI Paraphraser tool",
      },
    ],
  },
};

const fetchAllParaphrase = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  const response = await fetch(
    `${NEXT_PUBLIC_BE_URL}/content_tools?type=paraphrase`,
    { method: "GET" }
  );

  const data = await response.json();
  return data.content_tools.map((item) => ({
    text: item.text,
    paraphrased_content: item.paraphrased_content,
  }));
};

export default async function Page() {
  const paraphrase = await fetchAllParaphrase();
  return (
    <main className="mb-10">
      <div className="mt-20 max-w-[1200px] w-full mx-auto px-4">
        <AiParaphraser allParaphraseInfo={paraphrase} />
      </div>
    </main>
  );
}
