import Image from "next/image";
import React from "react";

const WhyGridIconWithText = ({ title, description, imageSrc }) => {
  return (
    <div className="pt-[1px] pb-[3px] pr-[3px] pl-[1px] rounded-[20px] app-integration-gradient">
      <div className="bg-colorWhite rounded-[20px] p-5 flex items-center gap-[18px]">
        <div>
          <div className="bg-[#F9F9F9] !w-[100px] !h-[100px] rounded-[20px] flex items-center justify-center">
            <Image
              src={imageSrc}
              alt={`${title}-image`}
              width="54"
              height="54"
            />
          </div>
        </div>
        <div>
          <h3 className="text-colorBlack text-2xl font-semibold mb-3">
            {title}
          </h3>
          <p className="text-base text-colorBlack">{description}</p>
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
    <div className="py-[90px]">
      <div className="container max-w-[1080px] mx-auto w-full">
        <h2 className="new-h2 w-ful mb-[40px]">
          Unlock the Full Potential of
          <br /> Your Support Teams
        </h2>
        {/* <p className="text-colorBlack text-[32px] leading-tight mb-[40px] text-center">
          “Unlock the Full Potential of Your Support Teams”
        </p> */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-[30px] mx-5 md:mx-0">
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
