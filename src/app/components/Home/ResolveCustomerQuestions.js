"use client";
import Image from "next/image";
import React, { useState } from "react";

const ResolveCustomerQuestions = () => {
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
    <div className="w-full px-[70px] pb-[100px]">
      <div className="relative flex items-center justify-center">
        <Image
          className="self-center"
          src="/images/signup.svg"
          width={1300}
          height={852}
          alt="Resolve customer questions"
        />
        <div className="signup-content">
          <h2 className="text-[36px] font-bold leading-[45.36px] mb-[30px] text-center">
            Resolve up to 80% of customer <br />
            questions with AI
          </h2>
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-[10px]">
              <label className="text-[#7E7E7E] text-base font-normal">
                Email Address
              </label>
            </div>
            <div className="flex gap-5">
              <input
                className="w-[472px] border border-colorBlack h-[60px] rounded-[13px] py-[30px] pl-5"
                type="email"
                placeholder="john123@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />

              <button
                className="h-[60px] w-[207px] signup-button"
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
