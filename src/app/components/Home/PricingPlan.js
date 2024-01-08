"use client";
import React, { useState } from "react";

const PricingPlan = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState("Monthly");

  return (
    <div className="pb-[100px] px-[70px]">
      <div className="flex flex-col items-center justify-center mb-[58px]">
        <h2 className="font-bold text-4xl leading-[45.36px] text-center mb-[30px]">
          Pricing Plans
        </h2>
        <div className="flex relative">
          <button
            type="text"
            className={` py-3 px-[27px] ${
              subscriptionPlan === "Monthly"
                ? "bg-themeBlue rounded-t-[10px] z-20"
                : "bg-[#D7F4FE] border-themeBlue border border-r-0 rounded-tl-[10px] -mr-2 z-10 relative "
            } `}
            onClick={() => setSubscriptionPlan("Monthly")}
          >
            Monthly
          </button>
          <button
            type="text"
            className={` py-3 px-[27px] ${
              subscriptionPlan === "Monthly"
                ? "bg-[#D7F4FE] border-themeBlue border border-l-0 rounded-tr-[10px] -ml-2 z-10 relative "
                : "bg-themeBlue rounded-t-[10px] z-20"
            }`}
            onClick={() => setSubscriptionPlan("Yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className={`grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5`}>
        <div className="bg-themeBlue rounded-[14px] p-[22px]">
          <span className="font-light text-[50px] mb-4">$0</span>
          <br />
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
            FREE
          </button>
          <p className="text-[18px] font-normal text-colorGray mb-[30px]">
            Lorem ipsum dolor sit amet consectetur nislio urna.
          </p>

          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
            <button className="bg-colorBlack text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full">
              Subscribe
            </button>
          </div>
        </div>

        <div className="bg-themeBlue rounded-[14px] p-[22px]">
          <span className="font-light text-[50px] mb-4">$20</span>
          <br />
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
            BASIC
          </button>
          <p className="text-[18px] font-normal text-colorGray mb-[30px]">
            Lorem ipsum dolor sit amet consectetur nislio urna.
          </p>

          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
            <button className="bg-colorBlack text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full">
              Subscribe
            </button>
          </div>
        </div>

        <div className="bg-themeYellow rounded-[14px] p-[22px] subscribe-main-shadow">
          <span className="font-light text-[50px] mb-4">$50</span>
          <br />
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px] subscribe-shadow">
            STANDARD
          </button>
          <p className="text-[18px] font-normal text-colorGray mb-[30px]">
            Lorem ipsum dolor sit amet consectetur nislio urna.
          </p>

          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
            <button className="bg-colorWhite text-colorBlack border-2 border-colorBlack rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full">
              Subscribed
            </button>
          </div>
        </div>

        <div className="bg-themeBlue rounded-[14px] p-[22px]">
          <span className="font-light text-[50px] mb-4">$80</span>
          <br />
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
            PREMIUM
          </button>
          <p className="text-[18px] font-normal text-colorGray mb-[30px]">
            Lorem ipsum dolor sit amet consectetur nislio urna.
          </p>

          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ul>
            <button className="bg-colorBlack text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
