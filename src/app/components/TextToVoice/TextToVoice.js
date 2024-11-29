"use client"
import React, { useState } from "react";
import freeForever from "@/app/images/freeForever.svg"
import Image from "next/image";
import BannerLine from "../Tools/BannerLine";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";

import google_voice from "@/app/images/google_voice.svg"
import voice_text from "@/app/images/voice_text.svg"
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const TextToVoiceConverter = () => {

  const [inputText, setInputText] = useState(""); // Text input state
  const wordLimit = 2000; // Set the word limit
  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length; // Count words
  const [selectedOption, setSelectedOption] = useState(null)

  const handleInputChange = (e) => {
    const words = e.target.value.split(/\s+/).filter((word) => word.length > 0); // Split input into words
    if (words.length <= wordLimit) {
      setInputText(e.target.value); // Allow input if word count is within the limit
    }

  };

  const handleChange = (selectedOption) => {

    setSelectedOption(selectedOption)

  };




  return (
    <main className="flex mt-32 justify-center">

      <div className="container mx-auto max-w-6xl px-4">
        <Image className="mx-auto mb-5 mt-5" src={freeForever} alt="free-forever" width={"auto"} />

        <div>

          <p className="text-4xl md:text-5xl font-bold mb-5 w-full max-w-[80%] mx-auto font-Urbanist text-[54px]">Convert Your Voice into Words with Ease.</p>
          <BannerLine mLeft={"auto"} mRight={"410px"} />

          <p className="text-center text-gray-600 b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px]">
            Effortlessly transcribe spoken words into <span className="bg-clip-text text-transparent bg-text-theme-gradient">Accurate Text</span> with AI.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-11">
          <p className="text-[#3B82F6] font-bold whitespace-nowrap font-Urbanist text-[24px]">Other Tools:</p>
          <div className="flex flex-wrap gap-2">
            <NavigationButton img={google_voice} href={""} name={"AI Text To Voice"} bgColor={'#FFFEEE'} />
            <NavigationButton img={voice_text} href={"/tools/voice-to-text/"} name={"AI Voice To Text"} bgColor={'#FFFFFF'} />
            <NavigationButton img={voice_text} href={"/tools/image-generator/"} name={"AI Image Generator"} bgColor={'#FFFFFF'} />

          </div>

        </div>


        <div className="border border-gray-300 rounded-md mt-5 h-[350px] p-4 max-w-[100%] mx-auto mb-2">
            <p className="mb-2 mt-2">Voice Assistant</p>
            <Select
              placeholder="Select Voice Assistant"
              defaultValue={selectedOption}
              onChange={handleChange}
              options={options}
              className="mb-2 rounded-md"
              isMulti
              isSearchable/>

            <p className="mb-2 mt-2">Voice Format</p>
            <Select
              placeholder="Select Voice Format"
              defaultValue={selectedOption}
              onChange={handleChange}
              options={options}
              className="mb-2 rounded-md"
              isMulti
              isSearchable/>

          <div className="mb-3 mt-3">
            <p className="mb-2">Script:</p>
            <textarea
              name="content"
              id="content"
              placeholder="Paste your content here ..."
              className="w-[97%] h-[50px] py-3 px-4 text-gray-800 bg-white shadow-sm outline-none rounded-[20px] text-left leading-tight border border-[#E4E4E4] resize-none"
              value={inputText}
              onChange={handleInputChange} // Use the state for the textarea value
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

          <div className="relative p-4 w-6 max-w-[100%] mx-auto">
            <button className="absolute rounded rounded-md w-[120px] h-[30px] bottom-2 right-2 bg-gray-300 cursor-not-allowed mx-auto">
              Create Audio
            </button>
                
          </div>

          

        </div>


      </div>
    </main>
  );
};

export default TextToVoiceConverter;