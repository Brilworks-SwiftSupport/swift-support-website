"use client";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

const LoadScripts = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // useEffect(() => {
  //   if (!isMobile) {
  //     const triggerChatbot = () => {
  //       const chatbotButton = document.getElementById(
  //         "swiftSupport-bubble-button"
  //       );
  //       if (chatbotButton) {
  //         chatbotButton.click();
  //       }
  //     };

  //     const timeoutId = setTimeout(triggerChatbot, 500);

  //     return () => clearTimeout(timeoutId);
  //   }
  // }, [isMobile]);
};

export default LoadScripts;
