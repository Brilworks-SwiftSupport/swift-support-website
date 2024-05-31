import React, { useState } from "react";
import AccordionItem from "../lib/AccordionItem";
import { useMediaQuery } from "react-responsive";

const IndustriesWeServe = () => {
  const isMobileNTablet = useMediaQuery({ maxWidth: 1023 });
  const [open, setOpen] = useState(1);
  const [open2, setOpen2] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpen2 = (value) => setOpen2(open2 === value ? 0 : value);

  const leftAccordionItems = [
    {
      title: "Healthcare",
      content:
        "When patients seek assistance, they prefer not to wait on hold. We recognize the significance of healthcare service providers being consistently available. SwiftSupport offers instant and round-the-clock support, streamlining communication and delivering quick assistance that keeps your healthcare operations running smoothly.",
      imageSrc: "/images/Healthcare_img.webp",
      imageAlt: "Healthcare Industries",
    },
    {
      title: "Retail",
      content:
        "Struggling with overwhelming customer inquiries and the need for instant responses? Our chatbot offers real-time engagement, efficiently handling routine queries. Reduce customer wait times, automate routine inquiries, assist customers in order tracking, product inquiries, and much more with one agent.",
      imageSrc: "/images/Retail_img.webp",
      imageAlt: "Retail Industries",
    },
    {
      title: "Finance",
      content:
        "Go beyond resolving issues to build lasting customer loyalty. Embed Swiftsuport into your Fintch app and deliver faster resolutions, reduce wait times, augment the customer engagement curve, resolve >60% of the repetitive customer queries end-to-end without human intervention, and save operational costs.",
      imageSrc: "/images/Finance_img.webp",
      imageAlt: "Finance Industries",
    },
    {
      title: "Legal",
      content:
        "Boost productivity by over 500%—summarize, draft, revise, and redefine contracts at lightning speed, all while maintaining control by leveraging Swiftsupport’s capabilities to conduct in-depth research in an instant, scan through extensive legal documents, PDFs, and text-based queries, and stay ahead in the legal research game.",
      imageSrc: "/images/Legal_img.webp",
      imageAlt: "Legal",
    },
    {
      title: "Cybersecurity",
      content:
        "Did you know that >80% of small businesses are not prepared for cyber attacks? Take charge of your cybersecurity and cut down on costs by integrating Swiftsupport. Our advanced solution offers real-time monitoring, scans system logs, and gathers data from various sources swiftly, ensuring your business is secure 24/7.",
      imageSrc: "/images/Cybersecurity_img.webp",
      imageAlt: "Cybersecurity image",
    },
    {
      title: "Marketing",
      content:
        "Supercharge your marketing strategy with SwiftSupport – your dedicated ally in boosting productivity. Experience a remarkable 50x increase in efficiency with Swiftsupport. Create compelling marketing content, recommend tailored products and services, and effortlessly resolve their queries – all year round, 365 days a year.",
      imageSrc: "/images/Marketing_img.webp",
      imageAlt: "Marketing Education",
    },
  ];

  const rightAccordionItems = [
    {
      title: "Education",
      content:
        "Provide 24/7 support with your AI service buddy — Swiftsupport. Empower students with personalized learning and streamline academic processes like instructions, assessments, data retrieval, updates, AI-driven surveys, and much more. Enjoy unparalleled efficiency at a fraction of the cost, scaling your impact without breaking the bank.",
      imageSrc: "/images/Education_img.webp",
      imageAlt: "Education Education",
    },
    {
      title: "Manufaturing",
      content:
        "Fine-tuned AI agents to meet the demands of your manufacturing and application requirements precisely, our AI solution stands out by effectively identifying anomalies in processes, equipment, and assets, ultimately optimizing workflows to minimize risk through the utilization of advanced pattern recognition and machine learning capabilities.",
      imageSrc: "/images/Manufaturing_img.webp",
      imageAlt: "Manufaturing image",
    },
    {
      title: "Logistics",
      content:
        "By seamlessly integrating advanced algorithms, our AI agent optimizes route planning, inventory management, and resource allocation, enabling logistics companies to enhance overall operational productivity, empowering businesses to make data-driven decisions, minimizing costs, and streamlining supply chain processes.",
      imageSrc: "/images/Logistics_img.webp",
      imageAlt: "Logistics image",
    },
    {
      title: "Insurance",
      content:
        "Swiftsupport is designed to revolutionize the insurance industry by seamlessly automating complex tasks, optimizing risk assessment, and enhancing decision-making processes. Leveraging advanced machine learning algorithms, it empowers insurance professionals to streamline underwriting, claims processing, and fraud detection.",
      imageSrc: "/images/Insurance_img.webp",
      imageAlt: "Insurance image",
    },
    {
      title: "Researcher",
      content:
        "Share findings, brainstorm ideas, and receive feedback from your AI assistant, anytime, anywhere, and refine your research questions. It seamlessly analyzes vast datasets and extracts valuable patterns to accelerate your research timelines and uncover insights that may have otherwise remained hidden.",
      imageSrc: "/images/Researcher_img.webp",
      imageAlt: "Researcher image",
    },
  ];

  const mergedAccordionItems = leftAccordionItems.concat(rightAccordionItems);

  return (
    <div className="container mx-auto w-full section-padding">
      <div className="flex items-center flex-col lg:flex-row justify-between md:mb-10 mb-6">
        <h2 className="lg:w-1/2 w-full md:text-[36px] text-[26px] font-bold text-left mb-4 md:mb-0">
          Industries we serve
        </h2>
        <p className="lg:w-1/2 w-full md:text-lg text-[14px] font-normal text-colorGray lg:pl-[5%]">
          Your customers deserve better, and with Swiftsupport, they get it. Our
          AI-powered chatbot can resolve over 80% of inquiries with lightning
          speed, leaving you and your customers free on what truly matters.
        </p>
      </div>
      <div className="flex flex-wrap industry-we-serve">
        {isMobileNTablet ? (
          <div className="w-full">
            {mergedAccordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                index={index + 1}
                title={item.title}
                imageSrc={item.imageSrc}
                imageAlt={item.imageAlt}
                content={item.content}
                handleOpen={handleOpen}
                open={open}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="lg:w-1/2 w-full lg:pr-[60px] pr-0">
              {leftAccordionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  index={index + 1}
                  title={item.title}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  content={item.content}
                  handleOpen={handleOpen}
                  open={open}
                />
              ))}
            </div>
            <div className="lg:w-1/2 w-full lg:pl-[60px] pl-0">
              {rightAccordionItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  index={index + 1}
                  title={item.title}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  content={item.content}
                  handleOpen={handleOpen2}
                  open={open2}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IndustriesWeServe;
