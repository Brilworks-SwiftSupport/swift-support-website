"use client";
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Image from "next/image";

const UnlockFullPotential = () => {
  const data = [
    {
      title: "AI Automation",
      value: "ai-automation",
      iconSrc: "/images/robotic-process-automation 1 (1).svg",
      description:
        "Automate and optimize email workflows with intelligent responses.",
      subTitle: "Email Automations",
      problem: {
        label: "Problem :",
        issues: [
          {
            label: "Slow Response Times:",
            detail: "Critical issues take 2-4 hours, non-critical 4-8 hours.",
          },
          {
            label: "Manual Workload:",
            detail: "Support teams handle repetitive tasks.",
          },
        ],
      },
      solution: {
        label: "Solution :",
        detail: "Automate responses for up to 30% of emails.",
      },
      output: {
        label: "Output :",
        details: [
          {
            label: "Response Time:",
            detail: "<1 second for automated emails.",
          },
          {
            label: "Efficiency:",
            detail:
              "Reduces workload, allowing teams to focus on complex issues.",
          },
        ],
      },
      mainImageSrc: "/images/group-ai-automation.png",
    },
    {
      title: "AI Co-pilot",
      value: "ai-copilot",
      iconSrc: "/images/Microsoft_365_Copilot_Icon 1.svg",
      description:
        "Seamless access to vital information from any data source to support complex queries to field agents.",
      problem: {
        label: "Problem :",
        issues: [
          {
            label: "Slow Searches:",
            detail: "Agents take 15-30 minutes to find information.",
          },
          {
            label: "Data Silos:",
            detail: "Information scattered across systems.",
          },
        ],
      },
      solution: {
        label: "Solution :",
        detail: "AI searches multiple data sources in seconds.",
      },
      output: {
        label: "Output :",
        details: [
          {
            label: "Search Time: ",
            detail: "Reduced from 30 minutes to seconds.",
          },
          {
            label: "Productivity: ",
            detail: "Faster problem-solving, boosting agent efficiency.",
          },
        ],
      },
      mainImageSrc: "/images/group-ai-copilot.png",
    },
    {
      title: "AI Agent",
      value: "ai-agent",
      iconSrc: "/images/agents 1 (2).svg",
      description:
        "Connect with customers on their preferred platform with automated, AI-driven responses.",
      problem: {
        label: "Problem :",
        issues: [
          {
            label: "High Costs: ",
            detail:
              "Manual handling of customer inquiries requires more staff.",
          },
          {
            label: "Limited Availability: ",
            detail: "Human agents aren’t available 24/7.",
          },
        ],
      },
      solution: {
        label: "Solution :",
        detail: "AI handles routine queries via web chat and WhatsApp.",
      },
      output: {
        label: "Output :",
        details: [
          {
            label: "Cost Reduction: ",
            detail: "Save up to 66% in operational costs.",
          },
          {
            label: "Response Time: ",
            detail: "Instant replies across multiple platforms.",
          },
        ],
      },
      mainImageSrc: "/images/group-ai-agent.png",
    },
  ];
  return (
    <div className="md:py-[60px] py-10 h-full">
      <div
        className="container max-w-[1200px] mx-auto w-full h-full"
        id="unlock-full potential"
      >
        <h2 className="new-h2 !text-left w-full md:mx-auto lg:mb-[50px] md:mb-10 mb-6 px-4">
          Unlock the full potential of
          <br className="lg:block hidden" /> your Business with an AI Automation
        </h2>
        <Tabs
          value="ai-automation"
          id="custom-animation"
          orientation="horizontal"
          className="full-potential"
        >
          <TabsHeader className="!rounded-none border-y border-[#EDEDED] mb-[50px] md:flex-row flex-col md:px-0">
            {data.map(({ title, value, iconSrc }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2 md:text-[26px] text-[22px] leading-normal font-semibold text-colorBlack">
                  <Image src={iconSrc} width={46} height={46} alt="tab-icon" />
                  {title}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { x: 250 },
              mount: { x: 0 },
              unmount: { x: 250 },
            }}
          >
            {data.map(
              ({
                value,
                title,
                description,
                subTitle,
                problem,
                solution,
                output,
                mainImageSrc,
              }) => (
                <TabPanel key={value} value={value}>
                  <div className="flex gap-8 lg:flex-row flex-col items-center px-0">
                    <div className="lg:w-1/2 w-full flex flex-col">
                      <h3 className="lg:text-[26px] leading-tight text-[22spx] w-full text-colorBlack font-bold">
                        <span>
                          {title}
                          <div className="small-head-underline" />
                        </span>
                      </h3>
                      <p className="!text-base leading-tight text-colorBlack lg:mb-[30px] md:mb-7 mb-5">
                        {description}
                      </p>

                      <span className="text-xl font-medium text-colorBlack mb-5">
                        {subTitle}
                      </span>

                      <div className="flex flex-col gap-5">
                        <div className="border border-[#EDEDED] rounded-[10px] p-5 pr-8">
                          <p className="text-[#FF5454] font-semibold mb-4">
                            {problem.label}
                          </p>
                          {problem.issues.map((issue, idx) => (
                            <p
                              key={idx}
                              className="font-medium text-colorBlack mb-[10px] last:mb-0"
                            >
                              <span className="font-semibold text-base">
                                {issue.label}
                              </span>
                              {issue.detail}
                            </p>
                          ))}
                        </div>

                        <div className="border border-[#EDEDED] rounded-[10px] p-5 pr-8">
                          <p className="text-[#10B981] font-semibold mb-4">
                            {solution.label}
                          </p>
                          <p className="font-medium text-colorBlack">
                            {solution.detail}
                          </p>
                        </div>

                        <div className="border border-[#EDEDED] border-b-[#3B82F6] !border-b-2 rounded-[10px] p-5 pr-8 bg-[#F6F8FD]">
                          <p className="text-[#3B82F6] font-semibold mb-4">
                            {output.label}
                          </p>
                          {output.details.map((outputDetail, idx) => (
                            <p
                              key={idx}
                              className="font-medium text-colorBlack mb-[10px]"
                            >
                              <span className="font-semibold text-base">
                                {outputDetail.label}
                              </span>
                              {outputDetail.detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2 w-full h-full">
                      <Image
                        className="h-full !w-full"
                        src={mainImageSrc}
                        alt={title}
                        width="640"
                        height="639"
                      />
                    </div>
                  </div>
                </TabPanel>
              )
            )}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default UnlockFullPotential;
