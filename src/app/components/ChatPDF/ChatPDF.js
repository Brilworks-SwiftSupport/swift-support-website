"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Upload, X } from "lucide-react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import DetailSection from "../Tools/Content/DetailSection";
import FeatureSection from "../Tools/Content/FeatureSection";
import UsageExplanationSection from "../Tools/Content/UsageExplanationSection";
import FAQSection from "../Tools/Content/FAQSection";
import freeForever from "@/app/images/freeForever.svg";
import askAndDiscover from "@/app/images/ask_and_discover.svg";
import intelligentSearch from "@/app/images/intelligent_search.svg";
import simplifyComplexFiles from "@/app/images/simplify_complex_files.svg";
import Image from "next/image";

const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

const DocumentsViewer = React.memo(({ doc }) => {
  return (
    <DocViewer
      pluginRenderers={DocViewerRenderers}
      documents={[
        {
          uri: doc,
          fileName: typeof doc === "string" ? doc.split("/").pop() : doc.name,
        },
      ]}
      config={{
        header: {
          disableHeader: false,
          disableFileName: false,
          retainURLParams: false,
        },
      }}
    />
  );
});
DocumentsViewer.displayName = "DocumentsViewer";

const ChatPDF = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [dragError, setDragError] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Processing.");

  const [isChatbotReady, setIsChatbotReady] = useState(false);
  const [agentId, setAgentId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState("");
  const [streamingResponse, setStreamingResponse] = useState("");

  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  const messagesEndRef = useRef(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  const [activeFAQ, setActiveFAQ] = useState(null);

  const features = [
    {
      icon: askAndDiscover,
      title: "Ask and Discover",
      description:
        "Upload your document and get precise answers to your questions without sifting through pages.",
    },
    {
      icon: intelligentSearch,
      title: "Intelligent Search",
      description:
        "Find the exact information you need from your document in an instant with AI-powered responses.",
    },
    {
      icon: simplifyComplexFiles,
      title: "Simplify Complex Files",
      description:
        "Break down lengthy or detailed documents into easy-to-understand answers for quick comprehension.",
    },
  ];

  const faqItems = [
    {
      question: "How do I upload a document?",
      answer:
        "You can drag and drop your document into the tool or use the upload option to add your file.",
    },
    {
      question: "What file types are supported?",
      answer:
        "Currently, the tool supports PDF and other common text-based document formats for seamless interaction.",
    },
    {
      question: "How accurate are the answers?",
      answer:
        "The tool uses advanced AI to provide highly accurate answers based on the document's content.",
    },
    {
      question: "Is there any payment required?",
      answer:
        "No, the tool is completely free to use. You don’t need to provide any credit card details or make payments.",
    },
    {
      question: "Do I need to create an account to use the tool?",
      answer:
        "No, there’s no need to create an account or log in. You can upload and ask questions instantly.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ((prev) => (prev === index ? null : index));
  };

  function timeout(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer?.files || e.target.files;
    if (files?.[0]) {
      const selectedFile = files[0];

      // Check if the file is a PDF
      if (selectedFile.type !== "application/pdf") {
        setUploadStatus("Only PDF files are allowed.");
        setDragError(true);
        alert("Error: Only PDF files are allowed.");
        return;
      }

      // Check file size
      if (selectedFile.size > MAX_FILE_SIZE) {
        setUploadStatus(
          "File size exceeds 5 MB. Please upload a smaller file."
        );
        setDragError(true);
        alert("Error: File size exceeds 5 MB. Please upload a smaller file.");
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setUploadStatus("");
        setDragError(false);
      }
    }
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);

    const files = e.dataTransfer?.files;
    if (files?.[0]) {
      // Check if the file is a PDF
      if (
        files[0].type !== "application/pdf" ||
        files[0].size > MAX_FILE_SIZE
      ) {
        setDragError(true);
      } else {
        setDragError(false);
      }
    }
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    setDragError(false);
  }, []);

  useEffect(() => {
    const fetchUploadedDocs = async () => {
      try {
        const response = await fetch(`${NEXT_PUBLIC_BE_URL}/uploaded_doc`);
        if (!response.ok) throw new Error("Failed to fetch uploaded documents");

        const data = await response.json();
        if (data && Array.isArray(data.uploaded_doc_list)) {
          setUploadedDocs(data.uploaded_doc_list);
        } else {
          console.error(
            "API response does not contain 'uploaded_doc_list':",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching uploaded documents:", error);
      }
    };
    fetchUploadedDocs();
  }, []);

  useEffect(() => {
    if (isProcessing) {
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
  }, [isProcessing]);

  const handleDownload = (docUrl) => {
    if (docUrl) {
      try {
        fetch(docUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
          })
          .then((blob) => {
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);

            // Set the href and download attributes for a PDF file
            link.href = url;
            link.setAttribute("download", "downloaded-document.pdf");

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Release the object URL
            URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.error("Error downloading PDF:", error);
            alert(
              "An error occurred while downloading the PDF. Please try again."
            );
          });
      } catch (error) {
        console.error("Unexpected error during PDF download:", error);
        alert(
          "An unexpected error occurred while downloading the PDF. Please try again."
        );
      }
    } else {
      alert("No document URL available to download.");
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const newMessages = [
      ...messages,
      { role: "user", content: currentMessage },
    ];
    setMessages(newMessages);
    setCurrentMessage("");
    setIsLoading(true);
    setStreamingResponse("");

    try {
      const queryPayload = {
        email: null,
        name: null,
        question: currentMessage,
        chat_id: chatId || "",
        question_timestamp: new Date().toISOString(),
      };

      const response = await fetch(
        `${NEXT_PUBLIC_BE_URL}/query/agent/${agentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queryPayload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      let chatIdFromResponse = "";

      while (true) {
        const { done, value } = (await reader?.read()) || {};

        if (done) break;

        const decodedChunk = decoder.decode(value, { stream: true });

        // Split the chunk into individual data lines
        const lines = decodedChunk.split("\n");

        lines.forEach((line) => {
          if (line.startsWith("data:")) {
            try {
              const jsonData = JSON.parse(line.slice(5).trim());

              // Parse only the answer
              if (jsonData.answer) {
                fullResponse += jsonData.answer;
                setStreamingResponse((prev) => prev + jsonData.answer);
              }

              // Capture chat_id from status message
              if (jsonData.status === "done" && jsonData.chat_id) {
                chatIdFromResponse = jsonData.chat_id;
              }
            } catch (parseError) {
              console.error("Error parsing JSON:", parseError);
            }
          }
        });
      }

      // Update chat ID if not already set
      if (chatIdFromResponse && !chatId) {
        setChatId(chatIdFromResponse);
      }

      // Add bot response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: fullResponse || "No response received.",
        },
      ]);

      // Clear streaming response
      setStreamingResponse("");
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, there was an error processing your message.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setUploadStatus("No file selected.");
      alert("Error: No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf_files", file);

    try {
      setIsProcessing(true);
      setProcessingProgress(0);
      setUploadStatus("Uploading...");

      // First API Call (Upload PDF)
      const uploadResponse = await fetch(`${NEXT_PUBLIC_BE_URL}/upload_pdf`, {
        method: "POST",
        body: formData,
      });

      // Simulate processing stages
      const updateProgress = (stage) => {
        switch (stage) {
          case "upload":
            setProcessingProgress(25);
            break;
          case "datastore":
            setProcessingProgress(75);
            break;
          case "agent":
            setProcessingProgress(99);
            break;
          case "complete":
            setProcessingProgress(100);
            break;
        }
      };

      if (uploadResponse.ok) {
        updateProgress("upload");
        const uploadData = await uploadResponse.json();
        const doc_url_list = uploadData.s3_url;

        // Check if doc_url_list is empty
        if (!doc_url_list || doc_url_list.length === 0) {
          setUploadStatus("Upload failed: doc_url_list is empty.");
          setIsProcessing(false);
          alert("Error: Upload failed as the document list is empty.");
          return;
        }

        // Set PDF Preview URL (first URL in the list)
        setPdfPreviewUrl(doc_url_list[0]);
        setShowPdfPreview(true);

        // Generate a unique source_name
        const uniqueSuffix = Math.random().toString(36).substring(2, 8);
        const sourceName = `chatpdf_${uniqueSuffix}`;

        // Second API Call (Datastore Creation)
        const datastorePayload = {
          token_required: false,
          source_name: sourceName,
          source_type: "pdf",
          visibility: "private",
          web_url: "",
          source_tag: [],
          doc_url_list: doc_url_list,
          page_url_list: [],
          excel_url_list: [],
          qna_list: [],
          answer_with_image: false,
        };

        const datastoreResponse = await fetch(
          `${NEXT_PUBLIC_BE_URL}/datastore`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datastorePayload),
          }
        );

        if (datastoreResponse.ok) {
          updateProgress("datastore");
          const datastoreData = await datastoreResponse.json();
          const datastoreId = datastoreData.source_id;
          const datastoreName = datastoreData.source_name;
          await timeout(5);

          // Third API Call (Agent Creation)
          const agentPayload = {
            token_required: false,
            agent_name: datastoreName,
            descriptions: datastoreName,
            datastore_list: [
              {
                datastore_id: datastoreId,
                datastore_name: datastoreName,
              },
            ],
            flow_id: null,
            flow_name: "",
            source_type: "datastore",
          };

          const agentResponse = await fetch(`${NEXT_PUBLIC_BE_URL}/agent`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(agentPayload),
          });

          if (agentResponse.ok) {
            updateProgress("agent");
            const agentData = await agentResponse.json();
            await timeout(3);
            setAgentId(agentData.agent_id);
            setIsChatbotReady(true);
            updateProgress("complete");
            setUploadStatus("Chatbot is ready!");
            setIsProcessing(false);
          } else {
            setUploadStatus("Failed to create agent.");
            setIsProcessing(false);
            alert("Error: Failed to create chatbot.");
          }
        } else {
          setUploadStatus("Failed to create datastore.");
          setIsProcessing(false);
          alert("Error: Failed to create chatbot.");
        }
      } else {
        setUploadStatus("Upload failed.");
        setIsProcessing(false);
        alert("Error: Upload failed.");
      }
    } catch (error) {
      setUploadStatus("Error occurred during upload.");
      setIsProcessing(false);
      alert("Error: An unexpected error occurred during upload.");
    }
  };

  const renderUploadSection = () => (
    <div className="w-full px-4 md:px-0 mx-auto">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => document.querySelector('input[type="file"]').click()}
        className={`
          w-full bg-[#FAFAFA] border-2 border-dashed rounded-xl cursor-pointer pb-4
          transition-all duration-200 ease-in-out 
          ${isDragActive ? "border-[#E4E4E4]" : "hover:border-[#1D4ED8]"}
        `}
      >
        <input type="file" className="hidden" accept=".pdf" onChange={onDrop} />
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center mt-6 px-4">
            <div className="text-[#212121] font-urbanist font-medium text-[16px] mt-[14px] text-center">
              Sit back and relax, we're working on it!
            </div>
            <div className="w-[50%] md:w-[20%] mx-auto h-4 bg-transparent rounded-full overflow-hidden mt-[10px]">
              <div
                className="h-full bg-gradient-to-r from-[#D8EA9A] via-[#AFE5CA] to-[#FBB8B8] rounded-[12px] transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
            <div className="text-[#1D4ED8] font-urbanist font-medium text-[24px] mt-2 text-center">
              {processingProgress}%
            </div>
          </div>
        ) : fileName ? (
          <div className="flex items-center justify-center mt-[48px] mb-[28px] px-4">
            <div className="flex items-center bg-blue-100 rounded-lg p-2 max-w-[600px]">
              <span className="mr-4 truncate">{fileName}</span>
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
              <Upload size={32} />
            </h3>
            <h3 className="text-center font-Urbanist font-semibold leading-[24px] mt-2 text-[24px] text-[#1D4ED8]">
              Upload Files
            </h3>
            <h6 className="text-center font-Urbanist font-medium leading-[24px] mt-3 text-[16px] text-[#212121]">
              Drag or Upload PDF Files
            </h6>
          </>
        )}

        <button
          onClick={(e) => {
            uploadFile();
            e.stopPropagation();
          }}
          className={`w-[106px] h-[46px] rounded-[100px] font-medium text-center font-Urbanist text-[16px] transition-colors duration-200 float-right mt-7 ${
            file && !isProcessing
              ? "bg-[#212121] text-white hover:opacity-90"
              : "bg-gray-300 text-white cursor-not-allowed"
          } ${
            isProcessing
              ? "border border-black w-[126px] h-[46px] bg-white"
              : ""
          }`}
          disabled={!file || isProcessing}
        >
          {isProcessing ? (
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
  );

  const renderChatbotSection = () => (
    <div className="w-full px-4 md:w-[1200px] md:px-0 mx-auto">
      {isChatbotReady && (
        <div className="flex flex-col md:flex-row items-center justify-center p-4 gap-4">
          {/* PDF Preview (Mobile: Full width, Desktop: Half width) */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[500px] overflow-hidden rounded-3xl border">
            <DocumentsViewer doc={pdfPreviewUrl} />
          </div>

          {/* Chatbot Interface */}
          <div className="w-full md:w-1/2 h-[500px] flex flex-col">
            {/* Messages Container */}
            <div className="flex-grow overflow-y-auto mb-1 p-4 bg-gray-100 rounded-3xl">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-[2px] p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-100 text-right self-end"
                      : "bg-gray-200 text-left self-start"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {streamingResponse && (
                <div className="mb-4 p-3 rounded-lg bg-gray-200 text-left self-start">
                  {streamingResponse}
                </div>
              )}
              {isLoading && !streamingResponse && (
                <div className="text-center text-gray-500">
                  Generating response...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="relative flex items-center justify-center w-full mt-2">
              <div className="flex items-center bg-white border border-gray-300 rounded-3xl py-3 w-full md:w-[568px] h-[56px]">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your question here..."
                  className="flex-grow w-full ml-4 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!currentMessage.trim() || isLoading}
                  className="flex items-center justify-center text-white font-urbanist font-semibold text-[16px] 
                    bg-black leading-[24px] rounded-full mr-1 py-3 w-[85px] h-[46px]"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

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
          <span className="relative inline-block mb-2 md:mb-6">
            Upload.
            <div className="absolute left-0 banner-underline md:!mt-2 !max-w-none"></div>
          </span>
          <span> Ask. Understand.</span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-center text-#212121 font-urbanist font-medium text-base md:text-[24px] mt-6 px-4">
          Simply{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            Upload a Document
          </span>{" "}
          and get accurate answers to your questions in seconds.
        </p>

        {/* Upload Box */}
        <div className="rounded-xl mt-8 md:mt-16 mb-10 flex flex-col items-center justify-center">
          {renderUploadSection()}
          {renderChatbotSection()}
        </div>

        {/* Previously Uploaded Document Section */}
        <h2 className="text-center text-2xl sm:text-4xl md:text-[42px] font-semibold mt-[120px] mb-11">
          Previously Uploaded Document
        </h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {uploadedDocs.map((doc, index) => (
              <div
                key={index}
                className="relative shadow flex flex-col items-center bg-[#FFFBFB] border border-[#E4E4E4] rounded-2xl"
              >
                {/* PDF Preview */}
                <div className="relative w-full h-[270px] sm:h-[300px] md:h-[344px]">
                  <iframe
                    src={`${doc.doc_url}#toolbar=0&navpanes=0&scrollbar=0`}
                    title={`Document: ${doc.doc_name}`}
                    className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl"
                  />
                </div>

                {/* Spacer Section */}
                <div className="w-full h-[40px] md:h-[60px] relative mt-8"></div>

                {/* Button Section */}
                <div className="flex justify-center absolute bottom-3 md:bottom-4">
                  <button
                    onClick={() => handleDownload(doc.doc_url)}
                    className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[340px] h-[40px] sm:h-[50px] md:h-[60px] bg-black text-white text-[10px] sm:text-[12px] md:text-[16px] font-semibold md:py-5 px-12 rounded-full"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <DetailSection
          title="Talk with Your Document"
          description="Interact with your documents like never before with our tool. Simply upload or drag-and-drop your file to instantly extract answers and insights. Whether you're reviewing reports, contracts, or academic papers, this tool simplifies the way you interact with complex information."
        />
        <FeatureSection features={features} />
        <UsageExplanationSection
          title="How Does Talk with Your Document Work?"
          explanation={[
            "This tool uses advanced Natural Language Processing (NLP) to understand your document's content and structure. Once you upload your file, the AI analyzes the text and enables you to ask specific questions.",
            "The system retrieves the most relevant answers or sections, helping you navigate through large volumes of information effortlessly. From clarifying key points to deep-diving into specific details, the process is efficient, accurate, and user-friendly.",
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

export default ChatPDF;
