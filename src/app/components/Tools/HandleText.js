import React, { useState } from "react";

const HandleText = ({ text, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle between showing more or less
  const toggleReadMore = () => setIsExpanded(!isExpanded);

  // Split text into words and display only 50 if not expanded
  const words = text.split(" ");
  const displayedText = isExpanded ? text : words.slice(0, 7).join(" ");

  return (
    <div>
      <span className="font-bold">{type} </span>
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

export default HandleText;
