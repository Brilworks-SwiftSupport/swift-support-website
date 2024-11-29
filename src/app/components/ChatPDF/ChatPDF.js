"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Upload, X } from "lucide-react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import freeForever from "@/app/images/freeForever.svg";
import Image from "next/image";

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

  const messagesEndRef = useRef(null);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

  function timeout(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);

    const files = e.dataTransfer?.files || e.target.files;
    if (files?.[0]) {
      const selectedFile = files[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        setUploadStatus(
          "File size exceeds 12 MB. Please upload a smaller file."
        );
        setDragError(true);
        alert("Error: File size exceeds 12 MB. Please upload a smaller file.");
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setUploadStatus("");
        setDragError(false);
      }
    }
  }, []);

  // Clear file selection
  const clearFile = () => {
    setFile(null);
    setFileName("");
  };

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(true);

    const files = e.dataTransfer?.files;
    if (files?.[0] && files[0].size > MAX_FILE_SIZE) {
      setDragError(true);
    } else {
      setDragError(false);
    }
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragActive(false);
    setDragError(false);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingResponse]);

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
        `http://127.0.0.1:5001/api/query/agent/${agentId}`,
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
      const uploadResponse = await fetch(
        "http://localhost:5001/api/upload_pdf",
        {
          method: "POST",
          body: formData,
        }
      );

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
          "http://127.0.0.1:5001/api/datastore",
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

          const agentResponse = await fetch("http://127.0.0.1:5001/api/agent", {
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

  const pdfPrev = () => (
    <>
      {showPdfPreview && (
        <div className="h-[500px] overflow-hidden rounded-3xl border w-1/2 max-h-[500px]">
          <DocumentsViewer doc={pdfPreviewUrl} />
        </div>
      )}
    </>
  );

  return (
    <main className="flex mt-32 justify-center">
      <div className="container mx-auto max-w-auto bg-transparent mt-12">
        <Image
          className="mx-auto"
          src={freeForever}
          alt="free-forever"
          width={"auto"}
        />

        {/* Title Section */}
        <h1 className="text-center text-[54px] font-urbanist font-bold leading-[72px] mb-4 mt-6">
          <span className="relative inline-block">
            Upload.
            <div className="absolute left-0 banner-underline !max-w-none"></div>
          </span>
          <span> Ask. Understand.</span>
        </h1>

        {/* Subtitle */}
        <p className="relative text-center text-#212121 font-urbanist font-medium text-[24px] mt-6">
          Simply{" "}
          <span className="bg-clip-text text-transparent bg-text-theme-gradient">
            Upload a Document
          </span>{" "}
          and get accurate answers to your questions in seconds.
          <div className="absolute w-[1200px] h-[35px] left-1/2 transform "></div>
        </p>

        {/* Upload Box */}
        <div className="rounded-xl mt-16 mb-10 w-[100%] flex flex-col items-center justify-center">
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => document.querySelector('input[type="file"]').click()}
            className={`
              w-[1200px] bg-[#FAFAFA] border-2 border-dashed rounded-xl cursor-pointer pb-4
              transition-all duration-200 ease-in-out 
              ${isDragActive ? "border-[#E4E4E4]" : "hover:border-[#1D4ED8]"}
            `}
          >
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={onDrop}
            />
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center mt-6 px-4">
                {/* Progress Bar */}
                <div className="text-[#212121] font-urbanist font-medium text-[16px] mt-[14px]">
                  Sit back and relax, we're working on it!
                </div>
                <div className="w-[20%] mx-auto h-4 bg-transparent rounded-full overflow-hidden mt-[10px]">
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
              <div className="flex items-center justify-center mt-[66px] mb-[26px] px-4">
                <div className="flex items-center bg-blue-100 rounded-lg p-2 max-w-[600px]">
                  <span className="mr-4 truncate">{fileName}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="w-8 h-8 mx-auto mt-8 text-[#1D4ED8] font-rehular">
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
              className={`w-[106px] h-[46px] rounded-[100px] font-medium text-center font-Urbanist text-[16px] transition-colors duration-200 float-right mt-4 mr-4 ${
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

          {/* Chatbot Section */}
          {isChatbotReady && (
            <div className="w-[1200px] h-[fit] flex flex-row items-center justify-center p-4 gap-4">
              {pdfPrev()}
              <div className="flex flex-col h-[500px] w-1/2 ">
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
                  {/* Streaming response */}
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
                  {/* Ref to scroll to bottom */}
                  <div ref={messagesEndRef} />
                </div>

                <div className="relative flex items-center justify-center w-full">
                  <div className="flex items-center bg-white border border-gray-300 rounded-3xl py-3 w-[568px] h-[56px]">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type your question here..."
                      className="flex-grow w-[446px] h-[20px] ml-4"
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
      </div>
    </main>
  );
};

export default ChatPDF;
