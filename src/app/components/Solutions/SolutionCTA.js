import Link from "next/link";
import React from "react";

const SolutionCTA = ({ title, desc, buttonText, buttonLink }) => {
  return (
    <div className="bg-[#F2ED7B33] bg-opacity-20 py-10 md:py-[60px] lg:py-[90px] overflow-hidden">
      <div className="container-cta">
        <div className="content">
          <h3
            className={`${
              desc ? "mb-3" : "mb-[30px]"
            } new-h3 w-full mx-auto px-4`}
          >
            {title}
          </h3>
          {desc && (
            <p className="text-colorBlack md:text-2xl text-xl text-center mb-[30px] px-4">
              {desc}
            </p>
          )}
          <div className="flex items-center justify-center">
            <Link
              href={buttonLink || "https://cal.com/swiftsupport/demo"}
              rel="noopener nofollow"
              className="common-button black-button border-colorBlack"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionCTA;
