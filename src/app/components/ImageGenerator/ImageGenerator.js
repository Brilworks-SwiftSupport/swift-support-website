"use client";
import React, { useState } from "react";
import Image from "next/image";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";

// Import SVG images
import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import tools from "@/app/images/tools.svg"

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  // Image size options
  const imageSizeOptions = [
    { value: "", label: "Select Size" },
    { value: "1024x1024", label: "1024x1024" },
    // { value: "1792x1024", label: "1792x1024" },
    // { value: "1024x1792", label: "1024x1792" },
  ];

  // Quick try options
  const quickTryOptions = [
    "Futuristic city at night",
    "Cute robot playing chess",
    "Magical forest with glowing mushrooms",
  ];

  // Handler to set prompt when a quick try option is clicked
  const handleQuickTryClick = (option) => {
    setPrompt(option);
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratedImage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${NEXT_PUBLIC_BE_URL}/image_generator`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          size: selectedSize,
        }),
      });

      if (!response.ok) {
        // Show simple error alert
        alert("Error: Upload failed.");
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setGeneratedImage(data.image_url);
    } catch (err) {
      setGeneratedImage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      try {
        // Convert data URL to a Blob
        fetch(generatedImage)
          .then((response) => response.blob())
          .then((blob) => {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);

            // Set the href and download attributes
            link.href = url;
            const extension = blob.type.includes("jpeg") ? "jpg" : "png";
            link.setAttribute("download", `generated-image.${extension}`);

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release the object URL
            URL.revokeObjectURL(url);
          });
      } catch (error) {
        console.error("Error downloading image:", error);
        alert(
          "An error occurred while downloading the image. Please try again."
        );
      }
    } else {
      alert("No image generated yet.");
    }
  };

  const handleImagePreview = () => {
    if (generatedImage) {
      window.open(generatedImage, "_blank");
    }
  };

  return (
    <main className="mt-12 md:mt-32">
      <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent">
        <Image
          className="mx-auto w-auto h-auto"
          src={freeForever}
          alt="free-forever"
          width={300}
          height={100}
        />

        {/* Title Section */}
        <h1 className="text-center text-2xl sm:text-3xl md:text-[54px] font-urbanist font-bold leading-[1.2] mb-4 mt-6 md:mt-12">
          <span>Create Stunning </span>
          <span className="relative inline-block mb-2 md:mb-6">
            Visuals from Your
            <div className="absolute left-0 banner-underline md:!mt-2 !w-[200px] md:!w-[740px] !max-w-none"></div>
          </span>
          <span> Imagination.</span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-center text-[#212121] font-urbanist font-medium text-sm sm:text-base md:text-[24px] mt-6 md:mt-10 px-4">
          Generate beautiful{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            AI-crafted images
          </span>{" "}
          from simple text prompts.
        </p>

        {/* Tools List */}
        <div className="flex flex-wrap gap-4 mt-[30px] md:mt-[56px] md:ml-12 px-4 md:px-0">
          <div className="flex items-center flex-wrap gap-2 ml-[62px] md:ml-0">
            <NavigationButton
              width={"w-[181px]"}
              img={textToVoice}
              href={"/tools/text-to-voice/"}
              name={"AI Text to Voice"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-[181px]"}
              img={voiceToText}
              href={"/tools/voice-to-text/"}
              name={"AI Voice to Text"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton
              width={"w-[181px]"}
              img={imgGenerator}
              name={"AI Image Generator"}
              bgColor={"#FFFEEE"}
            />
            <NavigationButton width={"w-[181px] md:w-[135px]"} img={tools} href={"/tools/"} name={"Other AI Tools"} bgColor={'#FFFFFF'}/>
          </div>
        </div>

        {/* Prompt Box */}
        <form onSubmit={handleSubmit} className="px-2">
          <div className="relative flex flex-col md:flex-row items-center justify-center w-full my-4">
            <div className="flex flex-col md:flex-row items-center bg-white border border-gray-300 rounded-[30px] py-3 w-full h-auto md:h-[56px] px-4">
              <input
                type="text"
                name="prompt"
                value={prompt}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to see..."
                className="flex-grow text-gray-500 font-urbanist font-semibold text-sm md:text-[16px] leading-[24px] outline-none placeholder-gray-350 mb-2 md:mb-0 md:mx-6"
                required
              />

              {/* Size Dropdown */}
              <select
                value={selectedSize}
                disabled={isLoading}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full md:w-auto px-2 py-1 border rounded text-gray-700 focus:outline-none focus:border-blue-500 mb-2 md:mb-0 md:mr-2"
              >
                {imageSizeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={isLoading || !selectedSize}
                className={`flex items-center justify-center
              ${
                isLoading || !selectedSize
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black"
              } 
              text-white font-urbanist font-semibold text-sm md:text-[16px] 
              leading-[24px] rounded-full py-2 md:py-3 md:-mr-3 px-6 w-full md:w-auto`}
              >
                {isLoading ? "Generating..." : "Generate Image"}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Try Options */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 px-2">
          <div className="text-sm font-semibold mt-1 md:ml-10">Quick Try:</div>
          <div className="flex flex-wrap gap-2 overflow-x-auto">
            {quickTryOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                disabled={isLoading}
                onClick={() => handleQuickTryClick(option)}
                className="px-3 py-1 text-[#3B82F6] bg-blue-50 hover:bg-blue-100 rounded-full 
              font-urbanist font-semibold text-sm md:text-[14px] transition-colors duration-200 max-w-max truncate"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Generated Image Display */}
        {isLoading && (
          <div className="flex justify-center mt-8 text-[28px] font-medium">
            <p>Generating Image...</p>
          </div>
        )}

        {generatedImage && (
          <div className="mt-16 w-full px-2 border border-[#E4E4E4] rounded-3xl">
            <div className="flex flex-col items-center p-4">
              <p className="text-center text-[#212121] font-urbanist font-medium text-lg sm:text-xl md:text-[36px]">
                Your{" "}
                <span className="bg-clip-text text-transparent bg-text-theme-gradient">
                  Image
                </span>{" "}
                is Ready.
              </p>
              <img
                src={generatedImage}
                onClick={handleImagePreview}
                className="mt-4 w-full max-w-[400px] md:max-w-[600px] rounded-lg shadow-lg cursor-pointer hover:opacity-80 transition-opacity"
              />
            </div>
          </div>
        )}
        {generatedImage && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDownload}
              className="w-[171px] h-[46px] bg-black text-white text-sm md:text-base font-bold py-2 px-4 rounded-full"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ImageGenerator;
