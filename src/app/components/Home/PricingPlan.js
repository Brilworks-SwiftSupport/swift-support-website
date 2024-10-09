"use client";
import Image from "next/image";
import React, { useState } from "react";

const PricingPlan = () => {
  const [subscriptionPlan, setSubscriptionPlan] = useState("Monthly");

  const pricingPlans = [
    {
      price: "$0",
      label: "FREE",
      features: [
        "1 Agent",
        "200 query/month",
        "1 Datastore",
        "Total storage 50MB",
        "25 web pages",
        "File upload limit 1MB/File",
        "Remove SwiftSupport branding",
        "Slack integration",
        "Hubspot integration",
        "Google drive integration",
      ],
      buttonLink: "https://app.swiftsupport.ai/login",
      buttonText: "Subscribe",
    },
    {
      price: subscriptionPlan === "Monthly" ? "$50" : "$480",
      discount: subscriptionPlan === "Yearly" ? "$600" : null,
      label: "BUSINESS",
      features: [
        "5 Agent",
        "20k query/month",
        "5 Datastore",
        "File upload limit 10MB/File",
        "Total storage 200MB",
        "500 web pages",
        "Auto sync datastore",
        "5 team seat",
        "Remove SwiftSupport branding",
        "Slack integration",
        "HubSpot integration",
        "Google drive integration",
      ],
      buttonLink: "https://app.swiftsupport.ai/login",
      buttonText: "Subscribe",
    },
    {
      price: "Custom",
      label: "CUSTOM",
      features: [
        "Unlimited agent",
        "Unlimited query/month",
        "Unlimited datastore",
        "File upload limit 10MB/File",
        "Total storage 100MB",
        "10000 web pages",
        "Auto sync datastore",
        "Unlimited team seat",
        "Remove SwiftSupport branding",
        "Slack integration",
        "HubSpot integration",
        "Google drive integration",
      ],
      buttonLink: "https://cal.com/hiteshr/15min",
      buttonText: "Contact Us",
    },
  ];

  return (
    <div
      className="container mx-auto section-padding max-w-[1400px]"
      id="pricing-plan"
    >
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
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-themeBlue pricing-grid rounded-[14px] p-[22px] flex flex-col justify-between"
          >
            <div className="flex-grow">
              <div className="font-light text-[50px] mb-4">
                <div className="flex items-center justify-start gap-3">
                  {plan.price}
                  {plan.discount && (
                    <span className="text-colorDarkBlue font-medium text-2xl line-through">
                      {plan.discount}
                    </span>
                  )}
                </div>
              </div>
              <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
                {plan.label}
              </button>
              <div>
                <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
                  Features
                </h3>
                <ul className="pricing-list">
                  {plan.features.map((feature, idx) => {
                    // Check if the plan label is "FREE" and the feature matches the ones to be strikethrough
                    const strikeThrough =
                      plan.label === "FREE" &&
                      [
                        "Remove SwiftSupport branding",
                        "Slack integration",
                        "Hubspot integration",
                        "Google drive integration",
                      ].includes(feature);

                    return (
                      <li
                        key={idx}
                        className={
                          strikeThrough
                            ? "cross-mark line-through text-gray-500"
                            : ""
                        }
                      >
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <button
              onClick={() => window.open(plan.buttonLink, "_blank")}
              className="bg-colorBlack subscribe-btn text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full mt-5"
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-themeBlue pricing-grid rounded-[14px] p-[22px]"
          >
            <div className="font-light text-[50px] mb-4">
              <div className="flex items-center justify-start gap-3">
                {plan.price}
                {plan.discount && (
                  <span className="text-colorDarkBlue font-medium text-2xl line-through">
                    {plan.discount}
                  </span>
                )}
              </div>
            </div>
            <button className="bg-colorWhite font-medium rounded-[10px] px-[22px] py-[14px] mb-[21px]">
              {plan.label}
            </button>
            <div>
              <h3 className="font-bold text-[22px] text-colorDarkBlue mb-[14px]">
                Features
              </h3>
              <ul className="pricing-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <button
                onClick={() => window.open(plan.buttonLink, "_blank")}
                className="bg-colorBlack subscribe-btn text-colorWhite rounded-[10px] px-[22px] py-[14px] text-[21px] font-medium w-full"
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default PricingPlan;
