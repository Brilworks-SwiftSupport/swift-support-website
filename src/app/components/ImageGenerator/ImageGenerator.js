"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import HandleText from "../Tools/HandleText";

// Import SVG images
import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import customizableVisuals from "@/app/images/customizable_visuals.svg";
import highResolutionOutput from "@/app/images/high_resolution_output.svg";
import instantResults from "@/app/images/instant_results.svg";
import tools from "@/app/images/tools.svg";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allGeneratedImages, setAllGeneratedImages] = useState([]);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); // Initial 6 items for a 3x2 grid

  const features = [
    {
      icon: customizableVisuals,
      title: "Customizable Visuals",
      description:
        "Create images that match your specific needs, whether it's a particular style, theme, or color palette.",
    },
    {
      icon: highResolutionOutput,
      title: "High-Resolution Output",
      description:
        "Produce professional-quality images with resolutions suitable for websites, presentations, print media, and more.",
    },
    {
      icon: instantResults,
      title: "Instant Results",
      description:
        "Save time with fast, real-time image generation, making it easy to meet tight deadlines or explore multiple ideas.",
    },
  ];

  const faqItems = [
    {
      question: "How do I generate an image with the AI tool?",
      answer:
        "To generate an image, simply type a description of the image you want. The AI will then process your input and create an image based on your text, whether it’s a scene, object, or abstract concept.",
    },
    {
      question: "How long does it take to generate an image?",
      answer:
        "The image is typically generated within seconds. The tool uses powerful AI models to process your description and produce high-quality visuals almost instantly quickly.",
    },
    {
      question: "Can I download the images I generate?",
      answer:
        "Yes, once the image is generated, you can download it in high resolution for use in your projects, presentations, or designs.",
    },
    {
      question: "Is there any payment required?",
      answer:
        "No, you do not need to provide any credit card details or make any payments. Our AI Image Generator is completely free to use with no hidden charges.",
    },
    {
      question: "Do I need to create an account to use the tool?",
      answer:
        "No, there is no need to create an account or log in. You can start using the AI Image Generator immediately without any registration process.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

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
          size: "1024x1024",
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

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 6 more items
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
          <div className="flex items-center justify-center flex-wrap gap-2 md:-ml-8">
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
              <button
                type="submit"
                disabled={isLoading}
                className={`flex items-center justify-center
                          ${isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black"
                  }
                          text-white font-urbanist font-semibold text-sm md:text-[16px] leading-[24px] rounded-full py-2 md:py-3 md:-mr-3 px-6 w-full md:w-auto`}
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
          <div className="mt-6 flex mx-auto items-center justify-center sm:block hidden">
            <button
              onClick={handleDownload}
              className="w-[171px] h-[46px] bg-black text-white text-sm md:text-base font-bold py-2 px-4 rounded-full sm:block hidden mx-auto "
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
            {allGeneratedImages.slice(0, visibleCount).map((image, index) => (
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
                  <HandleText text={image.prompt} type="Prompt :" />
                </div>

                <div className="w-full h-[40px] md:h-[60px] relative mt-4 sm:block hidden"></div>
                <div className="mt-4 flex justify-center absolute bottom-3 md:bottom-4 sm:block hidden">
                  <button
                    onClick={() => handleDownload(image.summary)}
                    className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[340px] h-[40px] sm:h-[50px] md:h-[60px] bg-black text-white text-[10px] sm:text-[12px] md:text-[16px] font-semibold md:py-5 px-12 rounded-full  sm:block hidden"
                  >
                    Download Image
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < allGeneratedImages.length && (
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

        {/* Content Section */}
        <DetailSection
          title="Create Stunning Visuals with AI Image Generator"
          description="Bring your ideas to life with our powerful AI Image Generator. Whether you're designing marketing materials, crafting unique artwork, or enhancing your digital content, this tool simplifies the creative process by transforming your imagination into high-quality visuals in seconds."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does the AI Image Generator Work?"
          explanation={[
            "The AI Image Generator uses advanced machine learning algorithms to turn your text descriptions into visual creations. By processing your input through Natural Language Processing (NLP), the AI understands the key elements, context, and style you’re envisioning. It then generates an image using powerful models like Generative Adversarial Networks (GANs), trained on vast datasets to create unique visuals based on your description.",
            "Once the image is generated, the AI fine-tunes it for optimal quality, adjusting details like colors, textures, and composition to match your vision. In just seconds, you receive a high-resolution image, ready for use in your projects. The whole process is quick, efficient, and produces professional-grade results without the need for traditional design tools.",
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

export default ImageGenerator;
