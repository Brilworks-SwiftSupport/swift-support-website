"use client"
import React,{ useState } from "react";
import freeForever from "@/app/images/freeForever.svg"
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import para from "@/app/images/para.svg"
import doc from "@/app/images/doc.svg"
import search from "@/app/images/search.svg"

const NEXT_PUBLIC_BE_URL= process.env.NEXT_PUBLIC_BE_URL


const Plagiarism = () => {
    const [inputText, setInputText] = useState(""); // Text input state
    const [percentage, setPercentage] = useState("0"); // State to store plagiarism percentage
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("summary"); // Default to "summary"
    const [sources, setSources] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [text, setOriginalText] = useState(""); // State to store plagiarism percentage
    const [paraphrasingLoading, setParaphrasingLoading] = useState(false); // For paraphrasing

    const wordLimit = 2000; // Set the word limit
    const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; // Count words

    const handleCopy = () => {
      navigator.clipboard.writeText(text);  
      toast.success("Text copied to clipboard!", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
          const originalText = data.original_text
          console.log(plagiarismSources)
          console.log(plagiarismPercentage , plagiarismSources)
          setPercentage(plagiarismPercentage);
          setOriginalText(originalText)
          setSources(plagiarismSources);  // Update percentage state with the result
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
    
      

  return (
    <main className="flex mt-32 justify-center">
      
      <div className="container mx-auto max-w-6xl px-4">
        <Image className="mx-auto" src={freeForever} alt="free-forever" width={"auto"} />
        <br></br>
        {/* Title Section */}
        <div>
              
                <p className="text-4xl md:text-5xl font-bold mb-2 w-full max-w-[90%] mx-auto font-Urbanist text-[54px]">Verify Content for Plagiarism with just a Click.</p>
                <div
                    className="mx-auto"
                    style={{
                        width: "257px",
                        height: "10px",
                        background:
                            "linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #FFFFFF 87.5%)",
                        marginLeft: "auto", // To push it towards the right
                        marginRight: "410px", 
                    }}
                ></div>
                    <p className="text-center text-gray-600 b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px]">
                        Scan your <span className="bg-clip-text text-transparent bg-text-theme-gradient">Text for Plagiarism</span> and safegaurd the originality of your work in seconds.
                    </p>
                </div>

        <div className="flex items-center gap-2 mt-11">
                    <p className="text-[#3B82F6] font-bold whitespace-nowrap font-Urbanist text-[24px]">Other Tools:</p>
                    <div className="flex flex-wrap gap-0">
                    <NavigationButton img={para} href={"/tools/ai-paraphraser/"} name={"Paraphrasing Tool"} bgColor={'#FFFFFF'}/>
                    <NavigationButton img={doc} href={""} name={"Plagiarism Checker"} bgColor={'#FFFEEE'}/>
                    <NavigationButton img={search} href={"/tools/ai-content-detector/"} name={"AI Content Detector"} bgColor={'#FFFFFF'}/>
                    </div>
                    <div className="flex flex-wrap gap-4">
                    <p className="text-[#3B82F6] font-bold whitespace-nowrap ml-20 font-Urbanist text-[24px]">Plagiarism Content</p>
                    </div>
                </div>
        
        <div className="flex flex-col md:flex-row gap-3 mb-8 mt-2 font-Urbanist text-[18px]">
        <div className="relative flex-grow" style={{ height: '396px' , width: "789px"}}> {/* Parent div with relative positioning */}
            <textarea
                name="content"
                id="content"
                placeholder="Paste your content here to check for plagiarism..."
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
         <div className="w-[380px] h-[396px] bg-white flex items-center justify-center rounded-[20px] border border-[#E4E4E4]">
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
                strokeDashoffset={251.2 - (Math.min(percentage, 100) / 100) * 251.2}  // Progress based on plagiarism percentage
                style={{
                    transition: 'stroke-dashoffset 0.5s ease-in-out',
                    strokeLinecap: 'round'
                }}
                className="progress-circle"
            />
            <text x="50" y="55" className="text-center text-lg font-bold" textAnchor="middle">
                {percentage}% {/* Display the calculated plagiarism percentage */}
            </text>
        </svg>
    </div>

    </div>
          {/* Tabs for Summary and Full Transcript */}
        <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleSubmit} // Use the plagiarism checking handler
          disabled={loading || !inputText.trim()}
          className={`!px-4 py-5 common-button header-btn ${
            loading || !inputText.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Checking..." : "Check Plagiarism"}
        </button>

            </div>
            
            {percentage !== "0" && !loading && (
            <div className="plagiarism-result">
              {sources.length > 0 && (
                <div className="w-full max-w-[90%] font-Urbanist font-normal text-[16px]">
                  {/* Title for Source Links */}
                  <p className="text-[#3B82F6] font-bold whitespace-nowrap text-[24px] mt-1">
                    Source Links:
                  </p>

                  {/* List of Source Links */}
                  <ul className="mt-2">
                    {(showAll ? sources : sources.slice(0, 2)).map((source, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        {/* Icon for Links */}
                        <img
                          src="/images/link-2.svg"
                          alt="Link Icon"
                          className="h-5 w-5"
                        />
                        {/* Link */}
                        <a
                          href={source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>

                  {/* Toggle Button to View More/Less Links */}
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
              <div className="w-[1199px] h-[240px] bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4 relative mt-6">
                  {text && (
                      <>
                          <p className="text-gray-800 font-normal overflow-y-auto pr-10">
                              {text}
                          </p>

                          {/* Copy Button */}
                          <button
                              className="absolute top-4 right-4 bg-transparent p-2"
                              onClick={handleCopy}
                              aria-label="Copy text"
                          >
                              <img
                                  src="/images/Copy.png"
                                  alt="Copy"
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

            </div>
          )}

          {/* Global Error Display */}
          {error && <p className="text-red-500">{error}</p>}
  
      </div>
    </main>
  );
};

export default Plagiarism;
