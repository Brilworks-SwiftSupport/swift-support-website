"use client"
import Link from "next/link";
import React, { useState } from "react";

const InstantSolution = () => {
  const [sequence, setSequence] = useState(1);
  return (
    <div className="instant-solution pt-[150px]">
      <div className="mb-[29px]">
        <p className="uppercase md:text-[22px] text-[18px] font-semibold text-colorGray leading-[27.72px] text-center">
          Instant Customer Solutions
        </p>
      </div>

      <div className="text-colorBlack font-light md:text-[70px] text-[32px] flex text-center flex-col">
        <p className="mb-[17px]">
          Build a <span className="build-chatbot">Chatbot to answer</span>
        </p>
        <p className="mb-4">any question from your</p>
        <div
          className={`website-button select-none cursor-pointer ${
            sequence === 1
              ? "bg-themeYellow"
              : sequence === 2
              ? "bg-themeBlue"
              : "bg-themePink"
          }`}
        >
          {sequence === 1 ? (
            <p onClick={() => setSequence(2)}>Website</p>
          ) : sequence === 2 ? (
            <p onClick={() => setSequence(3)}>PDFs</p>
          ) : (
            <p onClick={() => setSequence(1)}>Text</p>
          )}
        </div>
        <div className="my-10 flex items-center justify-center">
          <Link
            href="#"
            className="px-[30px] py-[10px] bg-colorBlack font-bold text-colorWhite rounded-xl text-base gap-2 leading-[20.16px]"
          >
            <p className="py-[10px] px-3 text-center">Start a Free Trial</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstantSolution;
