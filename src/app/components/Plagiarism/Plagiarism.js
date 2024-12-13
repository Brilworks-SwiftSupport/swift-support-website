"use client"
import React, { useState, useEffect } from "react";
import freeForever from "@/app/images/freeForever.svg"
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
import result from "@/app/images/result.svg";
import report from "@/app/images/file.svg";
import scan from "@/app/images/scan.svg";
import close from '@/app/images/cross.svg';


const NEXT_PUBLIC_BE_URL= process.env.NEXT_PUBLIC_BE_URL

const Plagiarism = () => {
    const [inputText, setInputText] = useState(""); 
    const [percentage, setPercentage] = useState("0"); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("summary"); 
    const [sources, setSources] = useState([]);
    const [sourcesPercentage, setSourcesPercentage] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [text, setOriginalText] = useState(""); 
    const [paraphrasingLoading, setParaphrasingLoading] = useState(false); 
    const [highlightedText, setHighlightedText] = useState("");
    const [allPlagiarismInfo, setPlagiarismInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ text: "", plagiarised_content: "" ,plagiarism_percentage :"",source_links:""});
    const [activeFAQ, setActiveFAQ] = useState(null);


    const wordLimit = 2000; 
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; 

    const [isCopied, setIsCopied] = useState(false);

    const features = [
      {
        icon: scan,
        title: "Comprehensive Scanning​",
        description:
          "Check your content against a vast database of online sources to detect any instances of duplicate text or unintentional plagiarism.",
      },
      {
        icon: report,
        title: "Detailed Reports​",
        description:
          "Receive clear and actionable reports highlighting potential matches, along with percentage-based originality scores.",
      },
      {
        icon: result,
        title: "Instant Results​",
        description:
          "Get quick, accurate plagiarism checks without delays, making it easy to verify content on tight deadlines.",
      },
    ];

    const faqItems = [
      {
        question: "How do I check my content for plagiarism?​​",
        answer:
          "Simply paste your text into the tool, and it will scan for matches across a vast online database to ensure originality.",
      },
      {
        question: "What kind of documents can I check for plagiarism?​",
        answer:
          "You can check any type of text, including academic papers, blog posts, articles, and professional documents.",
      },
      {
        question: "Does the Plagiarism Checker provide detailed reports?​​​",
        answer:
          "Yes, the tool generates comprehensive reports that include highlighted matches and originality percentages for easy review.",
      },
      {
        question: "Is there any payment required?​",
        answer:
          "No, you don’t need to provide any credit card details or make payments. The Plagiarism Checker is completely free to use.",
      },
      {
        question: "Do I need to create an account to use the tool?​",
        answer:
          "No, there’s no need to create an account or log in. You can start checking your content instantly without any registration process.",
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
    

    const fetchPlagiarismCheck = async (text) => {
        try {
          const response = await fetch(`${NEXT_PUBLIC_BE_URL}/check_plagiarism`, {
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
          const plagiarismPercentage = data.plagiarism_percentage
          const plagiarismSources = data.matches.map(each=>(each.link));
          const plagiarismSourcePercentage = data.matches.map(each=>(each.similarity_percentage));
          const highlightedText = data.highlighted_text
          const originalText = data.original_text
          console.log (data.highlighted_text)
          setPercentage(plagiarismPercentage);
          setOriginalText(originalText)
          setSources(plagiarismSources); 
          setSourcesPercentage(plagiarismSourcePercentage)
          setHighlightedText(highlightedText);
          setActiveTab("Check Plagiarism"); // Switch to summary tab on success 
        } catch (err) {
          setError(err.message); // Display error if API call fails
        } finally {
          setLoading(false); // Ensure loading is stopped
        }
      };
      

      const fetchParaphrase = async (input_text, type) => {
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
    
      // Handle form submission
      const handleSubmitParaphrase = async (e, type) => {
        e.preventDefault();
    
        const textToSend = type === "regenerate" ? text : inputText;
    
        if (!textToSend.trim()) {
            alert("Please provide valid input text!");
            return;
        }
    
        setParaphrasingLoading(true);
        setError(""); // Reset error state before calling API
    
        try {
            const data = await fetchParaphrase(textToSend, type);
            setOriginalText(data.text); // Update the text shown with the rephrased result
        } catch (err) {
            setError(err.message); // Display error if API call fails
        } finally {
          setParaphrasingLoading(false); // Ensure loading is stopped
        }
    };
    
    

      const handleInputChange = (e) => {
        const words = e.target.value.split(/\s+/).filter((word) => word.length > 0); // Split input into words
        if (words.length <= wordLimit) {
            setInputText(e.target.value); // Allow input if word count is within the limit
        }

    };

    useEffect(() => {
      const fetchAllPlagiarism = async () => {
        try {
          const response = await fetch(`${NEXT_PUBLIC_BE_URL}/content_tools?type=plagiarism`);
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
            setPlagiarismInfo(data.content_tools);
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
  
      fetchAllPlagiarism();
    }, [isModalOpen]);

    const handleKnowMore = (data) => {
      setModalContent({
        text: data.text,
        plagiarised_content: data.plagiarised_content,
        source_links : data.source_links,
        plagiarism_percentage : data.plagiarism_percentage
      });
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setModalContent({ text: "", plagiarised_content: "" ,plagiarism_percentage :"",source_links:""});
    };
  

    return (
      <main className="flex mt-32 justify-center mb-32">
        <div className="container mx-auto max-w-6xl">
          <Image 
            className="mx-auto w-auto h-auto mb-3" 
            src={freeForever} 
            alt="free-forever" 
            width={300} 
            height={100}
          />
          
          {/* Title Section */}
          <div className="text-center">
            <p className="text-2xl md:text-4xl lg:text-5xl font-bold mb-5 w-full max-w-[90%] mx-auto font-Urbanist">
              Verify Content for Plagiarism with just a Click.
            </p>
            
            <div
              className="mx-auto hidden md:block"
              style={{
                width: "257px",
                height: "10px",
                background:
                  "linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #FFFFFF 87.5%)",
                marginLeft: "auto",
                marginRight: "410px", 
              }}
            ></div>
            
            <p className="text-center text-gray-600 b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px] flex-grow">
              Scan your <span className="bg-clip-text text-transparent bg-text-theme-gradient">Text for Plagiarism</span> and safeguard the originality of your work in seconds.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-2 mt-6 md:mt-11 overflow-x-auto">
            <div className="flex flex-col md:flex-row flex-wrap gap-0">
              <NavigationButton width={"w-[181px]"} img={para} href={"/tools/ai-paraphraser/"} name={"Paraphrasing Tool"} bgColor={'#FFFFFF'}/>
              <NavigationButton width={"w-[181px]"} img={doc} href={""} name={"Plagiarism Checker"} bgColor={'#FFFEEE'}/>
              <NavigationButton width={"w-[181px]"} img={search} href={"/tools/ai-content-detector/"} name={"AI Content Detector"} bgColor={'#FFFFFF'}/>
              <NavigationButton width={"w-[181px] md:w-auto"} img={tools} href={"/tools/"} name={"Other AI Tools"} bgColor={'#FFFFFF'}/>
            </div>
            <div className="hidden md:flex flex-wrap gap-4">
              <p className="text-[#3B82F6] font-bold whitespace-nowrap ml-20 font-Urbanist text-2xl">Plagiarism Content</p>
            </div>
          </div>
        
          {/* Main Content Area */}
          <div className="flex flex-col md:flex-row gap-3 mb-8 mt-2 font-Urbanist text-base">
            <div className="relative flex-grow w-[350px] md:w-[789px] h-[300px] md:h-[396px]">
              <textarea
                name="content"
                id="content"
                placeholder="Paste your content here to check for plagiarism..."
                className="w-[350px] md:w-full h-full py-3 px-4 text-gray-800 md:ml-0 ml-6 bg-white shadow-sm outline-none rounded-[20px] text-left leading-tight border border-[#E4E4E4] resize-none"
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

            {/* Percentage Circular Progress */}
            <div className="w-[350px] md:w-[380px] h-[300px] md:h-[396px] md:ml-0 ml-6 bg-white flex items-center justify-center rounded-[20px] border border-[#E4E4E4]">
              <svg className="w-100 h-4/5" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#E4E4E4" strokeWidth="10" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#6C63FF"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (Math.min(percentage, 100) / 100) * 251.2}
                  style={{
                    transition: 'stroke-dashoffset 0.5s ease-in-out',
                    strokeLinecap: 'round'
                  }}
                  className="progress-circle"
                />
                <text x="50" y="55" className="text-center text-lg font-bold" textAnchor="middle">
                  {percentage}% 
                </text>
              </svg>
            </div>
          </div>

          {/* Check Plagiarism Button */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading || !inputText.trim()}
              className={`!px-4 py-5 common-button header-btn ${
                loading || !inputText.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Checking..." : "Check Plagiarism"}
            </button>
          </div>
          <ToastContainer/>

          {/* Previously Plagiarised Text - Only show when no plagiarism check has been done */}
          {percentage === "0" && (
            <div>
              <h2 className="text-center text-3xl md:text-5xl font-semibold mb-3 font-Urbanist mt-14 flex-wrap">
                Previously Plagiarised Text
              </h2>
              <div className="container mx-auto py-6 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allPlagiarismInfo
                    .slice(0, showAll ? allPlagiarismInfo.length : 3)
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
                
                {allPlagiarismInfo.length > 3 && (
                  <div className="ml-auto mr-auto text-center mt-4 common-button header-btn w-[200px] h-[40px]">
                    <button onClick={() => setShowAll(!showAll)}>
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Plagiarism Results */}
          {percentage !== "0" && !loading && (
            <div className="plagiarism-result">
              {sources.length > 0 && (
                <div className="w-full max-w-[100%] font-Urbanist font-normal text-base">
                  {/* Plagiarised Content Title with Same Design */}
                  <div className="flex items-center gap-2 mt-6">
                    <p className="text-[#3B82F6] font-bold whitespace-nowrap text-xl md:text-2xl">
                      Plagiarised Content:
                    </p>
                  </div>

                  {highlightedText && (
                    <div
                      className="mt-4 p-4 border border-gray-300 rounded-lg"
                      style={{ whiteSpace: "pre-wrap", backgroundColor: "#f9f9f9" }}
                      dangerouslySetInnerHTML={{ __html: highlightedText }}
                    />
                  )}

                  {/* Source Links Section */}
                  <div className="flex items-center gap-2 mt-6">
                    <p className="text-[#3B82F6] font-bold whitespace-nowrap text-xl md:text-2xl">
                      Source Links:
                    </p>
                  </div>

                  {/* Rest of the sources list remains the same */}
                  <ul className="mt-2">
                    {(showAll ? sources : sources.slice(0, 2)).map((source, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <img
                          src="/images/link-2.svg"
                          alt="Link Icon"
                          className="h-5 w-5"
                        />
                        <a
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {source}
                        </a>
                        <span className="text-gray-900 text-[14px] ml-2">
                          ({sourcesPercentage[index]}%)
                        </span>
                      </li>
                    ))}
                  </ul>

                  {sources.length > 2 && (
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="mt-2 bg-clip-text text-transparent bg-text-theme-gradient hover:underline font-medium"
                    >
                      {showAll ? "View Less Links" : "View More Links"}
                    </button>
                  )}
                </div>
              )}

              {/* Response Display */}
              <div className="w-full h-[240px] bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4 relative mt-6">
                {text && (
                  <>
                    <p className="text-gray-800 font-normal overflow-y-auto pr-10">
                      {text}
                    </p>

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
                  </>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>

              {/* Paraphrase Button */}
              <div className="relative justify-end gap-3 mt-5 w-full">
                <button
                  onClick={(e) => handleSubmitParaphrase(e, "common")}
                  disabled={paraphrasingLoading || !text.trim()}
                  className={`!px-4 py-5 common-button header-btn ${
                    paraphrasingLoading || !text.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {paraphrasingLoading ? "Paraphrasing..." : "Rephrase"}
                </button>
              </div>

              {/* Previously Plagiarised Text - Now under the Rephrase button */}
              <div className="mt-12">
                <h2 className="text-center text-3xl md:text-5xl font-semibold mb-3 font-Urbanist flex-wrap">
                  Previously Plagiarised Text
                </h2>
                <div className="container mx-auto py-6 px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allPlagiarismInfo
                      .slice(0, showAll ? allPlagiarismInfo.length : 3)
                      .map((data, index) => (
                        <div key={index}
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
                
                {allPlagiarismInfo.length > 3 && (
                  <div className="ml-auto mr-auto text-center mt-4 common-button header-btn w-[200px] h-[40px]">
                    <button onClick={() => setShowAll(!showAll)}>
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Box 1: Original Text */}
                  <div className="bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4">
                    <p className="font-bold">Original Text:</p>
                    <p className="text-gray-800">{modalContent.text}</p>
                  </div>

                  {/* Box 2: Plagiarism Content */}
                  <div className="bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4">
                    <p className="font-bold">Plagiarism Content:</p>
                    <div className="w-full md:w-[380px] h-[300px] md:h-[396px] bg-white flex items-center justify-center rounded-[20px]">
                      <svg className="w-100 h-4/5" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="#E4E4E4" strokeWidth="10" fill="transparent" />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#6C63FF"
                          strokeWidth="10"
                          fill="transparent"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (Math.min(modalContent.plagiarism_percentage, 100) / 100) * 251.2}
                          style={{
                            transition: 'stroke-dashoffset 0.5s ease-in-out',
                            strokeLinecap: 'round',
                          }}
                          className="progress-circle"
                        />
                        <text x="50" y="55" className="text-center text-lg font-bold" textAnchor="middle">
                          {modalContent.plagiarism_percentage}%
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Box 3: Plagiarised Text */}
                  <div className="bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4">
                    <p className="font-bold">Plagiarised Content:</p>
                    <div
                              className="mt-4 p-4 rounded-lg"
                              style={{ whiteSpace: "pre-wrap", backgroundColor: "" }}
                              dangerouslySetInnerHTML={{ __html: modalContent.plagiarised_content }}
                            />
                  </div>

                  {/* Box 4: Other Details */}
                  <div className="bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4">
                    <p className="font-bold">Source Links:</p>
                    <ul className="mt-2">
                      {Array.isArray(modalContent.source_links) &&
                        (showAll ? modalContent.source_links : modalContent.source_links.slice(0, 10)).map((source, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <img
                              src="/images/link-2.svg"
                              alt="Link Icon"
                              className="h-5 w-5"
                            />
                            <a
                              href={source.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline truncate"
                            >
                              {source.link}
                            </a>
                            <span className="text-gray-900 text-[14px] ml-2">
                              ({source.similarity_percentage}%)
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

            )}

        <DetailSection
          title="Ensure Originality with the Plagiarism Checker"
          description="Maintain the integrity of your work with our Plagiarism Checker. Whether you're verifying
          academic papers, blog posts, or professional documents, this tool scans your text against
          extensive databases to ensure originality and authenticity in seconds."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does the Plagiarism Checker Work?"
          explanation={[
            "The Plagiarism Checker uses cutting-edge AI algorithms to analyze your text for similarities across a broad database of online content, academic papers, and other sources. Once you submit your text, the tool breaks it into smaller sections, searches for matches, and evaluates the originality of your content.",
            "The tool provides a detailed report, highlighting matched phrases and linking them to their sources. With its real-time results and user-friendly interface, the Plagiarism Checker ensures that your content remains authentic and credible, all without requiring manual cross-referencing.",
          ]}
        />
        <FAQSection
          faqItems={faqItems}
          activeFAQ={activeFAQ}
          toggleFAQ={toggleFAQ}
        />



        <ToastContainer/>
      </div>
    </main>
  );
};

export default Plagiarism;