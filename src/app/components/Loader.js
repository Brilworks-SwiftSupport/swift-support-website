import React from "react";


const BeatLoader = (props) => {
  return (
    <div className="min-h-[90vh] flex  justify-center items-center">
      <div className="beat-loader">
        <div className="bg-[#e06767]"></div>
        <div className="bg-[#43bfe8]"></div>
        <div className="bg-[#f0e850]"></div>
      </div>
    </div>
  );
};

export default BeatLoader;
