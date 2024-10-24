import React from "react";
import "../styles/Animation.scss";

const LoadingSpinner = ({ size = "md" }) => {
  // size = ["md", "lg", "xl", "2xl", "3xl"];

  return (
    <div className="flex items-center justify-center h-fit w-full">
      <div className={`loader loader-${size}`}></div>
    </div>
  );
};

export default LoadingSpinner;
