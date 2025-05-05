import React from "react";
import ValuePropostion from "@/app/components/ValueProposition/ValueProposition";

export const metadata = {
  title: "Free Value Proposition Generator",
  description:
    "Use our free Value Proposition Generator to craft compelling product messages that connect with your audience instantly.",
  keywords:
    "value proposition generator, business value proposition, AI value proposition tool, brand positioning, unique selling proposition, AI marketing tools, free marketing copy generator, startup pitch generator, SaaS value proposition",
  openGraph: {
    title: "Free Value Proposition Generator",
    description:
      "Use our free Value Proposition Generator to craft compelling product messages that connect with your audience instantly.",
    images: [
      {
        url: "/diet-recommendation/images/diet_recommendation.svg",
        width: 1200,
        height: 630,
        alt: "AI Value Proposition Tool Preview",
      },
    ],
  },
};

function page() {
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <ValuePropostion />
      </div>
    </main>
  );
}

export default page;
