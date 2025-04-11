import React from "react";
import Astrology from "@/app/components/Astrology/Astrology";

export const metadata = {
  title: "Free AI Astrology Tool to Unlock Your Cosmic Self",
  description:
    "Discover your unique birth chart and rising sign with insights written in the stars. Personalized astrology powered by AI.",
  keywords:
    "AI astrology tool, birth chart generator, rising sign, natal chart, personalized astrology, free astrology tool, zodiac, horoscope, star chart, cosmic insights, astrology app",
  openGraph: {
    title: "Free AI Astrology Tool to Unlock Your Cosmic Self",
    description:
      "Discover your unique birth chart and rising sign with insights written in the stars. Personalized astrology powered by AI.",
    images: [
      {
        url: "/diet-recommendation/images/diet_recommendation.svg",
        width: 1200,
        height: 630,
        alt: "AI Astrology Tool Preview",
      },
    ],
  },
};

function page() {
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <Astrology />
      </div>
    </main>
  );
}

export default page;
