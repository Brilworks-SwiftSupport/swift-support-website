import ChatPDF from "@/app/components/ChatPDF/ChatPDF";
import React from "react";

export const metadata = {
  title: "Free Document Assistant tool for Q&A",
  description:
    "Upload and interact with your documents using our AI-powered Talk with Document tool for instant answers.",
  keywords:
    "document assistant, AI-powered tool, Q&A tool, upload documents, document interaction, talk with documents, instant answers, AI for documents",
  openGraph: {
    title: "Free Document Assistant tool for Q&A",
    description:
      "Upload and interact with your documents using our AI-powered Talk with Document tool for instant answers.",
    images: [
      {
        url: "/chat-pdf/images/chatpdf.svg",
        width: 1200,
        height: 630,
        alt: "Talk with Document tool",
      },
    ],
  },
};

const page = () => {
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <ChatPDF />
      </div>
    </main>
  );
};

export default page;
