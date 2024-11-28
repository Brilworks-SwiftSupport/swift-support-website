"use client";
import React, { useState } from "react";
import freeForever from "@/app/images/freeForever.svg";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import para from "@/app/images/para.svg"
import doc from "@/app/images/doc.svg"
import search from "@/app/images/search.svg"

const NEXT_PUBLIC_BE_URL= process.env.NEXT_PUBLIC_BE_URL

const Paraphrase = () => {
  const [inputText, setInputText] = useState(""); // Text input state
  const [text, setText] = useState(""); // State to store paraphrased text
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  // Handle form submission
  const handleSubmit = async (e, type) => {
    e.preventDefault();

    // Set inputText to the API response when type is "regenerate"
    const textToSend = type === "regenerate" ? text : inputText;

    if (!textToSend.trim()) {
      alert("Please provide valid input text!");
      return;
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
    <main className="flex mt-32 justify-center">
      <div className="container mx-auto max-w-6xl px-4">
        <Image
          className="mx-auto"
          src={freeForever}
          alt="free-forever"
          width={"auto"}
        />
        <br></br>
        {/* Title Section */}
        <div>
          <p className="text-4xl md:text-5xl mx-auto font-bold mb-2 w-full max-w-[96%] font-Urbanist text-[54px]">
            Rephrase with Ease – Free AI Paraphrasing Tool.
          </p>
          <div
            style={{
              width: "450px",
              height: "10px",
              background:
                "linear-gradient(90deg, #D8EA9A 0%, #AFE5CA 25.5%, #FBB8B8 62.5%, #FFFFFF 87.5%)",
              marginLeft: "600px",
              marginRight: "auto",
            }}
          ></div>
          <p className="text-center text-gray-600 b-8 w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px]">
            Use our free{" "}
            <span className="bg-clip-text text-transparent bg-text-theme-gradient">
              AI tool to Paraphrase{" "}
            </span>{" "}
            text effortlessly, ensuring originality and clarity every time.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-11">
          <p className="text-[#3B82F6] font-bold whitespace-nowrap font-Urbanist text-[24px]">
            Other Tools:
          </p>
          <div className="flex flex-wrap gap-0">
          <NavigationButton img={para} href={""} name={"Paraphrasing Tool"} bgColor={'#FFFEEE'}/>
          <NavigationButton img={doc} href={"/tools/plagiarism-checker/"} name={"Plagiarism Checker"} bgColor={'#FFFFFF'}/>
          <NavigationButton img={search} href={"/tools/ai-content-detector/"} name={"AI Content Detector"} bgColor={'#FFFFFF'}/>
            <div className="flex flex-wrap gap-4">
                        <p className="text-[#3B82F6] font-bold whitespace-nowrap ml-20 font-Urbanist text-[24px]">
                        Paraphrased Text 
                        </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-8 mt-2 font-Urbanist text-[18px]">
        <div className="relative flex-grow" style={{ height: '396px' , width: "530px"}}> {/* Parent div with relative positioning */}
            <textarea
                name="content"
                id="content"
                placeholder="Paste your content here to paraphrase..."
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
        <div className="w-[530px] h-[396px] bg-white flex flex-col text-left rounded-[20px] border border-[#E4E4E4] p-4 relative">
          {/* Displaying the API Response */}
          {text && (
            <>
              <p className="text-gray-800 font-normal overflow-y-auto pr-10">{text}</p> {/* Add padding to avoid overlap */}
              {/* Copy Button */}
              <button
                className="absolute top-4 right-4 bg-transparent p-2"
                onClick={handleCopy}
                aria-label="Copy text"
              >
                <img
                  src="/images/Copy.png" // Replace with your image path or URL
                  alt="Copy"
                  className="w-6 h-6"
                />
              </button>
              {/* Regenerate Button */}
              <button
                className="absolute bottom-4 right-4 bg-transparent p-2"
                onClick={(e) => handleSubmit(e, 'regenerate')} // Pass 'regenerate' when clicked
                aria-label="Regenerate text"
              >
                <img
                  src="/images/Regenerate.png" // Replace with your image path or URL
                  alt="Regenerate"
                  className="w-6 h-6"
                />
              </button>
            </>
          )}
          {/* Displaying Error */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {/* Toast Container */}
          <ToastContainer />
        </div>

        </div>
        {/* Button for Paraphrase */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={(e) => handleSubmit(e, 'common')} // Pass 'common' when clicked
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
        {/* Displaying Error */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </main>
  );
};

export default Paraphrase;
