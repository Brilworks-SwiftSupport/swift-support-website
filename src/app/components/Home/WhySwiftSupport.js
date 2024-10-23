import Image from "next/image";
import React from "react";

export const WhyGridIconWithText = ({ title, description, imageSrc }) => {
  return (
    <div className="pt-[1px] pb-[3px] pr-[3px] pl-[1px] rounded-[20px] app-integration-gradient">
      <div className="h-full bg-colorWhite rounded-[20px] p-5 flex items-center lg:flex-row flex-col md:gap-[18px] gap-4">
        <div>
          <div className="bg-[#F9F9F9] md:w-[100px] w-16 md:h-[100px] h-16 rounded-[20px] flex items-center justify-center">
            <Image
              className="md:w-[54px] md:h-[54px] w-7 h-7"
              src={imageSrc}
              alt={`${title}-image`}
              width="54"
              height="54"
            />
          </div>
        </div>
        <div>
          <h3 className="text-colorBlack md:text-2xl text-xl font-semibold mb-3">
            {title}
          </h3>
          <p className="!text-base text-colorBlack">{description}</p>
        </div>
      </div>
    </div>
  );
};

const WhySwiftSupport = () => {
  const whyChooseSwiftSupportData = [
    {
      title: "Email Workflow Automation",
      description:
        "Automate tedious email responses & workflows, freeing up time for high-value tasks.",
      imageSrc: "/images/image_email.svg",
    },
    {
      title: "Multichannel Integration",
      description:
        "Seamlessly connect with customers across email, WhatsApp, & web, all from one platform.",
      imageSrc: "/images/image_integration.svg",
    },
    {
      title: "Instant Access to Information",
      description:
        "Quickly retrieve relevant data from PDFs, DOCX, & databases, providing faster & accurate support.",
      imageSrc: "/images/image_retrieve.svg",
    },
    {
      title: "AI-Powered Assistance",
      description:
        "Leverage AI to improve response accuracy and provide smarter solutions to customer queries.",
      imageSrc: "/images/image_assistant.svg",
    },
  ];

  return (
    <div className="lg:py-[90px] md:py-[60px] py-10">
      <div className="container max-w-[1200px] mx-auto w-full">
        <h2 className="new-h2 w-ful mb-[40px] px-4">
          Unlock the Full Potential of
          <br className="md:block hidden" /> Your Support Teams
        </h2>
        {/* <p className="text-colorBlack text-[32px] leading-tight mb-[40px] text-center">
          “Unlock the Full Potential of Your Support Teams”
        </p> */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-[30px] mx-5">
          {whyChooseSwiftSupportData.map(
            ({ title, description, imageSrc }, index) => {
              return (
                <WhyGridIconWithText
                  title={title}
                  description={description}
                  imageSrc={imageSrc}
                  key={index}
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default WhySwiftSupport;
