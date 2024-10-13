import Link from "next/link";
import React from "react";

const HomepageCTA = ({ title, buttonText, buttonLink, id }) => {
  return (
    <div className="bg-[#F2ED7B33] bg-opacity-20 py-10 md:py-[60px] lg:py-[70px] overflow-hidden">
      <div className="container-cta">
        <div className="content">
          <h3 className="new-h3 mb-[30px] w-full mx-auto px-4">{title}</h3>
          <div className="flex items-center justify-center">
            <Link
              href={buttonLink || "#"}
              className="font-semibold border-colorBlack border bg-colorBlack text-colorWhite rounded-[30px] px-6 py-4 text-xl"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageCTA;
