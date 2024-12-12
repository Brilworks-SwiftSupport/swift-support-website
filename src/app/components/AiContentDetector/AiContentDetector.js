"use client"
import React, { useState , useEffect} from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import freeForever from "@/app/images/freeForever.svg"
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import para from "@/app/images/para.svg"
import doc from "@/app/images/doc.svg"
import search from "@/app/images/search.svg"
import tools from "@/app/images/tools.svg"

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL

const Plagiarism = () => {
    const [inputText, setInputText] = useState(""); // Text input state
    const [percentage, setPercentage] = useState(""); // State to store plagiarism percentage
    const [loading, setLoading] = useState(false); 
    const [allParaphraseInfo, setParaphraseInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ text: "", ai_generated: "" ,human_written :""});
    const [error, setError] = useState("");
    const [humanPercentage, setHumanPercentage] = useState(""); // Default to "summary"

    const [showAll, setShowAll] = useState(false); // State to control showing all cards
    const wordLimit = 2000; // Set the word limit
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; // Count words

    const fetchPlagiarismCheck = async (text) => {
        try {
          const response = await fetch(`${NEXT_PUBLIC_BE_URL}/humanize_detection`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }), // Include the input text in the body
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
      
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!inputText.trim()) {
          alert("Please provide valid input text!");
          return;
        }
        if (wordCount < 50) {
          // setError("Please provide at least 10 words to proceed!");
          toast.error("Input must contain at least 50 words!", {
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
        setTimeout(() => {
          setLoading(false);
      }, 2000);
      
        try {
          const data = await fetchPlagiarismCheck(inputText);
          const aiPercentage = data.ai_percentage
          const humanPercentage = data.human_percentage
          setPercentage(aiPercentage);
          setHumanPercentage(humanPercentage)
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

    useEffect(() => {
      const fetchAllParaphrase = async () => {
        try {
          const response = await fetch(`${NEXT_PUBLIC_BE_URL}/content_tools?type=ai_content`);
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

    const handleKnowMore = (data) => {
      setModalContent({
        text: data.text,
        ai_generated: data.ai_generated,
        human_written : data.human_written
      });
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalContent({ text: "", ai_generated: "",human_written:"" });
    };
  

  return (
    <main className="flex mt-32 justify-center">
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
          <p className="text-center text-3xl md:text-5xl font-bold mb-5 w-full max-w-[90%] mx-auto font-Urbanist">
            Uncover the Source: AI or Human?
          </p>
          <div
            className="hidden md:block"
            style={{
              width: "257px",
              height: "10px",
              background:
                "linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #FFFFFF 87.5%)",
              marginLeft: "auto",
              marginRight: "230px", 
            }}
          ></div>
          <p className="text-center text-gray-600 b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px] flex-grow">
            Instantly detect whether your content is <span className="bg-clip-text text-transparent bg-text-theme-gradient">crafted by AI</span> or thoughtfully written by <span className="bg-clip-text text-transparent bg-text-theme-gradient">a Human</span>
          </p>
        </div>

        {/* Navigation and Tools Section */}
        <div className="flex flex-col md:flex-row items-center gap-2 mt-6 md:mt-11 overflow-x-auto">
            <div className="flex flex-col md:flex-row flex-wrap gap-0">
            <NavigationButton width={"w-[181px]"} img={para} href={"/tools/ai-paraphraser/"} name={"Paraphrasing Tool"} bgColor={'#FFFFFF'}/>
            <NavigationButton width={"w-[181px]"} img={doc} href={"/tools/plagiarism-checker/"} name={"Plagiarism Checker"} bgColor={'#FFFFFF'}/>
            <NavigationButton width={"w-[181px]"} img={search} href={""} name={"AI Content Detector"} bgColor={'#FFFEEE'}/>
            <NavigationButton width={"w-[181px] md:w-auto"} img={tools} href={"/tools/"} name={"Other AI Tools"} bgColor={'#FFFFFF'}/>
            </div>
            <div className="hidden md:flex flex-wrap gap-4">
              <p className="text-[#3B82F6] font-bold whitespace-nowrap ml-20 font-Urbanist text-2xl">Human Content Score</p>
            </div>
          </div>

        {/* Content and Result Section */}
        <div className="flex flex-col md:flex-row gap-3 mb-8 mt-2 font-Urbanist text-base">
          {/* Textarea */}
          <div 
            className="relative flex-grow w-full md:w-[789px] h-[300px] md:h-[396px]"
          >
            <textarea
              name="content"
              id="content"
              placeholder="Paste your content here to detect..."
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

          {/* Result Box */}
          <div className="w-full md:w-[380px] h-[300px] md:h-[396px] bg-white flex flex-col items-center justify-start rounded-[20px] border border-[#E4E4E4] pt-6">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E4E4E4"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#6C63FF"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="282.6"
                strokeDashoffset={282.6 - (Math.min(percentage, 100) / 100) * 282.6}
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                  strokeLinecap: 'round',
                }}
              />
              {/* Text Percentage */}
              <text
                x="50"
                y="55"
                className="text-center text-base font-bold"
                textAnchor="middle"
                fill="#000"
              >
                {percentage}% {/* Display the calculated plagiarism percentage */}
              </text>
            </svg>
            {/* Text Below Circle */}
            <p className="mt-4 text-gray-800 font-Urbanist font-normal text-base md:text-[20px]">
              of text is likely AI-Generated
            </p>

            {/* AI Written Content */}
            <div className="w-[340px] h-[46px] bg-white flex items-center rounded-[20px] border border-[#E4E4E4] pt-2 mt-8 md:mt-16">
              <div
                className="w-[70px] h-[36px] rounded-full flex items-center justify-center ml-1 mb-2"
                style={{
                  background: 'linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #9B9B9B 100%)',
                  padding: '1px',
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: percentage>humanPercentage ? '#4DFFB5' : '#FFFEEE', // Dynamic background
                  }}
                >
                  <p className="text-sm font-bold text-gray-950">{percentage}%</p>
                </div>
              </div>
              <p className="ml-3 text-gray-700 font-medium font-Urbanist text-[16px] mb-2">
                AI Written Content
              </p>
            </div>

            {/* Human Written Content */}
            <div
              className="w-[340px] h-[46px] bg-white flex items-center rounded-[20px] border border-[#E4E4E4] pt-2 mt-4"
            >
              <div
                className="w-[70px] h-[36px] rounded-full flex items-center justify-center ml-1 mb-2"
                style={{
                  background: 'linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #9B9B9B 100%)',
                  padding: '1px',
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: percentage < humanPercentage ? '#4DFFB5' : '#FFFEEE', // Dynamic background
                  }}
                >
                  <p className="text-sm font-bold text-gray-950">{humanPercentage}%</p>
                </div>
              </div>
              <p className="ml-3 text-gray-700 font-medium font-Urbanist text-[16px] mb-2">
                Human Written Content
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading || !inputText.trim()} // Disable when loading or no text
            className={`!px-4 mr-2 py-5 common-button header-btn ${
              loading || !inputText.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Checking..." : "Proceed to Detect"}
          </button>
        </div>
        
        <div>
      <h2 className="text-center text-3xl md:text-5xl font-semibold mb-3 font-Urbanist mt-14 flex-wrap">
        Previously AI Detected Text
      </h2>
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allParaphraseInfo
            .slice(0, showAll ? allParaphraseInfo.length : 3)
            .map((data, index) => (
              <div
                key={index}
                className="w-[360px] h-[243px] bg-white flex-col rounded-[20px] border border-[#E4E4E4] p-4 flex-wrap md:ml-4"
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
        <div className="bg-white rounded-3xl shadow-lg w-[1000px] max-h-[80%] overflow-hidden">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-6 py-4">
            <h3 className="text-xl font-bold">Details</h3>
            <button
              className="common-button header-btn w-[40px] h-[40px] flex items-center justify-center"
              onClick={closeModal}
            >
              X
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
                <p className="font-bold">Human Content Score:</p>
                <div className="w-full md:w-[380px] h-[300px] md:h-[396px] bg-white flex flex-col items-center justify-centre rounded-[20px] border border-[#E4E4E4] pt-6 ml-7 mt-4">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E4E4E4"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#6C63FF"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="282.6"
                strokeDashoffset={282.6 - (Math.min(modalContent.ai_generated, 100) / 100) * 282.6}
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                  strokeLinecap: 'round',
                }}
              />
              {/* Text Percentage */}
              <text
                x="50"
                y="55"
                className="text-center text-base font-bold"
                textAnchor="middle"
                fill="#000"
              >
                {modalContent.ai_generated}% {/* Display the calculated plagiarism percentage */}
              </text>
            </svg>
            {/* Text Below Circle */}
            <p className="mt-4 text-gray-800 font-Urbanist font-normal text-base md:text-[20px]">
              of text is likely AI-Generated
            </p>

            {/* AI Written Content */}
            <div className="w-[340px] h-[46px] bg-white flex items-center rounded-[20px] border border-[#E4E4E4] pt-2 mt-8 md:mt-16">
              <div
                className="w-[70px] h-[36px] rounded-full flex items-center justify-center ml-1 mb-2"
                style={{
                  background: 'linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #9B9B9B 100%)',
                  padding: '1px',
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: modalContent.ai_generated>modalContent.human_written ? '#4DFFB5' : '#FFFEEE', // Dynamic background
                  }}
                >
                  <p className="text-sm font-bold text-gray-950">{modalContent.ai_generated}%</p>
                </div>
              </div>
              <p className="ml-3 text-gray-700 font-medium font-Urbanist text-[16px] mb-2">
                AI Written Content
              </p>
            </div>

            {/* Human Written Content */}
            <div
              className="w-[340px] h-[46px] bg-white flex items-center rounded-[20px] border border-[#E4E4E4] pt-2 mt-4"
            >
              <div
                className="w-[70px] h-[36px] rounded-full flex items-center justify-center ml-1 mb-2"
                style={{
                  background: 'linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #9B9B9B 100%)',
                  padding: '1px',
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: modalContent.ai_generated < modalContent.human_written ? '#4DFFB5' : '#FFFEEE', // Dynamic background
                  }}
                >
                  <p className="text-sm font-bold text-gray-950">{modalContent.human_written}%</p>
                </div>
              </div>
              <p className="ml-3 text-gray-700 font-medium font-Urbanist text-[16px] mb-2">
                Human Written Content
              </p>
            </div>
          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    </div>

    <ToastContainer />
      </div>
    </main>
  );
};

export default Plagiarism;