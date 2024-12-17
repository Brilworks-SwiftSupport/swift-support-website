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


const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

// Dynamically import DocViewer for client-side rendering
const DocViewer = dynamic(() => import("react-doc-viewer"), { ssr: false });

const DocPreview = ({ s3Url }) => {
    const googleDocsViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(s3Url)}&embedded=true`;
  
    return (
      <div style={{ height: '100vh', overflow: 'auto' }}>
        <iframe
          src={googleDocsViewerUrl}
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    );
  };


const DocGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [docContent, setDocContent] = useState("");
  const [docUrl, setDocUrl] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // Initial 6 items for a 3x2 grid
  const [canClick, setCanClick] = useState(true); 
  const wordLimit = 500; // Set the word limit
  const wordCount = title.trim().split(/\s+/).filter(Boolean).length; // Count words
  
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
          {/* <span className="relative inline-block mb-2 md:mb-6">
            Text to Life{" "}
            <div className="absolute left-0 banner-underline md:!mt-2 !w-[200px] md:!w-[400px] !max-w-none"></div>
          </span>
          <span> with Realistic Voices.</span> */}
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
              href={"/tools/ai-doc-generator"}
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
              onChange={handleInputChange} // Use the state for the textarea value
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
        <DocPreview s3Url={docUrl}/>
      )}


      </div>
    </main>
  );
};

export default DocGenerator;
