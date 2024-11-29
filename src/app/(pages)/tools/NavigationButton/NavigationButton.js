import React from "react";
import Image from "next/image";

const NavigationButton = ({ img, href, name, bgColor }) => {
  return (
    <a
      href={href}
      className="w-[181px] h-[40px] rounded-full flex items-center justify-center ml-1 mb-2"
      style={{
        background:
          "linear-gradient(45deg, #FF8585 0%, #56D5FF 50%, #DCD536 100%)",
        padding: "1px", // Creates spacing for the gradient border
        textDecoration: "none", // Ensures the text doesn't inherit underlines
      }}
    >
      <div
        className="w-full h-full rounded-full bg-[#FFFFFF] flex items-center justify-center"
        style={{
          background: bgColor,
        }}
      >
        <div className="flex items-center">
          <Image
            className="mx-auto mr-1"
            src={img}
            alt="free-forever"
            width={"auto"}
          />
          <p className="text-sm font-Urbanist text-4 font-semibold text-gray-950">{name}</p>
        </div>
      </div>
    </a>
  );
};

export default NavigationButton;
