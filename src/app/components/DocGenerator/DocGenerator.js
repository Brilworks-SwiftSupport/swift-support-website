"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import axios from "axios";
import freeForever from "@/app/images/freeForever.svg";
import Image from "next/image";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import tools from "@/app/images/tools.svg";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import instantTextGeneration from "@/app/images/instant_text_generation.svg";
import vesaltileContentGeneration from "@/app/images/versaltile_content_generation.svg";

import userFriendly from "@/app/images/user_friendly.svg";
import { headers } from "../../../../next.config";
const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const DocViewer = dynamic(() => import("react-doc-viewer"), { ssr: false });

const DocPreview = ({ s3Url,Size = { height: '100px', width: '25%' } }) => {
    const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(s3Url)}&embedded=true`;
  
    return (
      <div style={{ height: '100vh', overflow: 'auto' }}>
        <iframe
          title="google doc"
          src={googleDocsViewerUrl}
          height={ Size.height}
          width={ Size.width}
          style={{ border: 'none' }}
          
        >
        </iframe>
      </div>
    );
  };




const DocGenerator = ({DocRecords=[]}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [docContent, setDocContent] = useState("");
  const [docUrl, setDocUrl] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // Initial 6 items for a 3x2 grid
  const [canClick, setCanClick] = useState(true); 
  const wordLimit = 500; // Set the word limit
  const wordCount = title.trim().split(/\s+/).filter(Boolean).length; // Count words
  const [activeFAQ, setActiveFAQ] = useState(null);
  const displayFullDoc = {
    height: '100%',  // Set your dynamic height
    width: '100%',     // Set your dynamic width
  };
  const features = [
    {
      icon: instantTextGeneration,
      title: "Instant Text Creation",
      description:
        "Generate high-quality text-based documents in seconds by providing just a topic or brief description.",
    },
    {
      icon: vesaltileContentGeneration,
      title: "Versatile Content Generation",
      description:
        "Create content for various purposes, such as blogs, reports, or personal projects, tailored to your needs.",
    },
    {
      icon: userFriendly,
      title: "User-Friendly Interface",
      description:
        "Experience an intuitive design that makes document creation straightforward and hassle-free.",
    },
  ];

  const faqItems = [
    {
      question: "How do I create a document using this tool?",
      answer:
        "To generate a document, simply type a title and description of the document you want. The AI will then process your input and create an document based on your text.",
    },
    {
      question: "How long does it take to generate a document?",
      answer:
        "The document is typically generated within seconds. The tool uses powerful AI models to process your title and description and produce high-quality text almost instantly quickly.",
    },
    {
      question: "Can I download the document I generate?",
      answer:
        "Yes, once the document is generated, you can download it.",
    },
    {
      question: "Is there any payment required?",
      answer:
        "No, you do not need to provide any credit card details or make any payments. Our AI Document Generator is completely free to use with no hidden charges.",
    },
    {
      question: "Do I need to create an account to use the tool?",
      answer:
        "No, there is no need to create an account or log in. You can start using the AI Document Generator immediately without any registration process.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };
  
  const handleInputChange = (e) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
    if (words.length <= wordLimit) {
      setTitle(e.target.value);
    }
  };
  const handleGenerateDocument = async () => {
    if (!title) {
      alert("Please provide both title and description.");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        `${NEXT_PUBLIC_BE_URL}/generate_document`,
        {
          text: title,
          description: description,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setDocUrl(data.doc_url)
    
    } catch (error) {
      console.error("Error generating document:", error);
      alert("Failed to generate the document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (url) => {
    try {
      // Fetch the file from the S3 URL
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Convert the response to a Blob
      const blob = await response.blob();
  
      // Create a temporary download link
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
  
      // Extract file name from URL or set a default
      const fileName = url.split("/").pop() || "document-file";
      link.download = fileName;
  
      // Trigger the download
      link.click();
  
      // Clean up the temporary link
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Failed to download document:", error);
    }
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
          <span>Effortless  Creation with AI. </span>
         
        </h1>

        <p className="relative text-center text-[#212121] font-urbanist font-medium text-sm sm:text-base md:text-[24px] mt-6 md:mt-10 px-4">
            Just Describe It, We'll{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
          Write
          </span>{" "}
          It!.{" "}
        </p>

        <div className="flex flex-wrap gap-4 mt-[30px] md:mt-[56px] md:ml-12 px-4 md:px-0">
          <div className="flex items-center justify-center flex-wrap gap-2 md:-ml-8">
            <NavigationButton
              width={"w-auto"}
              img={textToVoice}
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
              img={voiceToText}
              name={"AI Document Generator"}
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

        <div className="border border-gray-300 rounded-md mt-5 p-4 max-w-[100%] mx-auto mb-4">
          
          
          <div className="mb-3 mt-3">
            <p className="mb-2">Title:</p>
            <textarea
              name="title"
              id="title"
              placeholder="Enter your title here ..."
              className="w-[100%] h-[50px] py-3 px-4 text-gray-800 bg-white shadow-sm outline-none rounded-[20px] text-left leading-tight border border-[#E4E4E4] resize-none mb-4"
              value={title}
              onChange={handleInputChange} 
              required
            />
          </div>
         
         

          <div className="md:relative flex items-center justify-center p-4  md:mt-0 max-w-[100%] mx-auto">
            <button
              onClick={handleGenerateDocument}
              className={`md:absolute  rounded-full w-[260px] h-[46px] mx-auto md:bottom-2 md:right-2  font-urbanist font-semibold text-sm md:text-[14px] transition-colors ${title.trim()
                ? "common-button header-btn  cursor-pointer "
                : "bg-gray-300 cursor-not-allowed"
                }`}
              disabled={loading || !title.trim() || !canClick}
            >
              {loading ? "Generating Document..." : "Generate Document"}
            </button>
          </div>
        </div>

        

        {docUrl && (
          <div className="text-center border border-gray-300 rounded-md mt-5 p-4 max-w-[100%] mx-auto mb-4">
            <p className="text-xl mt-2 mb-5 max-w-[90%] mx-auto font-Urbanist text-[32px]">
              Your{" "}
              <span className="bg-clip-text text-transparent bg-text-theme-gradient">
                Document
              </span>{" "}
              is Ready.
            </p>

            <DocPreview s3Url={docUrl} Size={displayFullDoc}/>


            

              <button
                onClick={() => handleDownload(docUrl)}
                className="w-full py-3 rounded-full sm:w-auto  mx-auto p-4 bg-black cursor-pointer text-white text-sm sm:text-base flex justify-center items-center mt-2"
              >
                Download Document
              </button>



          </div>
        )}


      <h2 className="text-center text-2xl sm:text-2xl md:text-3xl font-Urbanist mb-4 mt-8">
          Previously{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            Generated
          </span>{" "}
          Documents
        </h2>

        <div className="container mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DocRecords.slice(0, visibleCount).map((tool, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-[#E4E4E4] rounded flex flex-col justify-between"
              >
                {/* Input Text */}
                <div className="w-full text-black text-sm sm:text-base md:text-xl font-Urbanist">
                  <HandleText text={tool.title} type="Input Title :" />
                </div>

                  
              
                <DocPreview s3Url={tool.doc_url}/>

               
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < DocRecords.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </div>


        <DetailSection
          title="Generate Documents Effortlessly with AI Document Creator"
          description="Turn your ideas into well-written documents in seconds with our AI Document Creator. Simply provide a topic or 
                    title, and let the tool handle the rest. Whether you need a professional write-up, an article, or any text-based content, 
                    this tool simplifies the process for you."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does the AI Document Creator Work?"
          explanation={[
            "The AI Document Creator uses advanced language models to analyze your provided description and craft a well-structured document. By understanding your input, it generates text that aligns with the topic and context you need.",
            "Since the tool is optimized for text output, it delivers content directly in a readable format without additional file types such as PDFs or Word documents. This makes it ideal for users who want quick and accessible results without worrying about formatting or compatibility.",
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

export default DocGenerator;
