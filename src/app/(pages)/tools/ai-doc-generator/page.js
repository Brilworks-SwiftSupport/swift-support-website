import DocGenerator from "@/app/components/DocGenerator/DocGenerator";
import React from "react";
import axios from "axios";

export const metadata = {
  title: "Free AI Document Generator: Create Documents Within Seconds",
  description:
    "Create well-written documents effortlessly with our AI Document Generator tool based on your description.",
  keywords:
    "AI document generator, document creation, AI content generator, create documents with AI, document writing tool, text generator, generate documents, AI writing assistant, document maker, create custom documents, AI-powered document generator",
  openGraph: {
    title: "Free AI Document Generator: Create Documents Within Seconds",
    description:
      "Create well-written documents effortlessly with our AI Document Generator tool based on your description.",
    images: [
      {
        url: "/ai-doc-generator/images/doc_generator.svg",
        width: 1200,
        height: 630,
        alt: "AI Content Detector tool",
      },
    ],
  },
};

const fetchAllDocs = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;
  const queryParam = "doc";

  try {
    const response = await axios.get(
      `${NEXT_PUBLIC_BE_URL}/stt_tts_data`, {
        params: {
          type: queryParam
        }
      }
    );
    
    return response.data.data_list.map((item) => ({
      text: item.text,
      doc_url: item.file_url,
      description: item.description,
    }));
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
};

export default async function Page() {
  const all_docs = await fetchAllDocs();
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <DocGenerator DocRecords={all_docs} />
      </div>
    </main>
  );
}