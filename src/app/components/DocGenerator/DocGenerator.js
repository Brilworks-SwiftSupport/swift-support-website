"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";
import axios from "axios";
import mammoth from "mammoth";
const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

// Dynamically import DocViewer for client-side rendering
const DocViewer = dynamic(() => import("react-doc-viewer"), { ssr: false });

const DocGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [docContent, setDocContent] = useState("");
  const [docUrl, setDocUrl] = useState(null);

  const handleGenerateDocument = async () => {
    if (!title) {
      alert("Please provide both title and description.");
      return;
    }

    setLoading(true);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post(
        `${NEXT_PUBLIC_BE_URL}/generate_document`,
        {
          text: title,
          description: description,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      
      setDocContent(response.data.text)
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({ text: title, heading: "Heading1" }),
                new Paragraph({ text: response.data.text }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc); // Convert doc to Blob
      const url = URL.createObjectURL(blob); // Create Object URL
      setDocUrl(url); // Save URL for preview and download
    } catch (error) {
      console.error("Error generating document:", error);
      alert("Failed to generate the document. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDocument = async () => {
    if (!docContent) {
      alert("No document available to download.");
      return;
    }

    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(docContent)],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title || "document"}.docx`);
    alert("Your document has been downloaded!");
  };

  return (
    <main className="mt-12 md:mt-32">
      <div className="container mx-auto max-w-[100%] md:max-w-[80%] bg-transparent mb-32">
        <h1 className="text-center text-2xl sm:text-3xl md:text-[54px] font-urbanist font-bold leading-[1.2] mb-4 mt-6 md:mt-12">
          Generate, Preview, Edit, and Download Document
        </h1>

        {/* Form Section */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-3 text-gray-800 bg-gray-100 shadow-sm outline-none rounded-[8px]"
          />
          <textarea
            placeholder="Enter Document Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-40 px-4 py-3 text-gray-800 bg-gray-100 shadow-sm outline-none rounded-[8px] mb-4"
          />
          <button
            onClick={handleGenerateDocument}
            className={`px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Document"}
          </button>
        </div>

        {docUrl && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Preview Document</h2>

          {/* Embed the document for preview */}
          <iframe
            src={docUrl}
            className="w-full h-96 border"
            title="Document Preview"
          ></iframe>

         
        </div>
      )}

        {/* Document Editor */}
        {docContent && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Edit Document:</h2>
            <textarea
              value={docContent}
              onChange={(e) => setDocContent(e.target.value)}
              className="w-full h-40 px-4 py-3 text-gray-800 bg-gray-100 shadow-sm outline-none rounded-[8px] mb-4"
            />
            <button
              onClick={handleDownloadDocument}
              className="px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-gray-600 transition duration-300"
            >
              Download Edited Document
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default DocGenerator;
