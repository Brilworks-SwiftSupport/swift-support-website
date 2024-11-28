"use client"
import React,{ useState } from "react";
import freeForever from "@/app/images/freeForever.svg"
import Image from "next/image";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import para from "@/app/images/para.svg"
import doc from "@/app/images/doc.svg"
import search from "@/app/images/search.svg"


const Plagiarism = () => {
    const [inputText, setInputText] = useState(""); // Text input state
    const [percentage, setPercentage] = useState("0"); // State to store plagiarism percentage
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("summary"); // Default to "summary"
    const [sources, setSources] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const wordLimit = 2000; // Set the word limit
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; // Count words
    


    const fetchPlagiarismCheck = async (text) => {
        try {
          const response = await fetch("https://devapi.swiftsupport.ai/api/check_plagiarism", {
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
          console.log(data); // Debug log to check API response
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
      
        setLoading(true);
        setError(""); // Reset error state before calling API
        setTimeout(() => {
          setLoading(false);
      }, 2000);
      
        try {
          const data = await fetchPlagiarismCheck(inputText);
          const plagiarismPercentage = data.plagiarism_percentage
          const plagiarismSources = data.matches.map(each=>(each.link));
          console.log(plagiarismSources)
          console.log(plagiarismPercentage , plagiarismSources)
          setPercentage(plagiarismPercentage);
          setSources(plagiarismSources);  // Update percentage state with the result
          setActiveTab("Check Plagiarism"); // Switch to summary tab on success
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
    <main className="flex mt-32 justify-center">
      
      <div className="container mx-auto max-w-6xl px-4">
        <Image className="mx-auto" src={freeForever} alt="free-forever" width={"auto"} />
        <br></br>
        {/* Title Section */}
        <div>
              
                <p className="text-center text-4xl md:text-5xl font-bold mb-2 w-full max-w-[90%] mx-auto font-Urbanist text-[54px]">Uncover the Source: AI or Human?</p>
                <div
                    style={{
                        width: "257px",
                        height: "10px",
                        background:
                            "linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #FFFFFF 87.5%)",
                        marginLeft: "auto",
                        marginRight: "230px", 
                    }}
                ></div>
                    <p className="text-center text-gray-600 b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px]">
                    Instantly detect whether your content is  <span className="bg-clip-text text-transparent bg-text-theme-gradient">crafted by AI</span> or thoughtfully written by <span className="bg-clip-text text-transparent bg-text-theme-gradient">a Human</span>
                    </p>
                </div>

                <div className="flex items-center gap-2 mt-11">
                    <p className="text-[#3B82F6] font-bold whitespace-nowrap font-Urbanist text-[24px]">
                        Other Tools:
                    </p>
                    <div className="flex flex-wrap gap-0">
                        <NavigationButton img={para} href={"/tools/ai-paraphraser/"} name={"Paraphrasing Tool"} bgColor={'#FFFFFF'}/>
                        <NavigationButton img={doc} href={"/tools/plagiarism-checker/"} name={"Plagiarism Checker"} bgColor={'#FFFFFF'}/>
                        <NavigationButton img={search} href={""} name={"AI Content Detector"} bgColor={'#FFFEEE'}/>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <p className="text-[#3B82F6] font-bold whitespace-nowrap ml-20 font-Urbanist text-[24px]">
                        Human Content Score
                        </p>
                    </div>
                    </div>

        
        <div className="flex flex-col md:flex-row gap-3 mb-8 mt-2 font-Urbanist text-[18px]">
        <div className="relative flex-grow" style={{ height: '396px' , width: "789px"}}> {/* Parent div with relative positioning */}
            <textarea
                name="content"
                id="content"
                placeholder="Paste your content here to detect..."
                className="w-full h-full py-3 px-4 text-gray-800 bg-white shadow-sm outline-none rounded-[20px] text-left leading-tight border border-[#E4E4E4] resize-none"
                value={inputText}
                onChange={handleInputChange}  // Use the state for the textarea value
                required
            />
            {/* Word count displayed in the bottom-right corner */}
            <span
                className="absolute text-gray-600 text-sm bg-[#F1F5F9] px-2 py-1 rounded-lg shadow"
                style={{ bottom: '10px', right: '10px' }}
            >
                {wordCount} of {wordLimit} words used
            </span>
        </div>

         {/* Box beside the Textarea */}
        <div className="w-[380px] h-[396px] bg-white flex flex-col items-center justify-start rounded-[20px] border border-[#E4E4E4] pt-6">
        <svg className="w-32 h-32" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle cx="50" cy="50" r="45" stroke="#E4E4E4" strokeWidth="10" fill="transparent" />
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
            <text x="50" y="55" className="text-center text-base font-bold" textAnchor="middle" fill="#000">
                {percentage}% {/* Display the calculated plagiarism percentage */}
            </text>
        </svg>
        {/* Text Below Circle */}
        <p className="mt-4 text-lg text-gray-800 font-Urbanist font-normal text-[20px]">
        of text is likely AI- Generated
        </p>
        
        <div className="w-[340px] h-[46px] bg-white flex items-center rounded-[20px] border border-[#E4E4E4] pt-2 mt-16">
            {/* Circle */}
            <div 
                className="w-[70px] h-[36px] rounded-full flex items-center justify-center ml-1 mb-2"
                style={{
                    background: 'linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #9B9B9B 100%)',
                    padding: '1px', // Creates spacing for the gradient border
                }}
            >
                <div 
                    className="w-full h-full bg-[#FFFEEE] rounded-full flex items-center justify-center"
                    style={{
                        background: '#FFFEEE',
                    }}
                >
                    <p className="text-sm font-bold text-gray-950">
                        50%
                    </p>
                </div>
            </div>
            {/* Additional Text */}
            <p className="ml-3 text-gray-700 font-medium font-Urbanist text-[16px] mb-2">
                AI Written Content
            </p>
        </div>



        <div className="w-[340px] h-[46px] bg-white flex items-center rounded-[20px] border border-[#E4E4E4] pt-2 mt-4" >
            {/* Circle */}
            <div 
                className="w-[70px] h-[36px] rounded-full flex items-center justify-center ml-1 mb-2"
                style={{
                    background: 'linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #9B9B9B 100%)',
                    padding: '1px', // Creates spacing for the gradient border
                }}
            >
                <div 
                    className="w-full h-full bg-[#FFFEEE] rounded-full flex items-center justify-center"
                    style={{
                        background: '#FFFEEE',
                    }}
                >
                    <p className="text-sm font-bold text-gray-950">
                        50%
                    </p>
                </div>
            </div>
            {/* Additional Text */}
            <p className="ml-3 text-gray-700 font-medium font-Urbanist text-[16px] mb-2">
            Human Written Content 
            </p>
        </div>
    </div>

    </div>
          {/* Tabs for Summary and Full Transcript */}
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
            {percentage !== "0" && !loading && (
            <div className="plagiarism-result">
                {sources.length > 0 && (
                    <div className="w-full max-w-[90%] font-Urbanist font-normal text-[16px]">
                        <p className="text-[#3B82F6] font-bold whitespace-nowrap font-Urbanist text-[24px] mt-1">
                            Source Links:
                        </p>
                        <ul>
                            {/* Show only 2 links or all links based on showAll state */}
                            {(showAll ? sources : sources.slice(0, 2)).map((source, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    {/* Add an image */}
                                    <img
                                        src="/images/link-2.svg"
                                        alt="Link Icon"
                                        className="h-5 w-5"
                                    />
                                    {/* Link */}
                                    <a href={source} target="_blank" rel="noopener noreferrer">
                                        {source}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        {/* Button to toggle view */}
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
            </div>
        )}
        {error && <p className="text-red-500">{error}</p>}   
      </div>
    </main>
  );
};

export default Plagiarism;
