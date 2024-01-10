"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const ResolveCustomerQuestions = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1080 });

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitted email:", email);
  };
  return (
    <div className="w-full section-padding">
      <div className="relative flex items-center justify-center">
        <Image
          className="md:block hidden self-center w-full"
          src="/images/signup.svg"
          width={1300}
          height={852}
          alt="Resolve customer questions"
        />
        <div className={isMobile ? "" : "signup-content"}>
          <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] mb-[30px] text-center">
            Resolve up to 80% of customer{!isTablet && <br />} questions with AI
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-[10px]">
              <label className="text-[#7E7E7E] text-base font-normal">
                Email Address
              </label>
            </div>
            <div className="w-full lg:inline-flex flex flex-wrap gap-5">
              <input
                className="xl:w-[460px] md:w-3/5 w-full border border-colorBlack lg:h-[60px] h-[50px] md:rounded-[13px] rounded-[10px] md:py-[30px] md:pl-5 pl-3"
                type="email"
                placeholder="john123@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                className="md:h-[60px] h-[50px] xl:w-[207px] md:w-2/6 w-full signup-button"
                type="submit"
              >
                Sign Up for Free
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResolveCustomerQuestions;
