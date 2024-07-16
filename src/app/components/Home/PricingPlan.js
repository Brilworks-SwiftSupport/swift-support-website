"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PricingPlan = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState("Monthly");
  const router = useRouter();

  return (
    <div className="container mx-auto section-padding" id="pricing-plan">
      <div className="flex flex-col items-center justify-center md:mb-[58px] mb-7">
        <h2 className="font-bold text-2xl md:text-3xl xl:text-4xl xl:leading-[45.36px] mb-[30px] text-center">
          Pricing Plans
        </h2>

        <div className="flex relative z-[1]">
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
        <div className="hidden xs:flex items-center justify-end absolute">
          <div className="relative top-9 left-44 z-[2]">
            <Image
              src="/images/save-arrow.svg"
              className=""
              width="200"
              height="17"
              alt="save 20% on yearly plan"
            />
          </div>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        <div className="bg-themeBlue pricing-grid rounded-[14px] p-[22px]">
          <div className="font-light text-[50px] mb-4">
            <div className="flex items-center justify-start gap-3">$0</div>
          </div>
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
            FREE
          </button>
          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>1 Agent</li>
              <li>1 Datastore</li>
              <li>50 agents queries / month</li>
              <li>0 Team Seats included</li>
              <li>1 MB / File upload limit</li>
            </ul>
            <button
              onClick={() => router.push("https://dev.swiftsupport.ai/login")}
              className="bg-colorBlack subscribe-btn text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="bg-themeBlue pricing-grid rounded-[14px] p-[22px]">
          <div className="font-light text-[50px] mb-4">
            {subscriptionPlan === "Monthly" ? (
              "$20"
            ) : (
              <div className="flex items-center justify-start gap-3">
                $192{" "}
                <span className="text-colorDarkBlue font-medium text-2xl line-through">
                  $240
                </span>
              </div>
            )}
          </div>
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
            BASIC
          </button>
          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>2 Agent</li>
              <li>2 Datastore</li>
              <li>5000 agents queries / month</li>
              <li>10 Team Seats included</li>
              <li>10 MB / File upload limit</li>
            </ul>
            <button
              onClick={() => router.push("https://dev.swiftsupport.ai/login")}
              className="bg-colorBlack subscribe-btn text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="bg-themeBlue pricing-grid rounded-[14px] p-[22px]">
          <div className="font-light text-[50px] mb-4">
            {subscriptionPlan === "Monthly" ? (
              "$50"
            ) : (
              <div className="flex items-center justify-start gap-3">
                $480
                <span className="text-colorDarkBlue font-medium text-2xl line-through">
                  $600
                </span>
              </div>
            )}
          </div>
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
            STANDARD
          </button>
          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>5 Agent</li>
              <li>5 Datastore</li>
              <li>50000 agents queries / month</li>
              <li>25 Team Seats included</li>
              <li>20 MB / File upload limit</li>
            </ul>
            <button
              onClick={() => router.push("https://dev.swiftsupport.ai/login")}
              className="bg-colorBlack subscribe-btn text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="bg-themeBlue pricing-grid rounded-[14px] p-[22px]">
          <div className="font-light text-[50px] mb-4">
            {subscriptionPlan === "Monthly" ? (
              "$80"
            ) : (
              <div className="flex items-center justify-start gap-3">
                $768
                <span className="text-colorDarkBlue font-medium text-2xl line-through">
                  $960
                </span>
              </div>
            )}
          </div>
          <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
            PREMIUM
          </button>
          <div>
            <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
              Features
            </h3>
            <ul className="pricing-list">
              <li>100 Agent</li>
              <li>100 Datastore</li>
              <li>100000 agents queries / month</li>
              <li>100 Team Seats included</li>
              <li>50 MB / File upload limit</li>
            </ul>
            <button
              onClick={() => router.push("https://dev.swiftsupport.ai/login")}
              className="bg-colorBlack subscribe-btn text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlan;
