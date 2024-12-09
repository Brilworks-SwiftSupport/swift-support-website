"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BannerLine from "../Tools/BannerLine";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import axios from "axios";

import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import tools from "@/app/images/tools.svg"

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const TextToVoiceConverter = () => {
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState({
    value: "",
    label: "",
    audio_url: "",
  });
  const [updateData, setUpdateData] = useState(null);
  const [voiceName, setVoiceName] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [voiceId, setVoiceId] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [voiceFormat, setVoiceFormatOptions] = useState([
    { value: "mp3", label: "MP3" },
  ]);

  const audioRef = useRef(null);

  const [inputText, setInputText] = useState(""); // Text input state
  const wordLimit = 500; // Set the word limit
  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; // Count words
  const [selectedVoiceFormat, setVoiceFormat] = useState("");
  const [playedVoice, setPlayedVoice] = useState();

  const handleButtonClick = async () => {
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
      const response = await axios.post(`${NEXT_PUBLIC_BE_URL}/text_to_voice`, {
        text: inputText,
        voice: voiceId,

        headers: {
          "Content-Type": "application/json",
        },
      });
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
      const audio_url = response.data.audio_url;
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
  };

  const handleDownload = (audioUrl) => {
    fetch(audioUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "downloaded-file.mp3"; // Set a default file name
        link.click();
        window.URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((error) => console.error("Download failed:", error));
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
          <div className="flex items-center flex-wrap gap-2 ml-[62px] md:ml-0">
            <NavigationButton
              width={"w-[181px]"}
              img={textToVoice}
              name={"AI Text to Voice"}
              bgColor={"#FFFEEE"}
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
              href={"/tools/image-generator/"}
              name={"AI Image Generator"}
              bgColor={"#FFFFFF"}
            />
            <NavigationButton width={"w-[181px] md:w-[135px]"} img={tools} href={"/tools/"} name={"Other Tools"} bgColor={'#FFFFFF'}/>
          </div>
        </div>

        <div className="border border-gray-300 rounded-md mt-5 h-[400px] p-4 max-w-[100%] mx-auto mb-2">
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

          <p className="mb-2 mt-2">Voice Format</p>
          <Select
            placeholder="Select Voice Format"
            defaultValue={voiceFormat}
            onChange={handleChange}
            options={voiceFormat}
            className="mb-2 rounded-[20px]"
            isSearchable
          />

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
              className="text-gray text-sm bg-[#F1F5F9] ml-7 px-2 py-1 rounded-lg shadow"
              style={{ bottom: "10px", right: "10px" }}
            >
              {wordCount} of {wordLimit} words used
            </span>
          </div>

          <div className="relative items-center p-4  max-w-[100%] mx-auto">
            <button
              onClick={handleButtonClick}
              className={`absolute rounded-md w-[120px] h-[30px] bottom-2 right-2 ${
                inputText.trim()
                  ? "bg-black cursor-pointer text-white"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!inputText.trim()} // Button is disabled if inputText is empty
            >
              Create Audio
            </button>
          </div>
        </div>

        {isSuccess && (
          <div className="text-center border border-gray-300 rounded-md mt-5 h-[200px] p-4 max-w-[100%] mx-auto mb-2">
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

            <div className="relative items-center p-4  max-w-[100%] mx-auto mt-4">
              <button
                onClick={() => handleDownload(audioUrl)}
                className={`absolute rounded-md w-[125px] h-[25px] bottom-2 right-2 bg-black cursor-pointer text-white`}
              >
                Download Audio
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </main>
  );
};

export default TextToVoiceConverter;
