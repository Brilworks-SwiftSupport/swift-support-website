"use client";
import React from "react";
// import InstantSolution from "../../components/Home/InstantSolution";
// import VideoSection from "../../components/Home/VideoSection";
import dynamic from "next/dynamic";
import HeroSection from "@/app/components/Home/HeroSection";
import HomepageCTA from "@/app/components/Home/HomepageCTA";
import AIPoweredSolution from "@/app/components/Home/AIPoweredSolution";
import WhatPeopleSay from "@/app/components/Home/WhatPeopleSay";
import WhySwiftSupport from "@/app/components/Home/WhySwiftSupport";

const AIAutomateBusiness = dynamic(() =>
  import("@/app/components/Home/AIAutomateBusiness")
);
const AppIntegrationSection = dynamic(() =>
  import("@/app/components/Home/AppIntegrationSection")
);
const ImageWithGridSection = dynamic(() =>
  import("@/app/components/Home/ImageWithGridSection")
);
const HelpBusinesses = dynamic(() =>
  import("@/app/components/Home/HelpBusinesses")
);
const ManageDataSource = dynamic(() =>
  import("../../components/Home/ManageDataSource")
);
const FrictionlessAndFuturistic = dynamic(() =>
  import("../../components/Home/FrictionlessAndFuturistic")
);
const CustomizeExperience = dynamic(() =>
  import("../../components/Home/CustomizeExperience")
);
const OptimizeAndDataStorage = dynamic(() =>
  import("../../components/Home/OptimizeAndDataStorage")
);
const ExperienceAIBuild = dynamic(() =>
  import("../../components/Home/ExperienceAIBuild")
);
const PeopleSaying = dynamic(() =>
  import("../../components/Home/PeopleSaying")
);
const ResolveCustomerQuestions = dynamic(() =>
  import("../../components/Home/ResolveCustomerQuestions")
);
const SwiftIntegration = dynamic(() =>
  import("../../components/Home/SwiftIntegration")
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
        buttonLink="#"
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
        buttonLink="#"
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
        buttonLink="#"
        buttonText="Start Free Trial"
      />
      <WhySwiftSupport />
      <AppIntegrationSection />
      <AIPoweredSolution />
      <WhatPeopleSay />

      {/* Old Design */}
      {/* <InstantSolution />
      <AppIntegrationSection />
      <div className="bg_one">
        <VideoSection />
        <TrustedBy />
        <IndustriesWeServe />
        <HelpBusinesses />
        <ManageDataSource />
      </div>
      <FrictionlessAndFuturistic />
      <div className="bg_two">
        <CustomizeExperience />
        <OptimizeAndDataStorage />
        <ExperienceAIBuild />
        <PeopleSaying />
        <ResolveCustomerQuestions />
      </div>
      <div className="bg_one">
        <SwiftIntegration />
        <PricingPlan />
      </div> */}
      <PricingPlan />
    </>
  );
};

export default page;
