"use client";
import React from "react";
import InstantSolution from "../../components/Home/InstantSolution";
// import VideoSection from "../../components/Home/VideoSection";
import dynamic from "next/dynamic";

const TrustedBy = dynamic(() => import("../../components/Home/TrustedBy"));
const AppIntegrationSection = dynamic(() =>
  import("@/app/components/Home/AppIntegrationSection")
);
const IndustriesWeServe = dynamic(() =>
  import("../../components/Home/IndustriesWeServe")
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
      <InstantSolution />
      <div className="bg_one">
        <AppIntegrationSection />
        {/* <VideoSection /> */}
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
      </div>
    </>
  );
};

export default page;
