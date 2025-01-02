"use client"

import { useState } from "react";
import Link from "next/link";
const BlogDetails = ({ pageData }) => {
  const [isCopied, setIsCopied] = useState(false);


  const formatTextWithImage = (text, image) => {
    // Find the position of the first newline
    const firstNewlineIndex = text.indexOf("<br/>");

    // Function to apply formatting
    const applyFormatting = (textToFormat) => {
      return textToFormat
        .replace(/(\*\*)(.*?)\1/g, '<strong>$2</strong>') // Bold text using **bold**
        .replace(/^(#{1,6})\s(.*)$/gm, (match, p1, p2) => {
          const level = p1.length; 
          return `<h${level} class="text-lg sm:text-xl md:text-${level * 2}xl" style="text-align: center; font-size: ${level}em;"><strong>${p2}</strong></h${level}>`;
        })
        .replace(/\n/g, '<br />'); 
    };

    if (firstNewlineIndex !== -1) {
      // Split text into two parts: before and after the first newline
      const beforeNewline = text.slice(0, firstNewlineIndex);
      const afterNewline = text.slice(firstNewlineIndex);

      // Add the image before the first newline
      const textWithImage = `
        ${beforeNewline}
        <img src="${image}" alt="Example" />         
        ${afterNewline}
      `;

      // Return formatted text
      return applyFormatting(textWithImage);
    }

    // If no newline exists, just format the entire text
    return applyFormatting(text);
  };
  

  const handleCopy = () => {
    navigator.clipboard.writeText(pageData.text);  
    setIsCopied(true); // Change icon to right mark
     setTimeout(() => setIsCopied(false), 3000);
  };

  const handleDownload = (imageUrl) => {
    // Use provided imageUrl or fallback to generatedImage
    const urlToDownload = imageUrl || generatedImage;
  
    if (!urlToDownload) {
      alert("No image available to download.");
      return;
    }
  
    // Add a cache-busting parameter to the URL
    const cacheBustedUrl = `${urlToDownload}?t=${Date.now()}`;
  
    fetch(cacheBustedUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
  
        // Determine file extension based on MIME type
        const extension = blob.type.includes("jpeg") ? "jpg" : "png";
        const filename = `generated-image.${extension}`;
  
        // Set up link attributes
        link.href = url;
        link.setAttribute("download", filename);
        link.style.display = "none"; // Hide the link element
  
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  
        // Release the object URL
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
        alert("An error occurred while downloading the image. Please try again.");
      });
  };



  return (
    <main className="mt-5 md:mt-5 mx-auto px-4">
      <div className="container  mx-auto max-w-[100%] md:max-w-[80%] bg-transparent mb-32">
        
           {/* Back Arrow */}
           <div className="flex flex-col mt-28 mb-5 ">
            <Link href="/tools/blog-generator">
            <div className="flex items-center space-x-2">
              <img src="/images/back-arrow.svg" alt="Back" className="w-8 h-8" />
              <span className="text-sm md:text-base">Back</span>
            </div>
            </Link>
          </div>
          
          <div className="relative flex items-center inline-block mx-auto">
            <img
              src={pageData.image_url}
              alt="Blog"
              className=" flex items-center h-auto mx-auto"
            />
            {/* Download Button */}
            <button
              onClick={() => handleDownload(pageData.image_url)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm md:text-base font-bold py-2 px-4 opacity-0 hover:opacity-100 transition-opacity rounded-t"
            >
              Download Image
            </button>
          </div>


       


        <div className="relative p-4 rounded-lg mt-8 mb-4">
            {/* Title */}
            <h2 className="md:text-3xl text-2xl font-semibold mb-4 text-center">
              Input Title : {pageData.title || "Blog Title"}
            </h2>

            {/* Buttons */}
            <div className="flex md:absolute md:top-1 md:right-7 md:space-x-4 justify-center space-x-4 md:justify-end mt-4 md:mt-0">
              {/* Copy Button */}
              <button
                className="bg-gray-200 rounded-lg p-4"
                onClick={handleCopy}
                aria-label="Copy text"
                style={{ zIndex: 1 }}
              >
                <img
                  src={isCopied ? "/images/check.png" : "/images/Copy.png"}
                  alt={isCopied ? "Copied" : "Copy"}
                  className="w-6 h-6"
                />
              </button>

              {/* Share Button */}
              <button
                className="bg-gray-200 rounded-lg p-4"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: document.title,
                      text: "Check out this page!",
                      url: window.location.href,
                    })
                      .then(() => console.log("Page shared successfully!"))
                      .catch((error) => console.error("Error sharing the page:", error));
                  } else {
                    const currentUrl = window.location.href;
                    navigator.clipboard.writeText(currentUrl);
                    alert(
                      "Sharing is not supported in your browser. The page link has been copied to your clipboard instead."
                    );
                  }
                }}
                aria-label="Share this page"
                style={{ zIndex: 1 }}
              >
                <img
                  src="/images/share.svg"
                  alt="Share"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

       


          <div
            className="w-full justify-center text-gray-800 bg-gray-50 p-4 rounded-md " // Ensures no overlap
            dangerouslySetInnerHTML={{
              __html: formatTextWithImage(pageData.text, pageData.image_url),
            }}
          />

        <div className="flex flex-col mt-10 mb-5 items-center ">
            <Link href="/tools/blog-generator">
            <div className="flex items-center space-x-2">
              <img src="/images/back-arrow.svg" alt="Back" className="w-8 h-8" />
              <span className="text-sm md:text-base">Back</span>
            </div>
            </Link>
        </div>
        
      </div>
    </main>
  );
};

export default BlogDetails;