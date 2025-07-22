"use client";
import React from "react";
import dynamic from "next/dynamic";
// import VideoSection from "../../components/Home/VideoSection";
import HeroSection from "@/app/components/Home/HeroSection";
import UnlockFullPotential from "@/app/components/Home/UnlockFullPotential";

const BeforeAndAfterSection = dynamic(() =>
  import("@/app/components/Home/BeforeAndAfterSection")
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
      <UnlockFullPotential />
      {/* <ImageWithGridSection sectionName="Unlock Full Potential" /> */}
      <HomepageCTA
        title={
          <>
            Automate Email Workflows and Enhance Engagement with Instant,{" "}
            <br className="lg:block hidden" /> AI-Driven Responses Across All
            Platforms!
          </>
        }
        buttonLink="/contact/"
        buttonText="Start Free Trial"
      />
      <AppIntegrationSection />
      <BeforeAndAfterSection />
      {/* <ImageWithGridSection sectionName="AI Copilot" /> */}
      {/* <HomepageCTA
        title={
          <>
            Empower Service Agents with Instant Access
            <br className="lg:block hidden" /> to Critical Data—Solve Queries
            Faster!
          </>
        }
        buttonLink="https://app.swiftsupport.ai/signup"
        buttonText="Start Free Trial"
      /> */}
      {/* <ImageWithGridSection sectionName="AI Agent" /> */}
      {/* <HomepageCTA
        title={
          <>
            Enhance Customer Engagement with Real-Time,
            <br className="lg:block hidden" /> AI-Driven Responses—On Any
            Platform!
          </>
        }
        buttonLink="https://app.swiftsupport.ai/signup"
        buttonText="Start Free Trial"
      /> */}
      {/* <WhySwiftSupport /> */}

      <AIPoweredSolution />
      <WhatPeopleSay />
      <PricingPlan />
    </>
  );
};

export default page;
