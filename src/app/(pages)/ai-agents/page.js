import { AIAgents } from "@/app/components/AIAgents/AIAgents";
import React from "react";


export const metadata = {
  title: "Free AI Agents – No Login, No Credit Card Required",
  description:
    "Explore a suite of free AI Agents, including financial ai agent, and more.",
  keywords:
    "free AI agents, Financial AI Agent, AI Agents, AI tools, AI chatbots, AI assistants, AI-powered agents, AI-powered chatbots, AI-powered assistants, free AI chatbots, free AI assistants",
  openGraph: {
    title: "Free AI Agents – No Login, No Credit Card Required",
    description:
      "Explore a suite of free AI Agents, including financial ai agent, and more.",
  },
};

const page = () => {
  const agents = [
    {
      imageUrl: "/images/ai-agents/financial-agent.svg",
      title: "Financial AI Agent",
      description:
        "Get financial insights, manage expenses, and plan budgets with ease.",
      link: "/ai-agents/financial-ai-agent",
      button_title: "Manage Your Finances with AI",
    },
    {
      imageUrl: "/images/ai-agents/financial-agent.svg",
      title: "Product Requirements Document Agent",
      description:
        "Product Requirements Document Agent",
      link: "/ai-agents/prd-ai-agent",
      button_title: "Generate Your Product Requirements Document",
    },
    {
      imageUrl: "/images/ai-agents/financial-agent.svg",
      title: "Product Requirements Document Agent v1",
      description:
        "Product Requirements Document Agent",
      link: "/ai-agents/prd-ai-agent-1",
      button_title: "Generate Your Product Requirements Document",
    },

  ];

  return (
    <main className="min-h-screen">
      <div className="mt-10">
        <div className="container mx-auto py-8 px-4 ">
          <h1 className="text-center text-[54px] font-urbanist font-bold leading-[72px] mt-20 mb-10">
            <span>Explore our</span>{" "}
            <span className="relative inline-block mb-2">
              AI Agents
              <div className="absolute left-0 -bottom-1 banner-underline !max-w-none"></div>
            </span>
          </h1>
          <div className="flex items-center rounded-md justify-center gap-16 flex-wrap mx-auto mb-20">
            {agents.map((tool, index) => (
              <AIAgents
                key={index}
                imageUrl={tool.imageUrl}
                title={tool.title}
                description={tool.description}
                link={tool.link}
                button_title={tool.button_title}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
