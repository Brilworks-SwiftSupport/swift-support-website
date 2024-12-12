import React, { useState } from "react";


const HandleText = ({ text,type }) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    // Function to toggle between showing more or less
    const toggleReadMore = () => setIsExpanded(!isExpanded);
  
    // Split text into words and display only 50 if not expanded
    const words = text.split(" ");
    const displayedText = isExpanded ? text : words.slice(0, 10).join(" ");
  
    return (
      <div>
        <span className="font-bold">{type} Text:</span>
        <p className="mt-2">
          {displayedText}
          {words.length > 10 && (
            <span
              onClick={toggleReadMore}
              className="text-blue-500 cursor-pointer ml-2"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </span>
          )}
        </p>
      </div>
    );
  };


export default HandleText;