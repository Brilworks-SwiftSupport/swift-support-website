import Image from "next/image";
import React from "react";

const AIPoweredSolution = () => {
  const accrossIndustrySolution = [
    {
      title: "Manufacturing",
      description:
        "Fine-tuned AI agents to meet the demands of your manufacturing and application requirements precisely, our AI solution stands out by effectively identifying anomalies in processes, equipment, and assets, ultimately optimizing workflows to minimize risk through the utilization of advanced pattern recognition and machine learning capabilities.",
      buttonURL: "#",
      imageSrc: "/images/manufaturing.webp",
    },
    {
      title: "Shipping & Logistics",
      description:
        "By seamlessly integrating advanced algorithms, our AI agent optimizes route planning, inventory management, and resource allocation, enabling logistics companies to enhance overall operational productivity, empowering businesses to make data-driven decisions, minimizing costs, and streamlining supply chain processes.",
      buttonURL: "#",
      imageSrc: "/images/shipping.webp",
    },
    {
      title: "Healthcare",
      description:
        "When patients seek assistance, they prefer not to wait on hold. We recognize the significance of healthcare service providers being consistently available. SwiftSupport offers instant and round-the-clock support, streamlining communication and delivering quick assistance that keeps your healthcare operations running smoothly.",
      buttonURL: "#",
      imageSrc: "/images/healthcare.webp",
    },
    {
      title: "Financial Services",
      description:
        "Go beyond resolving issues to build lasting customer loyalty. Embed swiftsupport into your Fintch app and deliver faster resolutions, reduce wait times, augment the customer engagement curve, resolve >60% of the repetitive customer queries end-to-end without human intervention, and save operational costs.",
      buttonURL: "#",
      imageSrc: "/images/finance.webp",
    },
    {
      title: "E-commerce & Retail",
      description:
        "Struggling with overwhelming customer inquiries and the need for instant responses? Our chatbot offers real-time engagement, efficiently handling routine queries. Reduce customer wait times, automate routine inquiries, assist customers in order tracking, product inquiries, and much more with one agent.",
      buttonURL: "#",
      imageSrc: "/images/e-commerce-retail.webp",
    },
    {
      title: "Insurance",
      description:
        "Swiftsupport is designed to revolutionize the insurance industry by seamlessly automating complex tasks, optimizing risk assessment, and enhancing decision-making processes. Leveraging advanced machine learning algorithms, it empowers insurance professionals to streamline underwriting, claims processing, and fraud detection.",
      buttonURL: "#",
      imageSrc: "/images/insurance.webp",
    },
    {
      title: "Education",
      description:
        "Provide 24/7 support with your AI service buddy — Swiftsupport. Empower students with personalized learning and streamline academic processes like instructions, assessments, data retrieval, updates, AI-driven surveys, and much more. Enjoy unparalleled efficiency at a fraction of the cost, scaling your impact without breaking the bank.",
      buttonURL: "#",
      imageSrc: "/images/education.webp",
    },
  ];
  return (
    <div className="lg:pt-[90px] md:pt-[60px] pt-10 pb-[30px]">
      <div className="container max-w-[1200px] mx-auto w-full">
        <h2 className="new-h2 mb-5 px-2 md:px-0">
          AI-Powered Solutions Across Industries
        </h2>
        <p className="text-colorBlack md:text-center text-left text-2xl md:w-4/5 w-full mx-auto px-4 lg:mb-[40px] md:mb-7 mb-5">
          SwiftSupport makes an impact in industries where efficiency and
          customer satisfaction are key. Explore how we can help.
        </p>

        {accrossIndustrySolution?.map(
          ({ title, description, buttonURL, imageSrc }, index) => (
            <div
              className="flex items-center justify-center md:flex-row flex-col gap-[30px] lg:mb-[60px] md:mb-10 mb-6 mx-4"
              key={index}
            >
              <div
                className={`md:w-1/2 w-full ${
                  (index + 1) % 2 === 0 ? "md:order-1 order-2" : "order-2"
                }`}
              >
                <Image
                  className="rounded-[20px]"
                  src={imageSrc}
                  alt={`${title}-img`}
                  width="520"
                  height="330"
                />
              </div>
              <div
                className={`md:w-1/2 w-full ${
                  (index + 1) % 2 === 0 ? "md:order-2 order-1" : "order-1"
                }`}
              >
                <h3 className="text-colorBlack font-semibold text-2xl mb-4">
                  {title}
                </h3>
                <p className="text-colorBlack text-base lg:text-lg md:mb-[30px]">
                  {description}
                </p>
                {/* <div className="w-fit">
                  <Link
                    href={buttonURL || "#"}
                    className="border-colorBlack border text-colorBlack rounded-[30px] px-6 py-4 text-xl flex gap-2"
                  >
                    View Case Study{" "}
                    <Image
                      src="/images/arrow-up-right.svg"
                      alt="arriow-upward-right"
                      width="24"
                      height="24"
                    />{" "}
                  </Link>
                </div> */}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AIPoweredSolution;
