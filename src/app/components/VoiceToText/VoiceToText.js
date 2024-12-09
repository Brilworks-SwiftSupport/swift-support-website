"use client";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import freeForever from "@/app/images/freeForever.svg";
import textToVoice from "@/app/images/textToVoice.svg";
import voiceToText from "@/app/images/voiceToText.svg";
import imgGenerator from "@/app/images/imgGenerator.svg";
import tools from "@/app/images/tools.svg"

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const VoiceToTextConverter = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const [uploadStatus, setUploadStatus] = useState("");
  const [dragError, setDragError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing.");
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [textData, setTextData] = useState("");
  const [wordCount, setwordCount] = useState(0);
  const [sentenceCount, setsentenceCount] = useState(0);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer?.files || e.target.files;
    if (files?.[0]) {
      const selectedFile = files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setUploadStatus(
          "File size exceeds 5 MB. Please upload a smaller file."
        );
        setDragError(true);
        alert("Error: File size exceeds 5 MB. Please upload a smaller file.");
      } else {
        setFile(selectedFile);
        setDragError(false);
        setIsDisabled(false);
      }
    }
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);

    const files = e.dataTransfer?.files;
    if (files?.[0] && files[0].size > MAX_FILE_SIZE) {
      setDragError(true);
    } else {
      setDragError(false);
      setIsDisabled(false);
    }
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    setDragError(false);
  }, []);

  useEffect(() => {
    if (isUploading) {
      const intervalId = setInterval(() => {
        setLoadingText((prevText) => {
          if (prevText === "Processing") {
            return "Processing .";
          } else if (prevText === "Processing .") {
            return "Processing . .";
          } else if (prevText === "Processing . .") {
            return "Processing . . .";
          } else {
            return "Processing";
          }
        });
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [isUploading]);

  const handleCopy = () => {
    navigator.clipboard.writeText(textData);
    toast.success("Text copied to clipboard!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const TextAnalyzer = (text) => {
    const wordCount = text
      .replace(/[^\S\r\n]+/g, " ")
      .trim()
      .split(" ")
      .filter((word) => word.length > 0).length;

    setwordCount(wordCount);

    // Calculate sentence count
    const sentenceCount = text
      .split(/[.!?]+/)
      .filter((sentence) => sentence.trim().length > 0).length;
    sentenceCount(sentenceCount);
  };

  const uploadFile = async () => {
    if (!file) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf_files", file);

    try {
      setUploadStatus("Uploading...");
      setIsDisabled(true);
      setIsUploading(true);

      const uploadResponse = await fetch(
        `${NEXT_PUBLIC_BE_URL}/upload_document`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (uploadResponse.ok) {
        const uploadData = await uploadResponse.json();
        const doc_url_list = uploadData.s3_url;

        if (!doc_url_list || doc_url_list.length === 0) {
          setUploadStatus("Upload failed: doc_url_list is empty.");
          return;
        }

        setUploadStatus("Upload successful!");
        const voiceResponse = await fetch(
          `${NEXT_PUBLIC_BE_URL}/voice_to_text`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ audio_url: doc_url_list[0] }),
          }
        );

        if (!voiceResponse.ok) {
          throw new Error("Voice-to-text conversion failed");
        }

        const voiceData = await voiceResponse.json();
        setTextData(voiceData.text_data);

        setIsSuccess(true);
        TextAnalyzer(voiceData.text_data);
      } else {
        setUploadStatus("Upload failed...");
        alert("Error: Upload failed.");
      }
    } catch (error) {
      setUploadStatus("Error: An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
      setIsDisabled(false);
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
          <span className="inline-block md:mb-6">Create Your</span>{" "}
          <span className="relative inline-block mb-2 md:mb-6">
            Voice into Words
            <div className="absolute left-0 banner-underline md:!mt-2 !w-[210px] md:!w-[675px] !max-w-none"></div>{" "}
          </span>{" "}
          <span className="inline-block md:mb-4"> with Ease.</span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-center text-[#212121] font-urbanist font-medium text-sm sm:text-base md:text-[24px] mt-6 md:mt-10 px-4">
          Effortlessly transcribe spoken words into{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            Accurate Text
          </span>{" "}
          with AI.
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
              name={"AI Voice to Text"}
              bgColor={"#FFFEEE"}
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

        <div className="border border-gray-300 rounded-md mt-5 h-[245px] p-4 max-w-[100%] mx-auto mb-2">
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => document.querySelector('input[type="file"]').click()}
            className={`
      w-[100%] bg-[#FAFAFA] border-2 border-dashed rounded-xl cursor-pointer mb-1 h-[165px]
      transition-all duration-200 ease-in-out 
      ${isDragActive ? "border-[#E4E4E4]" : "hover:border-[#1D4ED8]"}
    `}
          >
            <input
              type="file"
              className="hidden"
              accept=".wav, .mp3"
              onChange={onDrop}
            />
            {file ? (
              <div className="flex items-center justify-center mt-[60px] mb-[28px] px-4">
                <div className="flex items-center bg-blue-100 rounded-lg p-2 max-w-[600px]">
                  <span className="mr-4 truncate">{file.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.reload(); // Refresh the page
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="w-8 h-8 mx-auto mt-4 text-[#1D4ED8] font-rehular">
                  <img src="/images/audio-icon.png" alt="upload icon" />
                </h3>
                <h3 className="text-center font-Urbanist font-semibold leading-[24px] mt-2 text-[24px] text-[#1D4ED8]">
                  Upload Your Audio File
                </h3>
                <h6 className="text-center font-Urbanist font-medium leading-[24px] mt-3 text-[16px] text-[#212121]">
                  Drag or Upload Audio Files <br /> MP3 or WAV , Maximum 5MB
                  each
                </h6>
              </>
            )}
          </div>
          <div>
            <button
              onClick={(e) => {
                uploadFile();
                e.stopPropagation();
              }}
              className={`w-[106px] h-[46px] rounded-[100px] font-medium text-center font-Urbanist text-[16px] transition-colors duration-200 float-right mt-1 ${
                file && !isUploading
                  ? "bg-[#212121] text-white hover:opacity-90"
                  : "bg-gray-300 text-white cursor-not-allowed"
              } ${
                isUploading
                  ? "border border-black w-[126px] h-[46px] bg-white"
                  : ""
              }`}
              disabled={!file || isUploading}
            >
              {isUploading ? (
                <div className="flex items-center justify-center w-full h-full">
                  <span className="bg-clip-text text-transparent bg-text-theme-gradient">
                    {loadingText}
                  </span>
                </div>
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        </div>

        {isSuccess && (
          <div className="mt-16 w-full px-2 border border-[#E4E4E4] rounded-3xl">
            <div className="flex flex-col items-center">
              <p className="text-center text-[#212121] font-urbanist font-medium text-lg sm:text-xl md:text-[36px] mt-2 md:my-5">
                Your{" "}
                <span className="bg-clip-text text-transparent bg-text-theme-gradient">
                  Text
                </span>{" "}
                is Ready.
              </p>

              {/* Text Display Section */}
              <div className="relative border border-gray-300 rounded-3xl mt-2 md:mt-0 h-[250px] p-4 w-[100%] mx-auto mb-2 overflow-auto">
                {/* Text Content */}
                <p className="text-lg break-words whitespace-pre-wrap">
                  {textData}
                </p>

                {/* Copy Button */}
                <button onClick={handleCopy}>
                  <img
                    src="/images/copy.svg"
                    alt="copy"
                    className="absolute bottom-2 right-2 w-6 h-6"
                  />
                </button>

                {/* Sentence and Word Count */}
                <div className="absolute rounded-md bg-[#FAFAFA] border border-gray-300 bottom-2 left-2 px-2 py-1 whitespace-nowrap text-sm">
                  {sentenceCount} Sentences | {wordCount} Words
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </main>
  );
};

export default VoiceToTextConverter;
