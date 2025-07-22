"use client";
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const PricingPlan = () => {
  const pricingPlans = [
    {
      title: "Monthly",
      value: "monthly",
      data: [
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
          buttonLink: "https://cal.com/swiftsupport/demo",
          buttonText: "Get Started",
        },
        {
          price: "$50",
          discount: null,
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
          buttonLink: "https://cal.com/swiftsupport/demo",
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
      ],
    },
    {
      title: "Yearly",
      value: "yearly",
      data: [
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
          buttonLink: "https://cal.com/swiftsupport/demo",
          buttonText: "Get Started",
        },
        {
          price: "$480",
          discount: "$600",
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
          buttonLink: "https://cal.com/swiftsupport/demo",
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
      ],
    },
  ];

  return (
    <div className="container mx-auto max-w-[1200px] lg:py-[80px] md:py-[60px] py-10">
      <div className="md:mb-[px] mb-7" id="pricing-plan">
        <h2 className="new-h2 md:mb-[30px] mb-5 text-center">Pricing Plans</h2>
        <Tabs
          value="monthly"
          id="custom-animation"
          orientation="horizontal"
          className="pricing-plan"
        >
          <TabsHeader className="!rounded-none border-y border-borderGray mb-[46px] md:flex-row flex-col md:px-0 md:w-2/3 w-full mx-auto">
            {pricingPlans.map(({ title, value }) => (
              <Tab key={value} value={value}>
                <h3 className="flex items-center gap-2 md:text-[26px] text-[22px] leading-normal font-semibold  text-colorBlack">
                  {title}
                </h3>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { x: 250 },
              mount: { x: 0 },
              unmount: { x: 250 },
            }}
          >
            {pricingPlans.map(({ value, data }, index) => (
              <TabPanel key={value} value={value} className="">
                <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mx-0">
                  {data.map((plan, indx) => (
                    <div
                      key={plan.label}
                      className="pricing-grid border rounded-[20px] p-[30px] flex flex-col justify-between"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center justify-between md:text-4xl text-3xl mb-5">
                          <div className="flex items-center justify-start gap-3 font-semibold">
                            {plan.price}
                            {plan.discount && (
                              <span className="text-colorGray font-semibold md:text-2xl text-xl line-through">
                                {plan.discount}
                              </span>
                            )}
                          </div>
                          <button className="text-colorBlack md:text-xl text-lg font-medium rounded-[10px] px-5 py-[6px] border border-colorBlack">
                            {plan.label}
                          </button>
                        </div>

                        <div>
                          <h3 className="font-medium md:text-2xl text-xl text-colorBlack mb-5">
                            Features
                          </h3>
                          <ul className="pricing-list">
                            {plan.features.map((feature, idx) => {
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
                                  className={strikeThrough ? "cross-mark" : ""}
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
                        className={`subscribe-btn rounded-[80px] px-[22px] py-[14px] text-[21px] font-medium w-full mt-5`}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default PricingPlan;
