import FinancialAgent from "@/app/components/AIAgents/FinancialAgent/FinancialAgent";
import React from "react";

export const metadata = {
  title: "Financial AI Agent – Financial Insights and Assistance",
  description:
    "Engage with our Financial AI Agent for real-time insights, personalized financial advice, expense tracking, budget planning, and investment guidance. Chat with ease and make informed decisions.",
  keywords:
    "financial AI agent, AI financial assistant, real-time financial insights, budget planning tool, expense tracker, investment guidance, personal finance management, AI financial chatbot, financial advice online, AI finance tools",
  openGraph: {
    title: "Financial AI Agent – Financial Insights and Assistance",
    description:
      "Engage with our Financial AI Agent for real-time insights, personalized financial advice, expense tracking, budget planning, and investment guidance. Chat with ease and make informed decisions.",
    url: "https://swiftsupport.com/ai-agents/financial-ai-agent",
  },
} ;

export default async function Page() {

  return (
    <main className="mb-10">
      <div className="mt-10">
        <FinancialAgent />
      </div>
    </main>
  );
}
