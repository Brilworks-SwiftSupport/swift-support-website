"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 



const HandleUrl = ({ summary,redirectUrl }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    const toggleReadMore = () => {
    if (!isExpanded && redirectUrl && typeof redirectUrl === "string") {
        router.push(redirectUrl);
    } else {
      // Toggle read more state if no redirectUrl
      setIsExpanded(!isExpanded);
    }
  };

  const words = summary.split(" ");
  const displayedText = isExpanded ? summary : words.slice(0, 7).join(" ");

  return (
    <div>
      <span>
        {displayedText}
        {words.length > 7 && (
          <span
            onClick={toggleReadMore}
            className="text-blue-500 cursor-pointer ml-2"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </span>
        )}
      </span>
    </div>
  );
};

export default HandleUrl;
