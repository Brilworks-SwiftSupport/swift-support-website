"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import HandleText from "../Tools/HandleText";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import axios from "axios";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";

import freeForever from "@/app/images/freeForever.svg";
import humanLikeVoices from "@/app/images/human_like_voices.svg";
import realTimeProcessing from "@/app/images/real_time_processing.svg";
import downloadableAudioFiles from "@/app/images/audio_file_uploads.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import tools from "@/app/images/tools.svg";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const TextToVoiceConverter = ({TTSrecords =[]}) => {
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState({
    value: "",
    label: "",
    audio_url: "",
  });
  const [updateData, setUpdateData] = useState(null);
  const [voiceName, setVoiceName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [voiceId, setVoiceId] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [voiceFormat, setVoiceFormatOptions] = useState([
    { value: "mp3", label: "MP3" },
  ]);
  const audioRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [inputText, setInputText] = useState(""); // Text input state
  const wordLimit = 500; // Set the word limit
  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; // Count words
  const [selectedVoiceFormat, setVoiceFormat] = useState("");
  const [playedVoice, setPlayedVoice] = useState();
  const [visibleCount, setVisibleCount] = useState(3); // Initial 6 items for a 3x2 grid
  const [canClick, setCanClick] = useState(true); 

  const [activeFAQ, setActiveFAQ] = useState(null);

  const features = [
    {
      icon: humanLikeVoices,
      title: "Human-Like Voices",
      description:
        "Enjoy high-quality, natural-sounding audio that mimics real human speech, adding warmth and clarity to your content.",
    },
    {
      icon: realTimeProcessing,
      title: "Real-Time Processing",
      description:
        "Instantly convert text into audio with fast and efficient processing, perfect for live scenarios or dynamic updates.",
    },
    {
      icon: downloadableAudioFiles,
      title: "Downloadable Audio Files",
      description:
        "Export and download audio files in MP3 formats for use in presentations, podcasts, e-learning courses, and more.",
    },
  ];

  const faqItems = [
    {
      question: "What is Text-to-Speech (TTS) technology?",
      answer:
        "Text-to-speech (TTS) technology converts written text into spoken words using advanced AI algorithms. It enables content to be audibly delivered in a natural-sounding voice, improving accessibility and engagement.",
    },
    {
      question: "How accurate is the voice conversion?",
      answer:
        "Our AI-powered Text-to-Speech tool is highly accurate, providing clear, lifelike speech with minimal errors. It handles diverse pronunciations, accents, and complex words for accurate results.",
    },
    {
      question: "Can I use Text-to-Speech for commercial purposes?",
      answer:
        "Yes, you can use the audio generated for various commercial purposes such as podcasts, presentations, videos, and more. Please check the licensing terms for specific usage details.",
    },
    {
      question: "Is there any payment required?",
      answer:
        "No, you do not need to provide any credit card details or make any payments. Our Text-to-Speech tool is completely free to use with no hidden charges.",
    },
    {
      question: "Do I need to create an account to use the tool?",
      answer:
        "No, there is no need to create an account or log in. You can start using the SwiftSupport text-to-speech tool immediately without any registration process.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 6 more items
  };

  const handleButtonClick = async () => {
    if (!canClick || !inputText.trim()) return;
    setLoading(true);
    setCanClick(false);

    try {
      if (!inputText.trim()) {
        toast.error("Please enter the text before creating audio!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const response = await axios.post(
          `${NEXT_PUBLIC_BE_URL}/text_to_voice`,
          {
            text: inputText,
            voice: voiceId,

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.status == 200) {
          toast.error("Not able to generate audio file", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
        const audio_url = response.data.file_url;
        setAudioUrl(audio_url);

        setIsSuccess(true);

        toast.success("Audio is being created!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      // Handle success logic here, if any
    } catch (error) {
      // Handle error here
      console.error(error);
    } finally {
      setTimeout(() => {
        setCanClick(true); // Re-enable button after 5 seconds
        setLoading(false); // Reset loading state
      }, 5000);
    }
  };

  const handleDownload = (audioUrl) => {
    if (!audioUrl) {
      alert("No audio URL provided.");
      return;
    }
  
    const cacheBustedUrl = `${audioUrl}?t=${Date.now()}`;
  
    fetch(cacheBustedUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
  
        // Set download file name dynamically or use default
        link.download = audioUrl.split("/").pop() || "downloaded-file.mp3";
  
        // Trigger download
        link.style.display = "none"; // Hide the link element
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Release the URL object to free up memory
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download failed:", error);
        alert("Failed to download the audio. Please try again.");
      });
  };
  
  

  const handleInputChange = (e) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0);
    if (words.length <= wordLimit) {
      setInputText(e.target.value);
    }
  };
  const handleVoiceChange = (selectedOption) => {
    const voice_name = selectedOption.label;
    const voice_id = selectedOption.value;
    setVoiceName(voice_name);
    setVoiceId(voice_id);
    setSelectedVoice(selectedOption);
    setUpdateData(() => ({}));
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayedVoice("");
  };

  const CustomOption = ({ innerRef, innerProps, data }) => {
    const handlePlay = () => {
      setPlayedVoice(data.label);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(data.audio_url);
      audioRef.current.pause();
      audioRef.current.play();
      audioRef.current.onended = () => {
        setPlayedVoice("");
      };
    };

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center justify-between px-3 py-2 border-b last:border-none"
      >
        <span>{data.label}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlay();
          }}
          className="ml-3 cursor-pointer"
        >
          {playedVoice === data.label ? `⏹` : `▶️`}
        </button>
      </div>
    );
  };

  const getVoiceList = async () => {
    try {
      const response = await axios.get("https://api.elevenlabs.io/v1/voices");
      const options = response.data.voices.map((voice) => ({
        value: voice.voice_id,
        label: voice.name,
        audio_url: voice.preview_url,
      }));
      setVoiceOptions(options);
      setSelectedVoice(options[0]);
      handleVoiceChange(options[0]);
    } catch (error) {
      console.error("Error fetching voice list:", error);
    }
  };

  const handleChange = (selectedOption) => {
    selectedVoiceFormat(selectedOption.value);
  };

  useEffect(() => {
    getVoiceList();
  }, []);

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
          <span>Bring </span>
          <span className="relative inline-block mb-2 md:mb-6">
            Text to Life{" "}
            <div className="absolute left-0 banner-underline md:!mt-2 !w-[200px] md:!w-[400px] !max-w-none"></div>
          </span>
          <span> with Realistic Voices.</span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-center text-[#212121] font-urbanist font-medium text-sm sm:text-base md:text-[24px] mt-6 md:mt-10 px-4">
          Convert text into high-quality,{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            Natural-sounding Audio
          </span>{" "}
          in seconds.{" "}
        </p>

        {/* Tools List */}
        <div className="flex flex-wrap gap-4 mt-[30px] md:mt-[56px] md:ml-12 px-4 md:px-0">
          <div className="flex items-center justify-center flex-wrap gap-2 md:-ml-8">
            <NavigationButton
              width={"w-auto"}
              img={textToVoice}
              name={"AI Text to Voice"}
              bgColor={"#FFFEEE"}
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
              img={tools}
              href={"/tools/"}
              name={"Other AI Tools"}
              bgColor={"#FFFFFF"}
            />
          </div>
        </div>

        <div className="border border-gray-300 rounded-md mt-5 p-4 max-w-[100%] mx-auto mb-4">
          <p className="mb-2 mt-2">Voice Assistant</p>
          <Select
            placeholder="Select Voice Assistant"
            defaultValue={selectedVoice}
            value={selectedVoice}
            onChange={handleVoiceChange}
            options={voiceOptions}
            components={{ Option: CustomOption }}
            className="mb-2 rounded-[20px]"
            isSearchable
          />

          {/* <p className="mb-2 mt-2">Voice Format</p>
          <Select
            placeholder="Select Voice Format"
            defaultValue={voiceFormat}
            onChange={handleChange}
            options={voiceFormat}
            className="mb-2 rounded-[20px]"
            isSearchable
          /> */}

          <div className="mb-3 mt-3">
            <p className="mb-2">Script:</p>
            <textarea
              name="content"
              id="content"
              placeholder="Paste your content here ..."
              className="w-[100%] h-[100px] py-3 px-4 text-gray-800 bg-white shadow-sm outline-none rounded-[20px] text-left leading-tight border border-[#E4E4E4] resize-none"
              value={inputText}
              onChange={handleInputChange} // Use the state for the textarea value
              required
            />
            {/* Word count displayed in the bottom-right corner */}
            <span
              className="text-gray text-sm bg-[#F1F5F9] px-2 py-1 rounded-lg shadow"
              style={{ bottom: "10px", right: "10px" }}
            >
              {wordCount} of {wordLimit} words used
            </span>
          </div>

          <div className="md:relative flex items-center justify-center p-4  md:mt-0 max-w-[100%] mx-auto">
            <button
              onClick={handleButtonClick}
              className={`md:absolute  rounded-full w-[260px] h-[46px] mx-auto md:bottom-2 md:right-2  font-urbanist font-semibold text-sm md:text-[14px] transition-colors ${inputText.trim()
                ? "common-button header-btn  cursor-pointer "
                : "bg-gray-300 cursor-not-allowed"
                }`}
              disabled={loading || !inputText.trim() || !canClick}
            >
              {loading ? "Creating Audio..." : "Create Audio"}
            </button>
          </div>
        </div>

        {isSuccess && audioUrl && (
          <div className="text-center border border-gray-300 rounded-md mt-5 h-[200px] p-4 max-w-[100%] mx-auto mb-4">
            <p className="text-xl mt-2 mb-5 max-w-[90%] mx-auto font-Urbanist text-[32px]">
              Your{" "}
              <span className="bg-clip-text text-transparent bg-text-theme-gradient">
                Voice
              </span>{" "}
              is Ready.
            </p>

            <audio controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

              <button
                onClick={() => handleDownload(audioUrl)}
                className="w-full py-3 rounded-full sm:w-auto  mx-auto p-4 bg-black cursor-pointer text-white text-sm sm:text-base flex justify-center items-center mt-2"
              >
                Download Audio
              </button>



          </div>
        )}

        <h2 className="text-center text-2xl sm:text-2xl md:text-3xl font-Urbanist mb-4 mt-8">
          Some{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            Text To Voice
          </span>{" "}
          for You!
        </h2>

        <div className="container mx-auto py-8 px-4">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TTSrecords.slice(0, visibleCount).map((tool, index) => (
              <div
                key={index}
                className="p-4 bg-white border border-[#E4E4E4] rounded shadow flex flex-col justify-between"
              >
                {/* Input Text */}
                <div className="w-full mb-4 text-black text-sm sm:text-base md:text-xl font-Urbanist space-y-4">
                  <HandleText text={tool.tts_text} type="Input Text :" />
                </div>

                {/* Output Audio */}
                <div className="flex flex-col mt-auto space-y-4">
                  <div>
                    <span className="text-sm sm:text-base md:text-xl font-Urbanist font-bold">
                      Output Audio:
                    </span>
                    <audio
                      id={`output-audio-${index}`}
                      controls
                      className="w-full bg-[#FFFEEE] mt-2"
                      onPlay={(e) => {
                        // Pause all other audio elements
                        const otherAudios = document.querySelectorAll(
                          "audio:not(#output-audio-" + index + ")"
                        );
                        otherAudios.forEach((audio) => {
                          audio.pause();
                        });
                        // Resume the current audio
                        e.target.play();
                      }}
                    >
                      <source src={tool.tts_url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Download Button */}
                  <button
                  onClick={() => handleDownload(tool.tts_url)}
                  className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition duration-300 h-[60px]"
                >
                  Download Audio
                </button>

                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < TTSrecords.length && (
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
          title="Bring Your Words to Life with Our Text-to-Speech AI"
          description="Experience the future of communication with our advanced Text-to-Speech AI tool. Whether you're looking to convert written content into natural-sounding audio for podcasts, tutorials, or accessibility purposes, our tool offers unparalleled voice quality and customization options."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="What is Text to Speech?"
          explanation={[
            "Text-to-speech (TTS) technology is artificial intelligence that converts written text into spoken words. Advanced algorithms transform digital content into audio in the form of natural human voices with incredible clarity. This technology is widely used to create audio content, enhance accessibility, and provide more engaging user experiences.",
            "From e-learning platforms to customer service applications, TTS is a simple way to make information more dynamic and inclusive for auditory learners and those with visual impairments. It's an all-around tool that closes the gap between written and spoken communication.",
          ]}
        />
        <FAQSection
          faqItems={faqItems}
          activeFAQ={activeFAQ}
          toggleFAQ={toggleFAQ}
        />
      </div>
      <ToastContainer />
    </main>
  );
};

export default TextToVoiceConverter;
