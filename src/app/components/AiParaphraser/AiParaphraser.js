"use client";
import React, { useState,useEffect } from "react";
import freeForever from "@/app/images/freeForever.svg";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import para from "@/app/images/para.svg"
import doc from "@/app/images/doc.svg"
import search from "@/app/images/search.svg"
import tools from "@/app/images/tools.svg"

import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import rewrite from "@/app/images/rewrites.svg";
import file from "@/app/images/file.svg";
import pencil from "@/app/images/pencil.svg"
import close from '@/app/images/cross.svg';

const NEXT_PUBLIC_BE_URL= process.env.NEXT_PUBLIC_BE_URL

const Paraphrase = () => {
  const [inputText, setInputText] = useState(""); // Text input state
  const [text, setText] = useState(""); // State to store paraphrased text
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allParaphraseInfo, setParaphraseInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ text: "", paraphrased: "" });
  const [showAll, setShowAll] = useState(false); // State to control showing all cards
  const wordLimit = 2000; // Set the word limit
  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; // Count words
  const [activeFAQ, setActiveFAQ] = useState(null);


  const [isCopied, setIsCopied] = useState(false);

  const features = [
    {
      icon: pencil,
      title: "Enhance Your Writing",
      description:
        "Improve clarity, tone, and readability by rephrasing your content without changing its original meaning.",
    },
    {
      icon: file,
      title: "Preserve Original Context",
      description:
        "Rewrites content while maintaining its original message and intent, ensuring consistency across various types of text.",
    },
    {
      icon: rewrite,
      title: "Instant Rewrites",
      description:
        "Save time with fast, AI-driven rephrasing that delivers results in seconds, perfect for tight deadlines or multiple drafts.",
    },
  ];

  const faqItems = [
    {
      question: "How do I use the AI Paraphraser?​",
      answer:
        "Simply input your text into the tool, and let the AI generate a rephrased version within seconds.",
    },
    {
      question: "Does the AI Paraphraser maintain the original meaning?​ ",
      answer:
        "Absolutely! The tool rephrases your content while preserving the original intent and context, ensuring clarity and accuracy.",
    },
    {
      question: "Can I use the tool for professional documents?​​",
      answer:
        "Yes, the AI Paraphraser is suitable for professional documents, articles, and even academic content, providing polished and well-structured outputs.",
    },
    {
      question: "Is there any payment required?​",
      answer:
        "No, you don’t need to provide any credit card details or make payments. The AI Paraphraser is completely free to use.",
    },
    {
      question: "Do I need to create an account to use the tool?​",
      answer:
        "No, there’s no need to create an account or log in. You can start paraphrasing your text instantly without any registration process.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);  
    setIsCopied(true); // Change icon to right mark
    toast.success("Text copied to clipboard!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
     // Optional: Reset the icon after some time
     setTimeout(() => setIsCopied(false), 3000);
  };


  useEffect(() => {
    const fetchAllParaphrase = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_BE_URL}/content_tools?type=paraphrase`);
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        if (isModalOpen) {
          // Prevent background scrolling
          document.body.style.overflow = "hidden";
        } else {
          // Restore background scrolling
          document.body.style.overflow = "auto";
        }
        if (data && Array.isArray(data.content_tools)) {
          setParaphraseInfo(data.content_tools);
        } else {
          console.error(
            "API response does not contain 'content_tools':",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching all content_tools:", error);
      }
      return () => {
        document.body.style.overflow = "auto";
      };
    };

    fetchAllParaphrase();
  }, [isModalOpen]);


  const fetchPlagiarismCheck = async (input_text, type) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BE_URL}/rephrase_text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_text, type }), // Include the type in the request
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      return data; // Ensure this matches the field returned by your API
    } catch (err) {
      console.error("Fetch error:", err); // Log the error for debugging
      throw new Error(err.message || "Something went wrong");
    }
  };
  const handleKnowMore = (data) => {
    setModalContent({
      text: data.text,
      paraphrased: data.paraphrased_content, // Assuming paraphrased content is in `data.paraphrased`
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ text: "", paraphrased: "" });
  };

  // Handle form submission
  const handleSubmit = async (e, type) => {
    e.preventDefault();

    // Set inputText to the API response when type is "regenerate"
    const textToSend = type === "regenerate" ? text : inputText;

    if (!textToSend.trim()) {
      alert("Please provide valid input text!");
      return;
    }
    if (wordCount < 10) {
      // setError("Please provide at least 10 words to proceed!");
      toast.error("Input must contain at least 10 words!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return; // Stop execution if validation fails

    }
    setLoading(true);
    setError(""); // Reset error state before calling API

    try {
      const data = await fetchPlagiarismCheck(textToSend, type);
      setText(data.text); // Update the paraphrased text
      if (type === "regenerate") {
        // setInputText(data.text); // Update the input text with the regenerated response
      }
    } catch (err) {
      setError(err.message); // Display error if API call fails
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  const handleInputChange = (e) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0); // Split input into words
    if (words.length <= wordLimit) {
      setInputText(e.target.value); // Allow input if word count is within the limit
    }
  };

  return (
    <main className="flex mt-32 justify-center px-4 mb-32">
      <div className="container mx-auto max-w-6xl">
          <Image 
            className="mx-auto w-auto h-auto mb-3" 
            src={freeForever} 
            alt="free-forever" 
            width={300} 
            height={100}
          />
        {/* Title Section */}
        <div>
          <p className="text-center text-3xl md:text-5xl font-bold mb-5 font-Urbanist">
            Rephrase with Ease – Free AI Paraphrasing Tool.
          </p>
          <div
            className="hidden md:block"
            style={{
              width: "450px",
              height: "10px",
              background:
                "linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #FFFFFF 87.5%)",
              marginLeft: "630px",
              marginRight: "auto",
            }}
          ></div>
          <p className="text-center text-gray-600 b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px] flex-grow">
            Use our free{" "}
            <span className="bg-clip-text text-transparent bg-text-theme-gradient">
              AI tool to Paraphrase{" "}
            </span>{" "}
            text effortlessly, ensuring originality and clarity every time.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2 mt-6 md:mt-11 overflow-x-auto">
            <div className="flex flex-col md:flex-row flex-wrap gap-0">
              <NavigationButton width={"w-[181px]"} img={para} href={""} name={"Paraphrasing Tool"} bgColor={'#FFFEEE'}/>
              <NavigationButton width={"w-[181px]"} img={doc} href={"/tools/plagiarism-checker/"} name={"Plagiarism Checker"} bgColor={'#FFFFFF'}/>
              <NavigationButton width={"w-[181px]"} img={search} href={"/tools/ai-content-detector/"} name={"AI Content Detector"} bgColor={'#FFFFFF'}/>
              <NavigationButton width={"w-[181px] md:w-auto"} img={tools} href={"/tools/"} name={"Other AI Tools"} bgColor={'#FFFFFF'}/>
            </div>
            <div className="hidden md:flex flex-wrap gap-4">
              <p className="text-[#3B82F6] font-bold whitespace-nowrap ml-20 font-Urbanist text-2xl">Paraphrased Content</p>
            </div>
          </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8 mt-2 font-Urbanist text-base">
          <div className="relative flex-grow w-full md:w-[503px] h-[396px] md:h-[396px]">
            <textarea
              name="content"
              id="content"
              placeholder="Paste your content here to paraphrase..."
              className="w-full h-full py-3 px-4 text-gray-800 bg-white shadow-sm outline-none rounded-[20px] text-left leading-tight border border-[#E4E4E4] resize-none"
              value={inputText}
              onChange={handleInputChange}
              required
            />
            <span
              className="absolute text-gray-600 text-sm bg-[#F1F5F9] px-2 py-1 rounded-lg shadow"
              style={{ bottom: '10px', right: '10px' }}
            >
              {wordCount} of {wordLimit} words used
            </span>
          </div>
          <div className="w-full md:w-[530px] h-[396px] bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4 relative">
            {text && (
              <>
                <p className="text-gray-800 font-normal overflow-y-auto pr-10">{text}</p>
                <button
                  className="absolute top-4 right-4 bg-transparent p-2"
                  onClick={handleCopy}
                  aria-label="Copy text"
                >
                  <img
                    src={isCopied ? "/images/check.png" : "/images/Copy.png"}
                    alt={isCopied ? "Copied" : "Copy"}
                    className="w-6 h-6"
                  />
                </button>
                <button
                  className="absolute bottom-4 right-4 bg-transparent p-2"
                  onClick={(e) => handleSubmit(e, 'regenerate')}
                  aria-label="Regenerate text"
                >
                  <img
                    src="/images/Regenerate.png"
                    alt="Regenerate"
                    className="w-6 h-6"
                  />
                </button>
              </>
            )}
            <ToastContainer/>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={(e) => handleSubmit(e, 'common')}
            disabled={loading || !inputText.trim()}
            className={`!px-4 mr-2 py-5 common-button header-btn ${
              loading || !inputText.trim()
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {loading ? "Checking..." : "Paraphrase"}
          </button>
        </div>
        <div>
      <h2 className="text-center text-3xl md:text-5xl font-semibold mb-3 font-Urbanist mt-14 flex-wrap">
        Previously Paraphrased Text
      </h2>
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allParaphraseInfo
            .slice(0, showAll ? allParaphraseInfo.length : 3)
            .map((data, index) => (
              <div
                key={index}
                className="w-[360px] h-[243px] bg-white flex-col rounded-[20px] border border-[#E4E4E4] p-4 flex-wrap md:ml-4 -ml-4" 
              >
                <div className="w-auto h-40 text-black text-base px-3 py-1 rounded-t mb-2 md:justify-center">
                  <span className="font-semibold font-Urbanist text-[24px]">
                    Text:{" "}
                  </span>
                  <div></div>
                  <span className="font-Urbanist text-[16px]">
                    {data.text.split(/\s+/).slice(0, 15).join(" ")}
                    {data.text.split(/\s+/).length > 15 ? "..." : ""}
                  </span>
                </div>
                <button
                  className="mb-6 common-button header-btn w-[320px] h-[40px] flex-wrap"
                  onClick={() => handleKnowMore(data)}
                >
                  Know More
                </button>
              </div>
            ))}
        </div>

        
        {allParaphraseInfo.length > 3 && (
          <div className="ml-auto mr-auto text-center mt-4 common-button header-btn w-[200px] h-[40px]">
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
   
      </div>

      {/* Modal */}
      {isModalOpen && (
      <div className="fixed inset-0 bg-[#00000024] backdrop-blur flex items-center justify-center z-[100000000]">
        <div className="bg-white rounded-3xl shadow-lg w-[380px] max-h-[80%] overflow-hidden md:w-[1000px]">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-6 py-4">
            <h3 className="text-xl font-bold">Details</h3>
            <button
                onClick={closeModal}
              >
                <Image src={close} alt="Close" className="w-10 md:w-12 h-10 md:h-12 object-contain" />
              </button>
          </div>

          {/* Scrollable content */}
          <div className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-auto md:w-1/2 h-auto bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4">
                <p className="font-bold">Original Text:</p>
                <p className="text-gray-800">{modalContent.text}</p>
              </div>
              <div className="w-auto md:w-1/2 h-auto bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4">
                <p className="font-bold">Paraphrased Content:</p>
                <p className="text-gray-800">{modalContent.paraphrased}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    </div>
    <DetailSection
          title="Perfect Your Content with AI Paraphraser"
          description="Refine your writing effortlessly with our AI Paraphraser. Whether you're polishing professional documents, simplifying complex sentences, or enhancing your content's readability, this tool transforms your text into clear, concise, and engaging language—quickly and accurately."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does the AI Paraphraser Work?"
          explanation={[
            "The AI Paraphraser leverages advanced Natural Language Processing (NLP) algorithms to rewrite text effectively while maintaining its original context. When you input text, the tool analyzes the structure, vocabulary, and tone, then generates a rephrased version tailored to your needs.",
            "Using deep learning techniques, the AI ensures that the rephrased content is fluent, grammatically correct, and natural-sounding. Whether you’re refining an article, rewriting sentences, or enhancing academic content, the tool offers high-quality paraphrasing in real time, saving you hours of manual effort.",
          ]}
        />
        <FAQSection
          faqItems={faqItems}
          activeFAQ={activeFAQ}
          toggleFAQ={toggleFAQ}
        />

    <ToastContainer />

      </div>
    </main>
  );
};

export default Paraphrase;