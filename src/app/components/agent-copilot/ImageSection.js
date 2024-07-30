import React from "react";

const ImageSection = () => {
  return (
    <div className="flex flex-[0.5]  min-h-[350px] min-w-[350px] p-[50px] relative">
      <div className="bg-[url(/images/Education_img.webp)] absolute  left-[50%] right-[50%] translate-x-[-50%]  rounded-full object-fill  lg:w-[550px] lg:h-[550px] min-h-[350px] min-w-[350px]"></div>
      <div className="bg-white "></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ImageSection;
