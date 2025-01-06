import DietRecommendation from "@/app/components/DietRecommendation/DietRecommendation";
import React from "react";

export const metadata = {
  title: "Free AI Diet Recommendation Tool for Your Health",
  description:
    "Get tailored diet plans with our free AI Diet Recommendation Tool. Achieve your health goals with personalized, AI-driven meal suggestions.",
  keywords:
    "AI diet recommendation, diet plan, personalized diet, health goals, meal suggestions, free diet tool, healthy eating, fitness, nutrition, weight loss, weight gain, vegetarian diet, nutrition plan, health and wellness",
  openGraph: {
    title: "Free AI Diet Recommendation Tool for Your Health",
    description:
      "Get tailored diet plans with our free AI Diet Recommendation Tool. Achieve your health goals with personalized, AI-driven meal suggestions.",
    images: [
      {
        url: "/diet-recommendation/images/diet_recommendation.svg",
        width: 1200,
        height: 630,
        alt: "Diet Recommendation Tool",
      },
    ],
  },
};

const page = () => {
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <DietRecommendation />
      </div>
    </main>
  );
};

export default page;
