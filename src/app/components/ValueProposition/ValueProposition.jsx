"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import { FileText, Sparkles, Target, AlignLeft } from "lucide-react";

import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import valuePropostion from "@/app/images/business-value-proposition-icon.svg";
import personalizedRecommendation from "@/app/images/personalized_recommendation.svg";
import nutrientTracking from "@/app/images/nutrient_tracking.svg";
import customizablePortions from "@/app/images/customizable_portions.svg";
import tools from "@/app/images/tools.svg";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const ValuePropositionForm = ({ setApiResponse }) => {
  const [formData, setFormData] = useState({
    product_name: "",
    target_audience: "",
    pain_point: "",
    features: "",
    usp: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const isValid = Object.values(formData).every((val) => val.trim() !== "");
      setIsFormValid(isValid);
    };
    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setIsLoading(true);
      const response = await fetch(
        `${NEXT_PUBLIC_BE_URL}/generate_value_proposition`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error generating value proposition:", error);
      alert(
        "An error occurred while generating the value proposition. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mx-auto mt-2 p-6 border border-[#E4E4E4] rounded-3xl font-Urbanist">
        <form className="space-y-8">
          {/* Product Info Section */}
          <div className="space-y-3">
            <span className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <span className="text-xl font-semibold">Product Details</span>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-[16px] mb-2">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Product Name"
                />
              </div>
              <div>
                <label className="block text-[16px] mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  name="target_audience"
                  value={formData.target_audience}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Target Audience"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[16px] mb-2">Pain Point</label>
                <input
                  type="text"
                  name="pain_point"
                  value={formData.pain_point}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="What problem are you solving?"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[16px] mb-2">Features</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="List the key features"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[16px] mb-2">
                  Unique Selling Proposition (USP)
                </label>
                <input
                  type="text"
                  name="usp"
                  value={formData.usp}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="What makes your product stand out?"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full mt-6 flex justify-center">
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full md:w-[28%] h-auto p-2 text-white text-base md:text-xl font-bold rounded-full ${
            isFormValid
              ? "bg-black hover:bg-gray-600 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Generating..." : "Generate Value Proposition"}
        </button>
      </div>
    </>
  );
};

const ValuePropositionResponse = ({ apiResponse }) => {
  console.log("object", apiResponse);
  const { short_version, long_version, targeted_version } =
    apiResponse.response;

  const Section = ({ icon, title, content, color }) => (
    <div
      className={`border-l-4 ${color} pl-4 py-4 bg-white rounded-xl shadow-sm`}
    >
      <div className="flex items-center gap-2 mb-2 text-[#212121] font-semibold text-lg">
        {icon}
        <span>{title}</span>
      </div>
      <p className="text-[#4B4B4B] text-base leading-relaxed">{content}</p>
    </div>
  );

  return (
    <div className="w-full mx-auto mt-8 space-y-6 p-6 border border-[#E4E4E4] rounded-3xl font-Urbanist bg-gray-50">
      <div className="flex items-center gap-3 mb-4">
        <Sparkles className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-[#212121]">
          Value Proposition Summary
        </h2>
      </div>

      <Section
        icon={<AlignLeft className="text-blue-600 w-5 h-5" />}
        title="Short Version"
        content={short_version}
        color="border-blue-500"
      />

      <Section
        icon={<Sparkles className="text-green-600 w-5 h-5" />}
        title="Long Version"
        content={long_version}
        color="border-green-500"
      />

      <Section
        icon={<Target className="text-purple-600 w-5 h-5" />}
        title="Targeted Version"
        content={targeted_version}
        color="border-purple-500"
      />
    </div>
  );
};

const ValuePropostion = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const features = [
    {
      icon: personalizedRecommendation,
      title: "AI-Generated Value Propositions",
      description:
        "Instantly get concise, high-impact statements tailored to your business and audience.",
    },
    {
      icon: nutrientTracking,
      title: "Built for Startups & Marketers",
      description:
        "Whether you’re pitching investors, building landing pages, or crafting social ads, this tool makes your message crystal clear.",
    },
    {
      icon: customizablePortions,
      title: "Customizable Outputs",
      description:
        "Get suggestions you can tweak and refine based on your style or platform.",
    },
  ];

  const faqItems = [
    {
      question: "What is a value proposition?",
      answer:
        "It’s a short, powerful statement that explains why your product is valuable, who it’s for, and what makes it unique.",
    },
    {
      question: "Who should use this tool?",
      answer:
        "Startup founders, marketers, product managers—anyone needing clear messaging to attract and convert users.",
    },
    {
      question: "Can I generate more than one version?",
      answer:
        "Yes! You can tweak your inputs and generate as many variations as you like.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, the Business Value Proposition Tool is 100% free. No sign-ups, no credit cards.",
    },
    {
      question: "How do I use the output?",
      answer:
        "Use it for your website, pitch decks, emails, investor docs, or wherever you need to communicate value fast.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <main className="mt-12 md:mt-32">
      <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent mb-32">
        <Image
          className="mx-auto w-auto h-auto"
          src={freeForever}
          alt="free-forever"
          width={300}
          height={100}
        />
        {/* Title Section */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-[54px] font-urbanist font-bold leading-[1.2] mb-4 mt-6 md:mt-12">
          <span className="inline-block md:mb-6">
            Shape Your Brand Story with
          </span>{" "}
          <span className="inline-block md:mb-1">
            <span className="relative inline-block mb-2 md:mb-6">
              Value Proposition Generator
              <div className="absolute left-0 banner-underline md:!mt-3 !w-[200px] md:!w-[450px] !max-w-none"></div>{" "}
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-center text-[#212121] font-urbanist font-medium text-sm sm:text-base md:text-[24px] px-4">
          Generate powerful value propositions that highlight your product’s
          unique impact.
        </p>
        {/* Tools List */}
        <div className="flex flex-wrap gap-4 mt-[30px] md:mt-[56px] md:ml-12 px-4 md:px-0">
          <div className="flex items-center justify-center flex-wrap gap-2 md:-ml-8">
            <NavigationButton
              width={"w-auto"}
              img={textToVoice}
              href={"/tools/text-to-voice/"}
              name={"AI Text to Voice"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-auto"}
              img={voiceToText}
              href={"/tools/voice-to-text/"}
              name={"AI Voice to Text"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-auto"}
              img={imgGenerator}
              href={"/tools/image-generator/"}
              name={"AI Image Generator"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-auto"}
              img={valuePropostion}
              name={"Business Value Proposition Generator"}
              bgColor={"#FFFEEE"}
            />
            <NavigationButton
              width={"w-auto"}
              img={tools}
              href={"/tools/"}
              name={"Other AI Tools"}
              bgColor={"#FFFFFF"}
            />
          </div>
        </div>

        <ValuePropositionForm setApiResponse={setApiResponse} />
        {apiResponse && <ValuePropositionResponse apiResponse={apiResponse} />}

        {/* Content Section */}
        <DetailSection
          title="Craft Meaningful Value Propositions That Truly Resonate"
          description="You know your product can make a difference—now it’s time to say it right. Our AI-powered tool helps you create clear, compelling value propositions tailored to your audience."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does It Work?"
          explanation={[
            "Start by entering the product name, who it's for, the pain point you’re solving, a list of key features, and your unique selling proposition. The AI will analyze the inputs and generate a professional value proposition that highlights why your product matters. Perfect for startups, entrepreneurs, and marketers who want to stand out—without the guesswork.",
          ]}
        />
        <FAQSection
          faqItems={faqItems}
          activeFAQ={activeFAQ}
          toggleFAQ={toggleFAQ}
        />
      </div>
    </main>
  );
};

export default ValuePropostion;
