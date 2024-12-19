"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Document, Packer, Paragraph } from "docx";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import freeForever from "@/app/images/freeForever.svg"
import shape from "@/app/images/shape.svg"
import HandleText from "../Tools/HandleText";
import close from "@/app/images/cross.svg"

import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import rewrite from "@/app/images/rewrites.svg";
import file from "@/app/images/file.svg";
import pencil from "@/app/images/pencil.svg"
import "react-toastify/dist/ReactToastify.css";



const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;


const BlogGenerator = ({allContentInfo = []}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tone, setTone] = useState("");
  const [keywords, setKeywords] = useState("");
  const [keywordList, setKeywordList] = useState([]); // Stores the list of keywords
  const [loading, setLoading] = useState(false);
  const [docContent, setDocContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ text: "", image_url: "" });
  const [docUrl, setDocUrl] = useState(null);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [showAll, setShowAll] = useState(false); // State to control showing all cards
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isCopied, setIsCopied] = useState(false);


  console.log(allContentInfo)

  const features = [
    {
      icon: pencil,
      title: "Customizable Content",
      description:
        "Define your blog's tone, keywords, and word limit to align with your goals and target audience.",
    },
    {
      icon: file,
      title: "Precision-Driven Output",
      description:
        "Input your title and document description to generate content that perfectly fits your requirements.",
    },
    {
      icon: rewrite,
      title: "Optimized for SEO",
      description:
        "Incorporate your chosen keywords seamlessly to ensure your blogs rank higher in search engine results.",
    },
  ];

  const faqItems = [
    {
      question: "How do I create a blog using this tool?​",
      answer:
        "Simply input your text into the tool, and let the AI generate version within seconds.",
    },
    {
      question: "Can I choose a specific tone for my blog?​ ",
      answer:
        "Absolutely! The tool creates the blog content while preserving the original intent and context, ensuring clarity and accuracy.",
    },
    {
      question: "Is there any payment required to use the AI Blog Generator?​​",
      answer:
      "No, you don’t need to provide any credit card details or make payments. The AI Blogs is completely free to use.",
    },
    {
      question: "Do I need to create an account?​",
      answer:
        "No, you don’t need to create any account. The AI Blogs is completely free to use.",
    },
    {
      question: "Can I generate SEO-friendly content?​",
      answer:
        "Absolutely! By adding your keywords, the AI ensures they are naturally integrated into the content for better search engine visibility.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);  
    setIsCopied(true); // Change icon to right mark
     setTimeout(() => setIsCopied(false), 3000);
  };


  const predefinedTones = ["Friendly", "Professional", "Casual"];

  const handleGenerateBlog = async () => {
    if (!title) {
      alert("Please provide both title and description.");
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        `${NEXT_PUBLIC_BE_URL}/blog_creation`,
        {
          title: title,
          description: description,
          tone: tone,
          keywords: keywords,
          wordlimit: wordlimit,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      setDocContent(response.data.text)
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({ text: title, heading: "Heading1" }),
              new Paragraph({ image: response.data.image_url }),
              new Paragraph({ text: response.data.text }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc); // Convert doc to Blob
      const url = URL.createObjectURL(blob); // Create Object URL
      const text = response.data.text
      setText(text);
      const image = response.data.image_url
      setImage(image)
      setDocUrl(url); // Save URL for preview and download
    } catch (error) {
      console.error("Error generating document:", error);
      alert("Failed to generate the document. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && keywords.trim()) {
      // Add the current keyword to the list
      setKeywordList((prev) => [...prev, keywords.trim()]);
      setKeywords(""); // Clear the input box
    }
  };

  const removeKeyword = (indexToRemove) => {
    setKeywordList((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleToneClick = (selectedTone) => {
    setTone(selectedTone);
  };

  const [wordlimit, setWordlimit] = useState(500); // Default value
  const minLimit = 500; // Minimum value for slider
  const maxLimit = 2000; // Maximum value for slider
  const step = 10; // Step value for smoother dragging

  const handleSliderChange = (e) => {
    setWordlimit(e.target.value);
  };

  const handleKnowMore = (data) => {
    setModalContent({
      text: data.text,
      image_url: data.image_url, // Assuming paraphrased content is in `data.paraphrased`
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ text: "", image_url: "" });
  };

  const formatTextWithImage = (text, image) => {
    // Find the position of the first newline
    const firstNewlineIndex = text.indexOf("<br/>");

    // Function to apply formatting
    const applyFormatting = (textToFormat) => {
      return textToFormat
        .replace(/(\*\*)(.*?)\1/g, '<strong>$2</strong>') // Bold text using **bold**
        .replace(/^(#{1,6})\s(.*)$/gm, (match, p1, p2) => {
          const level = p1.length; // Determine heading level based on the number of #
          return `<h${level} style="text-align: center; font-size: ${level}em;"><strong>${p2}</strong></h${level}>`;
        })
        .replace(/\n/g, '<br />'); // Replace newlines with <br />
    };

    if (firstNewlineIndex !== -1) {
      // Split text into two parts: before and after the first newline
      const beforeNewline = text.slice(0, firstNewlineIndex);
      const afterNewline = text.slice(firstNewlineIndex);

      // Add the image before the first newline
      const textWithImage = `
        ${beforeNewline}
        <img src="${image}" alt="Example" />         
        ${afterNewline}
      `;

      // Return formatted text
      return applyFormatting(textWithImage);
    }

    // If no newline exists, just format the entire text
    return applyFormatting(text);
  };

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        if (isModalOpen) {
          // Prevent background scrolling
          document.body.style.overflow = "hidden";
        } else {
          // Restore background scrolling
          document.body.style.overflow = "auto";
        }


      } catch (error) {
        console.error("Error fetching all content_tools:", error);
      }
      return () => {
        document.body.style.overflow = "auto";
      };
    };

    fetchAllBlogs();
  }, [isModalOpen]);

  const handleChange = (e) => {
    const input = e.target.value;
    const wordCount = input.trim().split(/\s+/).length;

    if (wordCount > 20) {
      toast.error("Word limit exceeded! Maximum 50 words allowed.",{
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    } else {
      setTitle(input);
    }
  };

  const handleDes = (e) => {
    const input = e.target.value;
    const wordCount = input.trim().split(/\s+/).length;

    if (wordCount > 250) {
      toast.error("Word limit exceeded! Maximum 250 words allowed.",{
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    } else {
      setDescription(input);
    }
  };


  return (
    <main className="flex mt-16 md:mt-32 justify-center px-2 md:px-4 mb-16 md:mb-32">
      <div className="container mx-auto max-w-6xl">
        <Image
          className="mx-auto w-auto h-auto mb-3"
          src={freeForever}
          alt="free-forever"
          width={300}
          height={100}
        />

        {/* Title Section - Updated for better mobile responsiveness */}
        <div className="px-4 md:px-0">
          <p className="hidden md:block text-center text-3xl md:text-5xl font-bold md:mb-2 mb-2 w-full max-w-[90%] mx-auto font-Urbanist">
            Your Blog, Your Voice, AI Precision.
          </p>
          <p className="md:hidden text-center text-3xl font-bold w-full max-w-[90%] mx-auto font-Urbanist">
            Elevate Writing
          </p>
          <p className="md:hidden text-center text-3xl font-bold w-full max-w-[90%] mx-auto font-Urbanist">
            AI Blog Tool
          </p>
          <div className="w-[100px] h-[10px] mx-auto md:w-[502px] bg-[linear-gradient(90deg,_#D8EA9A_0%,_#AFE5CA_25.5%,_#FBB8B8_62.5%,_#FFFFFF_87.5%)]"></div>
          <p className="text-center text-gray-600 w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-base md:text-2xl flex-grow mb-5">
            Effortless Blogging, Powered by<span className="bg-clip-text text-transparent bg-text-theme-gradient"> AI</span>
          </p>
        </div>

        {/* Form Section - Updated for better mobile responsiveness */}
        <div className="mb-6 w-[390px] md:w-[1200px] h-auto md:h-[600px] bg-white flex flex-col justify-start rounded-[30px] items-center border border-[#E4E4E4] pt-6 px-4 md:px-6">
          {/* Title Input */}
          <div className="w-full">
            <label htmlFor="doc" className="block text-gray-700 font-medium mb-1">
              Enter blog title
            </label>
            <input
              id="doc"
              type="text"
              placeholder="Enter document title"
              value={title}
              onChange={handleChange}
              className="w-full md:w-[1160px] mb-4 px-4 py-3 text-gray-800 shadow-sm border border-[#E4E4E4] rounded-[30px] mt-1.5 bg-transparent outline-none"
            />
            <ToastContainer />
          </div>
          <div className="w-full">
            <label htmlFor="tone" className="block text-gray-700 font-medium ">
              Select Tone
            </label>
            <div className="flex gap-3 mb-4 ml-3">
              {predefinedTones.map((item, index) => (
                <div
                  key={index}
                  className={`inline-block rounded-full md:p-[2px] p-[1px] text-[10px] md:text-[16px] ${tone === item
                      ? "bg-gradient-to-r from-[#FF8585] via-[#56D5FF] to-[#DCD536]"
                      : ""
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => handleToneClick(item)}
                    className={`md:px-4 px-2 py-2 rounded-full md:w-full md:h-full w-[70px]  ${tone === item
                        ? "bg-[#FFFEEE] text-black"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords Input */}
          <div className="w-full">
            <label htmlFor="keywords" className="block text-gray-700 font-medium mb-2">
              Enter Keywords
            </label>
            <div
              className="w-full md:w-[1160px] mb-4 px-4 py-3 shadow-sm rounded-[30px] flex flex-wrap items-center gap-2 cursor-text border border-[#E4E4E4]"
              onClick={() => document.getElementById("keywords").focus()}
            >
              {keywordList.map((word, index) => (
                <span
                  key={index}
                  className="flex items-center bg-black text-white px-3 py-1 rounded-full text-sm md:text-base"
                >
                  {word}
                  <button
                    onClick={() => removeKeyword(index)}
                    className="ml-2 text-white hover:text-gray-300"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                id="keywords"
                type="text"
                placeholder="Enter keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow bg-transparent outline-none text-gray-800 py-1 text-sm md:text-base"
              />
            </div>
          </div>

          {/* Word Limit Slider */}
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-medium mb-4">
              Select Word Limit
            </label>
            <div className="relative md:w-[1080px] ml-5 mr-3 ">
              {/* Word Limit Display */}
              <div
                className="absolute text-gray-700 font-medium "
                style={{
                  left: `calc(${((wordlimit - minLimit) / (maxLimit - minLimit)) * 100
                    }% - 20px)`, // Adjust position dynamically
                  top: "-20px", // Position above the slider
                  transform: "translateX(37%)", // Center the value
                }}
              >
                {wordlimit}
              </div>
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                step={step}
                value={wordlimit}
                onChange={handleSliderChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer border border-#E4E4E4"
                style={{
                  background: `linear-gradient(90deg, #D8EA9A 0%, #AFE5CA ${((wordlimit - minLimit) / (maxLimit - minLimit)) * 25.5}%, #FBB8B8 ${((wordlimit - minLimit) / (maxLimit - minLimit)) * 62.5}%, #FFFFFF ${((wordlimit - minLimit) / (maxLimit - minLimit)) * 87.5}%)`,
                }}
              />
              {/* Dynamic Thumb Styling */}
              <style jsx>{`
                input[type="range"]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  background: #ff8585; /* Custom color */
                  border-radius: 50%;
                  cursor: pointer;
                  border: 2px solid #fff; /* Optional border for visibility */
                }

                input[type="range"]::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  background: #ff8585; /* Custom color for Firefox */
                  border-radius: 50%;
                  cursor: pointer;
                  border: 2px solid #fff; /* Optional border for visibility */
                }

                input[type="range"]::-ms-thumb {
                  width: 20px;
                  height: 20px;
                  background: #ff8585; /* Custom color for IE/Edge */
                  border-radius: 50%;
                  cursor: pointer;
                  border: 2px solid #fff; /* Optional border for visibility */
                }
              `}</style>
            </div>
          </div>

          {/* Description Textarea */}
          <div className="w-full">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Enter description
            </label>
            <textarea
              id="description"
              placeholder="Enter Document Description"
              value={description}
              onChange={handleDes}
              className="w-full md:w-[1160px] h-40 px-4 py-3 text-gray-800 shadow-sm border border-[#E4E4E4] rounded-[30px] mb-4 resize-none bg-transparent outline-none"
            />
            <ToastContainer />
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center md:justify-start">
          <button
            onClick={handleGenerateBlog}
            className={`px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300 mt-4 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Blog"}
          </button>
        </div>

        

        {/* Document Editor */}
        {(docUrl && text) && (
  <div className="mb-6 px-4 md:px-0">
    <div className="relative">
      {text && (
        <div
          contentEditable
          className="w-full min-h-[200px] px-4 py-3 text-black bg-gray-100 shadow-sm outline-none rounded-[20px] mb-4 mt-3 overflow-auto relative"
          dangerouslySetInnerHTML={{
            __html: (() => {
              // Find the position of the first newline
              const firstNewlineIndex = text.indexOf("\n");

              // Helper function to format the text
              const formatText = (rawText) =>
                rawText
                  .replace(/(\*\*)(.*?)\1/g, '<strong>$2</strong>') // Bold text using **bold**
                  .replace(/^(#{1,6})\s(.*)$/gm, (match, p1, p2) => {
                    const level = p1.length; // Determine heading level based on the number of #
                    return `<h${level} style="text-align: center; font-size: ${
                      level
                    }em;"><strong>${p2}</strong></h${level}>`;
                  })
                  .replace(/\n/g, "<br />"); // Replace newlines with <br />

              if (firstNewlineIndex !== -1) {
                // Split the text into two parts: before and after the first newline
                const beforeNewline = text.slice(0, firstNewlineIndex);
                const afterNewline = text.slice(firstNewlineIndex);

                // Add the image before the first newline text
                const textWithImage = `${beforeNewline}<img src="${image}" alt="Example" style="max-width: 50%; height: auto; display: block; margin: 10px auto;" />${afterNewline}`;

                // Format the updated text
                return formatText(textWithImage);
              } else {
                // Format the text directly if no newline is found
                return formatText(text);
              }
            })(),
          }}
        />
      )}
      {/* Copy button inside the contentEditable container */}
      <button
        className="absolute top-1 right-1 bg-transparent p-2"
        onClick={handleCopy}
        aria-label="Copy text"
        style={{ zIndex: 1 }}
      >
        <img
          src={isCopied ? "/images/check.png" : "/images/Copy.png"}
          alt={isCopied ? "Copied" : "Copy"}
          className="w-6 h-6"
        />
      </button>
    </div>
  </div>
)}


        {/* Previous Blogs Section */}
<div className="mt-14">
  <h2 className="text-center text-3xl md:text-5xl font-semibold mb-8 font-Urbanist">
    Previous Blogs
  </h2>
  <div className="px-4 md:px-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allContentInfo
        .slice(0, showAll ? allContentInfo.length : 3)
        .map((data, index) => (
          <div
            key={index}
            className="w-full md:w-[360px] h-auto bg-white rounded-[20px] border border-[#E4E4E4] p-4"
          >
            <div className="text-black text-base px-3 py-1 rounded-t mb-2">
              <div className="text-center">
                <img
                  src={data.image_url}
                  alt="Blog"
                  className="w-full h-auto mx-auto mb-4"
                />
                <span className="font-semibold font-Urbanist text-xl md:text-2xl">
                  {data.title}
                </span>
              </div>
              <div className="mt-4">
                <div className="font-Urbanist font-bold text-base md:text-xl">
                  Description
                </div>
                <div className="text-sm md:text-base font-Urbanist mb-4">
                  <HandleText text={data.description} type="" />
                </div>
              </div>
            </div>
            <button
              className="w-full h-10 mt-4 common-button header-btn"
              onClick={() => handleKnowMore(data)}
            >
              Know More
            </button>
          </div>
        ))}
    </div>

    {allContentInfo && allContentInfo.length > 3 && (
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowAll(!showAll)}
          className="common-button header-btn w-[200px] h-[40px]"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    )}
  </div>
</div>

{/* Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black/25 backdrop-blur flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-3xl shadow-lg w-full max-w-[1000px] max-h-[80vh] overflow-hidden">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <h3 className="text-xl font-bold">Details</h3>
        <button onClick={closeModal}>
          <Image src={close} alt="Close" className="w-8 md:w-12 h-8 md:h-12 object-contain" />
        </button>
      </div>
      <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
        <div className="bg-white rounded-[20px] border border-[#E4E4E4] p-4">
          <p className="font-bold mb-4">Original Text:</p>
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{
              __html: formatTextWithImage(modalContent.text, modalContent.image_url)
            }}
          />
        </div>
      </div>
    </div>
  </div>
)}
<DetailSection
          title="Streamline Your Blog Writing Process"
          description="Transform your ideas into compelling blogs effortlessly with our AI Blog Generator. Whether you're a content creator, marketer, or business professional, this tool helps you craft high-quality, engaging blogs tailored to your specific needs. Save time and focus on what matters most—your audience."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does the AI Blog Generator Work?"
          explanation={[
            "The AI Blog Generator leverages advanced Natural Language Processing (NLP) and deep learning algorithms to produce professional-grade blog content. Start by entering a blog title, specifying the tone you want (e.g., formal, conversational, persuasive), and providing a brief description of your desired content.",
            "Add keywords to ensure SEO optimization and set a word limit if needed. The AI processes your input, creating well-structured and contextually relevant blog content that matches your vision. Whether you need a concise article or an in-depth post, this tool delivers exceptional results in moments.",
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

export default BlogGenerator;