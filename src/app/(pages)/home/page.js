"use client";
import React from "react";
import dynamic from "next/dynamic";
// import VideoSection from "../../components/Home/VideoSection";
import HeroSection from "@/app/components/Home/HeroSection";

const AIAutomateBusiness = dynamic(() =>
  import("@/app/components/Home/AIAutomateBusiness")
);
const AppIntegrationSection = dynamic(() =>
  import("@/app/components/Home/AppIntegrationSection")
);
const ImageWithGridSection = dynamic(() =>
  import("@/app/components/Home/ImageWithGridSection")
);
const WhySwiftSupport = dynamic(() =>
  import("@/app/components/Home/WhySwiftSupport")
);
const WhatPeopleSay = dynamic(() =>
  import("@/app/components/Home/WhatPeopleSay")
);
const HomepageCTA = dynamic(() => import("@/app/components/Home/HomepageCTA"));
const AIPoweredSolution = dynamic(() =>
  import("@/app/components/Home/AIPoweredSolution")
);
const PricingPlan = dynamic(() => import("../../components/Home/PricingPlan"));

const page = () => {
  return (
    <>
      {/* New Design */}
      <HeroSection />
      <AIAutomateBusiness />
      <ImageWithGridSection sectionName="Unlock Full Potential" />
      <HomepageCTA
        title={
          <>
            Automate Email Workflows with Lightning-Fast{" "}
            <br className="lg:block hidden" />
            AI Responses—Boost Efficiency Instantly! 
          </>
        }
        buttonLink="https://app.swiftsupport.ai/signup"
        buttonText="Start Free Trial"
      />
      <ImageWithGridSection sectionName="AI Copilot" />
      <HomepageCTA
        title={
          <>
            Elevate Your Email Campaigns with AI!{" "}
            <br className="lg:block hidden" />
            Let AI optimize your campaigns effortlessly.
          </>
        }
        buttonLink="https://app.swiftsupport.ai/signup"
        buttonText="Start Free Trial"
      />
      <ImageWithGridSection sectionName="AI Agent" />
      <HomepageCTA
        title={
          <>
            Empower Service Agents with Instant Access to
            <br className="lg:block hidden" /> Critical Data—Solve Queries
            Faster! Elevate Your Email
          </>
        }
        buttonLink="https://app.swiftsupport.ai/signup"
        buttonText="Start Free Trial"
      />
      <WhySwiftSupport />
      <AppIntegrationSection />
      <AIPoweredSolution />
      <WhatPeopleSay />
      <PricingPlan />
    </>
  );
};

export default page;
