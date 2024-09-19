import Image from "next/image";
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { useMediaQuery } from "react-responsive";

const SearchButton = () => {
  const [siteUrl, setSiteUrl] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [respMessage, setRespMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const validateUrl = (url) => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(url);
  };

  const onChange = ({ target }) => {
    const url = target.value;
    setSiteUrl(url);
    setIsValidUrl(validateUrl(url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRespMessage(
      "Please keep this page open while we create your AI chatbot"
    );

    try {
      const response = await fetch(
        `https://devapi.swiftsupport.ai/api/demo_agents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ web_url: siteUrl }),
        }
      );

      const data = await response.json();

      if (data.company_name) {
        setSiteUrl("");

        if (typeof window !== "undefined") {
          const companyUrl = `https://dev.swiftsupport.ai/demo/${data?.company_name}`;
          window.open(companyUrl, "_blank"); // Open new window
        }
        setRespMessage("Your response is submitted successfully.");
        setTimeout(() => {
          setRespMessage("");
        }, 5000);
      } else {
        setRespMessage("Something went wrong!");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error getting response", error);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className="xl:w-3/5 w-full max-w-full relative"
        onSubmit={handleSubmit}
      >
        <Image
          className="self-center absolute xl:top-[45%] md:top-[36%] top-[25%] left-3 md:w-[40px] w-[30px] md:h-[40px] h-[30px] bg-colorWhite"
          src="/images/Google-Bard.svg"
          width="40"
          height="40"
          alt="AI-icon"
        />

        <input
          className={`border-2 rounded-[50px] w-full md:h-16 h-14 text-xl px-3 md:pl-16 pl-12 focus:outline-2 ${
            isValidUrl ? "focus:outline-colorGray" : "border-red-500"
          }`}
          disabled={isSubmitting}
          type="text"
          onChange={onChange}
          placeholder="Enter your business website URL to create your first AI chatbot"
        />

        <button
          className={`disabled:bg-colorGray bg-colorBlack md:text-xl text-lg rounded-full font-medium text-colorWhite absolute xl:top-[42%] md:top-[28%] top-[11%] right-[6px] disabled:cursor-not-allowed cursor-pointer ${
            isSubmitting
              ? "md:py-3 py-2 md:px-16 px-8"
              : "md:py-3 py-2 md:px-5 px-2"
          }`}
          disabled={!siteUrl || !isValidUrl || isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <LoadingSpinner />
          ) : isMobile ? (
            "Create"
          ) : (
            "Create AI Chatbot"
          )}
        </button>
      </form>
      {isSubmitting && (
        <span className="text-colorDarkBlue text-sm text-center bg-colorLightBlue py-2 px-4 mt-4 font-medium rounded-md">
          {respMessage}
        </span>
      )}
      {!isValidUrl && (
        <span className="xl:w-3/5 w-full max-w-full text-red-500 text-sm text-left pl-4">
          Please enter a valid URL.
        </span>
      )}
    </>
  );
};

export default SearchButton;
