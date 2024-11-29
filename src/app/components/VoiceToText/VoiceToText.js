"use client"
import freeForever from "@/app/images/freeForever.svg"
import Image from "next/image";
import BannerLine from "../Tools/BannerLine";
import React, { useState, useCallback } from "react";
import NavigationButton from "@/app/(pages)/tools/NavigationButton/NavigationButton";
import google_voice from "@/app/images/google_voice.svg"
import voice_text from "@/app/images/voice_text.svg"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const NEXT_PUBLIC_BE_URL= process.env.NEXT_PUBLIC_BE_URL

const VoiceToTextConverter = () => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const [uploadStatus, setUploadStatus] = useState("");
    const [dragError, setDragError] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false); 
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

    const TextAnalyzer = () => {

      // Calculate word count
      const wordCount = textData.trim().split(/\s+/).length;
      setwordCount(wordCount)

      // Calculate sentence count
      const sentenceCount = textData
        .split(/[.!?]+/)
        .filter((sentence) => sentence.trim().length > 0).length;
      sentenceCount(sentenceCount)
      
      
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
          console.log(doc_url_list)
  
          // Check if doc_url_list is empty
          if (!doc_url_list || doc_url_list.length === 0) {
            setUploadStatus("Upload failed: doc_url_list is empty.");
            return;
          }
  
          setUploadStatus("Upload successful!");
          // Call voice_to_text API
          const voiceResponse = await fetch(`${NEXT_PUBLIC_BE_URL}/voice_to_text`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ audio_url: doc_url_list[0] }), // Pass audio URL
          });

          if (!voiceResponse.ok) {
            throw new Error("Voice-to-text conversion failed");
          }

          const voiceData = await voiceResponse.json();
          setTextData(voiceData.text_data); 
          console.log("Text generated:", voiceData.text_data);
        
          setIsSuccess(true);
          TextAnalyzer();
     

          } else {
            setUploadStatus("Upload failed...");
            alert("Error: Upload failed.");
          }
      } catch (error) {
        setUploadStatus("Error: An unexpected error occurred during upload.");
        setIsDisabled(false); 
      }
      finally {
        setIsUploading(false); 
        setIsDisabled(false); 
        setFile(null)

      }
    };

  return (
    <main className="flex mt-32 justify-center">
      
      <div className="container mx-auto max-w-6xl px-4">
        <Image className="mx-auto mb-5 mt-5" src={freeForever} alt="free-forever" width={"auto"} />
        
          <div>
              
                <p className="text-4xl md:text-5xl font-bold mb-5 w-full max-w-[80%] mx-auto font-Urbanist text-[54px]">Convert Your Voice into Words with Ease.</p>
                <BannerLine mLeft={"auto"} mRight={"410px"}/>

                    <p className="text-center b-8  w-full max-w-[90%] mx-auto mt-2 font-Urbanist font-normal text-[24px]">
                        Effortlessly transcribe spoken words into <span className="bg-clip-text text-transparent bg-text-theme-gradient">Accurate Text</span> with AI.
                    </p>
          </div>

              <div className="flex items-center gap-2 mt-6">
                    <p className="text-[#3B82F6]  items-center mb-2 gap-4 font-bold font-Urbanist text-[24px]">Other Tools:</p>
                    <div className="flex flex-wrap gap-2">
                      {/* <NavigationButton img={google_voice} href={"/tools/text-to-voice/"} name={"AI Text To Voice"} bgColor={'#FFFFFF'}/> */}
                      <NavigationButton img={voice_text} href={""} name={"AI Voice To Text"} bgColor={'#FFFEEE'}/>
                    </div>
                    
              </div>
        <div className="border border-gray-300 rounded-md mt-5 h-[300px] p-4 max-w-[100%] mx-auto mb-2">
          <div onDrop={onDrop} onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onClick={() => document.querySelector('input[type="file"]').click()}
                      className={`
                        w-[100%] bg-[#FAFAFA] border-2 border-dashed rounded-xl cursor-pointer mb-1 h-[200px]
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
            <h3 className="flex mx-auto mt-8 justify-center">
              <img src="/images/audio-icon.png" alt="voice to text" className="h-12" />
            </h3>
            <h3 className="text-center font-Urbanist font-semibold leading-[24px] mt-2 text-[24px] text-[#1D4ED8]">
              Upload Your Audio File
            </h3>
            <h6 className="text-center font-Urbanist font-medium leading-[24px] mt-3 text-[16px] text-[#212121]">
              Drag or Upload Audio Files  (Max. 5MB)
            </h6>
            
          </div>
          <div>
          <button
              onClick={(e) => {
                uploadFile();
                e.stopPropagation();
              }}
              className={`
                w-[120px] h-[44px] rounded-[100px] font-medium text-center font-Urbanist text-[16px] text-white
                transition-colors duration-200 float-right mt-4 mr-4
                ${
                  file && !isDisabled
                    ? "bg-[#212121] hover:opacity-90"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
              disabled={!file || isDisabled || isUploading} 
            >
              {isUploading ? (
                <div className="flex justify-center items-center">
                
                <img src="/images/processing.png" alt="voice to text processing" className="h-12 mx-auto" />
                </div>
              ) : "Proceed"}
            </button>

          </div>
          
          
        </div>
         
       

        {isSuccess && ( 
            <div className="mx-auto max-w-[100%] text-center mt-2 ">
              <p className="text-xl mt-2 mb-5 max-w-[90%] mx-auto font-Urbanist text-[32px]">
                Your{" "}
                <span className="bg-clip-text text-transparent bg-text-theme-gradient">
                  Text
                </span>{" "}
                is Ready.
              </p>
              <div className="relative border border-gray-300 rounded-md mt-2 h-[250px] p-4 max-w-[100%] mx-auto mb-2">
                <p className="text-lg">{textData}</p>
                <button onClick={handleCopy}>
                <img 
                  src="/images/copy.svg" 
                  alt="copy" 
                  className="absolute bottom-2 right-2 w-6 h-6"
                />
               

                </button>

                <div className="absolute rounded-md bg-[#FAFAFA] border border-gray-300 bottom-2 left-2 px-2 py-1 whitespace-nowrap text-sm">
  {sentenceCount} Sentences | {wordCount} Words
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