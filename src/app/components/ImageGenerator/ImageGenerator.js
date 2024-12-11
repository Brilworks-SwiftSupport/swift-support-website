"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";

// Import SVG images
import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import tools from "@/app/images/tools.svg";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [allGeneratedImages, setAllGeneratedImages] = useState([]);

  // Image size options
  const imageSizeOptions = [
    { value: "", label: "Select Size" },
    { value: "1024x1024", label: "1024x1024" },
  ];

  // Quick try options
  const quickTryOptions = [
    "Futuristic city at night",
    "Cute robot playing chess",
    "Magical forest with glowing mushrooms",
  ];

  useEffect(() => {
    const fetchAllGeneratedImages = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_BE_URL}/generated_image`);
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        if (data && Array.isArray(data.generated_image_list)) {
          setAllGeneratedImages(data.generated_image_list);
        } else {
          console.error(
            "API response does not contain 'generated_image_list':",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching all generated images:", error);
      }
    };
    fetchAllGeneratedImages();
  }, []);

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
        alert("Error: Image generation failed");
        throw new Error("Image generation failed");
      }

      const data = await response.json();
      setGeneratedImage(data.image_url);
    } catch (err) {
      setGeneratedImage("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (imageUrl) => {
    const urlToDownload = imageUrl || generatedImage;

    if (urlToDownload) {
      try {
        fetch(urlToDownload)
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
      alert("No image available to download.");
    }
  };

  const handleImagePreview = () => {
    if (generatedImage) {
      window.open(generatedImage, "_blank");
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
              width={"w-auto"}
              img={textToVoice}
              href={"/tools/text-to-voice/"}
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
              name={"AI Image Generator"}
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

        {/* Previously Generated Images Section */}
        <h2 className="text-center text-2xl sm:text-4xl md:text-[42px] font-semibold mt-[120px] mb-11">
          Previously Generated Images
        </h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allGeneratedImages.map((image, index) => (
              <div
                key={index}
                className="relative shadow flex flex-col items-center bg-[#FFFBFB] border border-[#E4E4E4] rounded-2xl"
              >
                {/* Image Section */}
                <div className="relative w-full h-[200px] sm:h-[280px] md:h-[300px]">
                  <img
                    src={image.summary}
                    alt={`Prompt: ${image.prompt}`}
                    className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl"
                  />
                </div>

                {/* Text Section */}
                <div className="w-full text-black text-sm sm:text-base md:text-xl font-Urbanist px-4 py-4">
                  <span className="font-bold">Prompt: </span>
                  <span>{image.prompt}</span>
                </div>

                {/* Spacer Section */}
                <div className="w-full h-[40px] md:h-[60px] relative mt-4"></div>

                {/* Button Section */}
                <div className="mt-4 flex justify-center absolute bottom-3 md:bottom-4">
                  <button
                    onClick={() => handleDownload(image.summary)}
                    className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[340px] h-[40px] sm:h-[50px] md:h-[60px] bg-black text-white text-[10px] sm:text-[12px] md:text-[16px] font-semibold md:py-5 px-12 rounded-full"
                  >
                    Download Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Section
        <div className="bg-[#F6FDFF] px-4 sm:px-8 lg:px-32 py-12 flex flex-col gap-4 w-full mt-10">
          <div className="flex flex-col items-center gap-5 w-full mx-auto">
            <h1 className="text-[#212121] font-urbanist font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight text-center">
              Create Stunning Visuals with AI Image Generator
            </h1>
            <p className="text-[#212121] font-urbanist font-normal text-base sm:text-lg lg:text-xl leading-[1.6] text-center">
              Bring your ideas to life with our powerful AI Image Generator.
              Whether you're designing marketing materials, crafting unique
              artwork, or enhancing your digital content, this tool simplifies
              the creative process by transforming your imagination into
              high-quality visuals in seconds.
            </p>
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default ImageGenerator;
