"use client";
import React from "react";
import InstantSolution from "../components/Home/InstantSolution";
import dynamic from "next/dynamic";

const VideoSection = dynamic(() => import("../components/Home/VideoSection"));
const TrustedBy = dynamic(() => import("../components/Home/TrustedBy"));
const IndustriesWeServe = dynamic(() =>
  import("../components/Home/IndustriesWeServe")
);
const ManageDataSource = dynamic(() =>
  import("../components/Home/ManageDataSource")
);
const ImmediateAns = dynamic(() => import("../components/Home/ImmediateAns"));
const CustomizeExperience = dynamic(() =>
  import("../components/Home/CustomizeExperience")
);
const OptimizeAndDataStorage = dynamic(() =>
  import("../components/Home/OptimizeAndDataStorage")
);
const ReadyToStartChatting = dynamic(() =>
  import("../components/Home/ReadyToStartChatting")
);
const PeopleSaying = dynamic(() => import("../components/Home/PeopleSaying"));
const ResolveCustomerQuestions = dynamic(() =>
  import("../components/Home/ResolveCustomerQuestions")
);
const OpenForConversation = dynamic(() =>
  import("../components/Home/OpenForConversation")
);
const PricingPlan = dynamic(() => import("../components/Home/PricingPlan"));

const page = () => {
  return (
    <>
      <InstantSolution />
      <div className="bg_one">
        <VideoSection />
        <TrustedBy />
        <IndustriesWeServe />
        <ManageDataSource />
      </div>
      <ImmediateAns />
      <div className="bg_two">
        <CustomizeExperience />
        <OptimizeAndDataStorage />
        <ReadyToStartChatting />
        <PeopleSaying />
        <ResolveCustomerQuestions />
      </div>
      <div className="bg_one">
        <OpenForConversation />
        <PricingPlan />
      </div>
    </>
  );
};

export default page;
