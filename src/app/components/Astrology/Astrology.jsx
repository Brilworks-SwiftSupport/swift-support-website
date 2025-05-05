"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import { FileText, Sun, MoonStar, Sparkles } from "lucide-react";
import Select from "react-select";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import star from "@/app/images/star.svg";
import personalizedRecommendation from "@/app/images/personalized_recommendation.svg";
import nutrientTracking from "@/app/images/nutrient_tracking.svg";
import customizablePortions from "@/app/images/customizable_portions.svg";
import tools from "@/app/images/tools.svg";

import { allCountries } from "country-region-data";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const AstrologyForm = ({ setApiResponse }) => {
  // Form state
  const [formData, setFormData] = useState({
    birth_date: new Date().toISOString().split("T")[0],
    birth_time: new Date().toTimeString().split(":").slice(0, 2).join(":"),
    birth_location: "Gujarat, India",
    birth_district: "Ahmedabad",
  });

  const getRegionOptions = () => {
    const options = [];
    allCountries.forEach(([countryName, countryCode, regions]) => {
      regions.forEach(([regionName]) => {
        options.push({
          label: `${regionName}, ${countryName}`,
          value: `${regionName}, ${countryName}`,
        });
      });
    });
    return options;
  };
  const regionOptions = getRegionOptions();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validate form data
  useEffect(() => {
    const validateForm = () => {
      const { birth_date, birth_time, birth_location, birth_district } =
        formData;

      const isValid =
        birth_date.trim() !== "" &&
        birth_time.trim() !== "" &&
        birth_district.trim() !== "" &&
        birth_location.trim() !== "";
      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData]);

  const handleSaveLocation = (option) => {
    setFormData((prevState) => ({
      ...prevState,
      [option.name]: option.value,
    }));
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    // Convert form data to API payload format
    const payload = {
      birth_date: formData.birth_date,
      birth_time: formData.birth_time,
      birth_location: `${formData.birth_district}, ${formData.birth_location}`,
    };

    try {
      setIsLoading(true);
      const response = await fetch(`${NEXT_PUBLIC_BE_URL}/astrology`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error generating astrology:", error);
      alert(
        "An error occurred while generating the astrology. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full mx-auto mt-2 p-6 border border-[#E4E4E4] rounded-3xl font-Urbanist">
        <form className="space-y-8">
          {/* Basic Info Section */}
          <div className="space-y-3">
            <span className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <span className="text-xl font-semibold">Basic Info</span>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-[16px] mb-2">Birth Date</label>
                <input
                  type="date"
                  name="birth_date"
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.birth_date}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Birth Date"
                />
              </div>
              <div>
                <label className="block text-[16px] mb-2">Birth Time</label>
                <input
                  type="time"
                  name="birth_time"
                  value={formData.birth_time}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Birth Time"
                />
              </div>
              <div>
                <label className="block text-[16px] mb-2">Birth District</label>
                <input
                  type="text"
                  name="birth_district"
                  value={formData.birth_district}
                  onChange={handleInputChange}
                  className="w-full h-[56px] px-4 py-2 border rounded-full text-[16px]"
                  placeholder="Enter Birth District"
                />
              </div>
              <div>
                <label className="block text-[16px] mb-2">Birth Location</label>
                <Select
                  options={regionOptions}
                  value={{
                    label: formData.birth_location,
                    value: formData.birth_location,
                  }}
                  onChange={(option) =>
                    handleSaveLocation({ name: "birth_location", ...option })
                  }
                  placeholder="Type a city or state"
                  isSearchable
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "9999px",
                      height: "56px",
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                      paddingTop: "0.5rem",
                      paddingBottom: "0.5rem",
                      fontSize: "16px",
                      borderColor: "#d1d5db",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#9ca3af",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      borderRadius: "0.5rem",
                      marginTop: "0.25rem",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 50,
                    }),
                  }}
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
          {isLoading ? "Loading..." : "Discover Your Astral Insights"}
        </button>
      </div>
    </>
  );
};

const AstrologyResponse = ({ apiResponse }) => {
  const {
    career_insights,
    future_predictions,
    relationship_insights,
    natal_chart,
  } = apiResponse.response;

  const icons = {
    star: (
      <svg className="w-6 h-6 fill-yellow-500" viewBox="0 0 24 24">
        <path d="M12 2l2.9 6.6L22 9.3l-5 4.9 1.2 7L12 17.8 5.8 21.2 7 14.3 2 9.3l7.1-0.7L12 2z" />
      </svg>
    ),
    insight: (
      <svg
        className="w-5 h-5 stroke-blue-700"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18h6m-6 3h6M10 14a4 4 0 1 1 4 0v1h-4v-1z" />
        <path d="M12 2a7 7 0 0 1 7 7c0 3-1.5 4.5-2.5 5.5S14 17 14 18h-4c0-1-1-2-2.5-3.5S5 12 5 9a7 7 0 0 1 7-7z" />
      </svg>
    ),
    warning: (
      <svg
        className="w-5 h-5 stroke-red-600"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.3 2.3L1.2 20a1.5 1.5 0 0 0 1.3 2.2h19a1.5 1.5 0 0 0 1.3-2.2L13.7 2.3a1.5 1.5 0 0 0-2.6 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <circle cx="12" cy="17" r="1" />
      </svg>
    ),
    career: (
      <svg
        className="w-5 h-5 stroke-green-600"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14H3V6h18z" />
        <path d="M16 10h-8v4h8v-4z" />
      </svg>
    ),
    future: (
      <svg
        className="w-5 h-5 stroke-purple-600"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="10" r="6" />
        <path d="M6 20h12M4 17h16" />
      </svg>
    ),
    compatibility: (
      <svg
        className="w-5 h-5 stroke-pink-500"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    ),
    natal_chart: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="48" stroke="#8e44ad" stroke-width="2" />
        <circle cx="50" cy="50" r="10" stroke="#8e44ad" stroke-width="2" />
        <g stroke="#8e44ad" stroke-width="1">
          <line x1="50" y1="2" x2="50" y2="18" />
          <line x1="50" y1="82" x2="50" y2="98" />
          <line x1="2" y1="50" x2="18" y2="50" />
          <line x1="82" y1="50" x2="98" y2="50" />
          <line x1="19" y1="19" x2="31" y2="31" />
          <line x1="69" y1="69" x2="81" y2="81" />
          <line x1="19" y1="81" x2="31" y2="69" />
          <line x1="69" y1="31" x2="81" y2="19" />
          <line x1="2" y1="50" x2="98" y2="50" opacity="0.2" />
          <line x1="50" y1="2" x2="50" y2="98" opacity="0.2" />
          <line x1="10" y1="10" x2="90" y2="90" opacity="0.2" />
          <line x1="10" y1="90" x2="90" y2="10" opacity="0.2" />
        </g>
      </svg>
    ),
    sun_sign: (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="10"
          y1="60"
          x2="90"
          y2="60"
          stroke="#f39c12"
          stroke-width="2"
        />
        <path d="M30 60 A20 20 0 0 1 70 60" fill="#f1c40f" />
        <g stroke="#f39c12" stroke-width="1.5">
          <line x1="50" y1="30" x2="50" y2="20" />
          <line x1="38" y1="35" x2="32" y2="28" />
          <line x1="62" y1="35" x2="68" y2="28" />
          <line x1="50" y1="40" x2="50" y2="35" />
        </g>
      </svg>
    ),
  };

  const data = [
    {
      label: "Natal Chart",
      value: "natal",
      icon: icons.natal_chart,
      content: (
        <div className="mt-6 space-y-6">
          {/* Sun, Moon, Rising */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-2xl shadow-sm">
              <div className="text-pink-800 text-sm font-medium flex gap-2">
                <Sun className="w-5 h-5 text-pink-700" /> <p>Sun Sign</p>
              </div>
              <div className="text-lg font-semibold text-[#212121] flex items-center gap-2">
                {natal_chart?.sun_sign}
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-4 rounded-2xl shadow-sm">
              <div className="text-yellow-800 text-sm font-medium flex gap-2">
                <MoonStar className="w-5 h-5 text-yellow-700" />{" "}
                <p>Moon Sign</p>
              </div>
              <div className="text-lg font-semibold text-[#212121] flex items-center gap-2">
                <span className="italic text-gray-600">
                  {natal_chart?.moon_sign}
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-4 rounded-2xl shadow-sm">
              <div className="text-indigo-800 text-sm font-medium flex gap-2">
                <Sparkles className="w-5 h-5 text-indigo-700" />
                <p>Rising Sign</p>
              </div>
              <div className="text-lg font-semibold text-[#212121] flex items-center gap-2">
                <span className="italic text-gray-600">
                  {natal_chart?.rising_sign}
                </span>
              </div>
            </div>
          </div>

          {/* Planetary Positions */}
          <div>
            <div className="flex items-center gap-2 text-blue-700 text-lg mb-2">
              {icons.insight}
              <span>Planetary Positions</span>
            </div>
            <ul className="bg-white p-4 rounded-2xl border border-[#E4E4E4] space-y-2">
              {Object.entries(natal_chart.planetary_positions).map(
                ([planet, position], idx) => (
                  <li key={idx} className="text-base text-[#212121]">
                    <div className="font-medium">{planet}</div>
                    <div className="text-gray-600">{position}</div>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      ),
    },
    {
      label: "Career",
      value: "career",
      icon: icons.career,
      content: (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-blue-700 text-lg">
            {icons.insight}
            <span>Strengths</span>
          </div>
          <div className="text-base">{career_insights?.strengths}</div>

          <div className="flex items-center gap-2 text-blue-700 text-lg mt-4">
            {icons.warning}
            <span>Challenges</span>
          </div>
          <div className="text-base">{career_insights?.challenges}</div>

          <div className="text-blue-700 text-lg mt-4 flex items-center gap-2">
            {icons.career}
            <span>Suggested Career Paths</span>
          </div>
          <ul className="list-disc ml-6 text-base text-[#212121] mt-2">
            {career_insights?.suggested_paths?.map((path, idx) => (
              <li key={idx}>{path}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: "Future",
      value: "future",
      icon: icons.future,
      content: (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-blue-700 text-lg">
            {icons.future}
            <span>Next 6 Months</span>
          </div>
          <div className="text-base italic">
            {future_predictions?.next_6_months}
          </div>

          <div className="flex items-center gap-2 text-blue-700 text-lg mt-4">
            {icons.insight}
            <span>Major Transits</span>
          </div>
          <ul className="list-disc ml-6 text-base text-[#212121] mt-2">
            {future_predictions?.opportunities?.map((path, idx) => (
              <li key={idx}>{path}</li>
            ))}
          </ul>

          <div className="text-blue-700 text-lg mt-4 flex items-center gap-2">
            {icons.insight}
            <span>Challenges</span>
          </div>
          <ul className="list-disc ml-6 text-base text-[#212121] mt-2">
            {future_predictions?.challenges?.map((path, idx) => (
              <li key={idx}>{path}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      label: "Compatibility",
      value: "compatibility",
      icon: icons.compatibility,
      content: (
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-blue-700 text-lg">
            {icons.compatibility}
            <span>Advice</span>
          </div>
          <div className="text-base">{relationship_insights?.advice}</div>

          <div className="text-blue-700 text-lg mt-4 flex items-center gap-2">
            {icons.insight}
            <span>Patterns</span>
          </div>
          <div className="text-base italic">
            {relationship_insights?.patterns}
          </div>

          <div className="text-blue-700 text-lg mt-4 flex items-center gap-2">
            {icons.insight}
            <span>Compatibility</span>
          </div>
          <div className="text-base italic">
            {relationship_insights?.compatibility}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full mx-auto mt-12 p-6 border border-[#E4E4E4] rounded-3xl font-Urbanist">
      <div className="flex items-center gap-3">
        {icons.star}
        <span className="text-xl font-semibold text-[#212121]">
          Astrology Insights
        </span>
      </div>

      <Tabs value="natal" className="mt-6">
        <TabsHeader
          className="bg-transparent border-b border-[#E4E4E4] rounded-none flex xs:flex-row flex-col"
          indicatorProps={{
            className:
              "bg-gradient-to-r from-[#FF8585] via-[#56D5FF] to-[#DCD536] h-[3px]",
          }}
        >
          {data.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className="text-lg text-[#212121] font-medium"
            >
              <div className="flex items-center gap-2">
                {icon}
                {label}
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
          {data.map(({ value, content }) => (
            <TabPanel key={value} value={value}>
              {content}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

const Astrology = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const features = [
    {
      icon: personalizedRecommendation,
      title: "Personalized Cosmic Blueprint",
      description:
        "Generate your full birth chart based on your exact birth details — and see how every planet shapes your path.",
    },
    {
      icon: nutrientTracking,
      title: "Life Insights That Hit Home",
      description:
        "From job changes to relationship shifts, get tailored predictions for what’s coming next — and how to navigate it.",
    },
    {
      icon: customizablePortions,
      title: "Instant, Private & Judgment-Free",
      description:
        "No waiting. No awkward questions. Just real answers from AI that gets you — delivered in seconds.",
    },
  ];

  const faqItems = [
    {
      question: "How accurate is the AI Astrology tool?",
      answer:
        "It uses accurate astrological data combined with AI interpretation to give reliable and personalized results.",
    },
    {
      question: "Do I need to provide my exact birth time and place?",
      answer:
        "Yes, for the most accurate predictions, your birth time, date, and location are essential.",
    },
    {
      question: "What areas of life does it cover?",
      answer:
        "It provides insights into relationships, career, personality traits, life path, and more.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, our AI Astrology Tool is completely free—no signup, no payment required.",
    },
    {
      question: "Can I use it without astrology knowledge?",
      answer:
        "Absolutely. The tool translates complex astrology into simple, easy-to-understand insights.",
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
            Unlock your cosmic self with
          </span>{" "}
          <span className="inline-block md:mb-1">
            <span className="relative inline-block mb-2 md:mb-6">
              our AI Astrology
              <div className="absolute left-0 banner-underline md:!mt-3 !w-[200px] md:!w-[450px] !max-w-none"></div>{" "}
            </span>{" "}
            Tool.
          </span>
        </h1>
        {/* Subtitle */}
        <p className="relative text-center text-[#212121] font-urbanist font-medium text-sm sm:text-base md:text-[24px] px-4">
          Discover your unique birth chart and rising sign with insights written
          in the stars.
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
              img={star}
              name={"AI Astrology"}
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

        <AstrologyForm setApiResponse={setApiResponse} />
        {apiResponse && <AstrologyResponse apiResponse={apiResponse} />}

        {/* Content Section */}
        <DetailSection
          title="Discover What the Stars Say About You"
          description="Uncover insights about your future, career, relationships, and more with our AI-powered Astrology Tool. Just enter your birth date, time, and location to receive personalized astrological predictions. Whether you're seeking clarity or just curious, let the cosmos guide your journey with tailored insights based on your unique birth chart."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does AI Astrology Work?"
          explanation={[
            "Our AI Astrology Tool uses advanced algorithms and real-time astrological data to generate accurate readings. After you enter your birth time, date, and place, the AI creates a personalized natal chart and interprets key elements like your sun sign, moon sign, rising sign, and planetary placements.",
            "These are then translated into meaningful insights about your personality, relationships, career, and life path. Whether you're seeking clarity or simply curious, the tool offers quick, reliable, and customized astrology reports—no appointments needed.",
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

export default Astrology;
