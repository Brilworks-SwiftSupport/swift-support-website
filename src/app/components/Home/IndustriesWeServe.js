import React, { useState } from "react";
import { Icon } from "../lib/Common";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from "next/image";

const IndustriesWeServe = () => {
  const [open, setOpen] = useState(3);
  const [open2, setOpen2] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleOpen2 = (value) => setOpen2(open2 === value ? 0 : value);

  return (
    <div className="w-full section-padding">
      <div className="flex items-center flex-col md:flex-row justify-between mb-10">
        <h2 className="md:w-1/2 w-full md:text-[36px] text-[26px] font-bold text-left mb-4 md:mb-0">
          Industries we serve
        </h2>
        <p className="md:w-1/2 w-full md:text-lg text-[14px] font-normal text-colorGray md:pl-[5%]">
          Your customers deserve better, and with Swiftsupport, they get it. Our
          AI-powered chatbot can resolve over 60% of inquiries with lightning
          speed, leaving you and your customers free on what truly matters.
        </p>
      </div>
      <div className="flex flex-wrap industry-we-serve">
        <div className="lg:w-1/2 w-full lg:pr-[60px] pr-0">
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className={`xl:py-8 md:py-6 py-4 border-t border-lightGray  ${
                open === 1 ? "border-b-0 pb-[14px]" : "border-b"
              }`}
            >
              <h3 className={open === 1 ? "!text-colorBlack" : ""}>
                Healthcare
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open === 1 ? "border-b border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  When patients seek assistance, they prefer not to wait on
                  hold. We recognize the significance of healthcare service
                  providers being consistently available. SwiftSupport offers
                  instant and round-the-clock support, streamlining
                  communication and delivering quick assistance that keeps your
                  healthcare operations running smoothly.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open === 2 ? "border-b-0 pb-[14px]" : "border-b "
              }`}
            >
              <h3 className={open === 2 ? "!text-colorBlack" : ""}>Retail</h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open === 2 ? "border-b border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Struggling with overwhelming customer inquiries and the need
                  for instant responses? Our chatbot offers real-time
                  engagement, efficiently handling routine queries. Reduce
                  customer wait times, automate routine inquiries, assist
                  customers in order tracking, product inquiries, and much more
                  with one agent.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader
              onClick={() => handleOpen(3)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open === 3 ? "border-b-0" : "border-b "
              }`}
            >
              <h3 className={open === 3 ? "!text-colorBlack" : ""}>Finance</h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open === 3 ? "border-b border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Go beyond resolving issues to build lasting customer loyalty.
                  Embed Swiftsuport into your Fintch app and deliver faster
                  resolutions, reduce wait times, augment the customer
                  engagement curve, resolve &gt;60% of the repetitive customer
                  queries end-to-end without human intervention, and save
                  operational costs.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
            <AccordionHeader
              onClick={() => handleOpen(4)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open === 4 ? "border-b-0 pb-[14px]" : "border-b "
              }`}
            >
              <h3 className={open === 4 ? "!text-colorBlack" : ""}>Legal</h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open === 4 ? "border-b border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Boost productivity by over 500%—summarize, draft, revise, and
                  redefine contracts at lightning speed, all while maintaining
                  control by leveraging Swiftsupport’s capabilities to conduct
                  in-depth research in an instant, scan through extensive legal
                  documents, PDFs, and text-based queries, and stay ahead in the
                  legal research game.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
        <div className="lg:w-1/2 w-full lg:pl-[60px] pl-0">
          <Accordion open={open2 === 1} icon={<Icon id={1} open={open2} />}>
            <AccordionHeader
              onClick={() => handleOpen2(1)}
              className={`xl:py-8 md:py-6 py-4 border-t border-lightGray  ${
                open2 === 1 ? "border-b-0 pb-[14px]" : "border-b"
              }`}
            >
              <h3 className={open2 === 1 ? "!text-colorBlack" : ""}>
                Cybersecurity
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open2 === 1 ? "border-b border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Did you know that &gt;80% of small businesses are not prepared
                  for cyber attacks? Take charge of your cybersecurity and cut
                  down on costs by integrating Swiftsupport. Our advanced
                  solution offers real-time monitoring, scans system logs, and
                  gathers data from various sources swiftly, ensuring your
                  business is secure 24/7.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open2 === 2} icon={<Icon id={2} open={open2} />}>
            <AccordionHeader
              onClick={() => handleOpen2(2)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open2 === 2 ? "border-b-0 pb-[14px]" : "border-b "
              }`}
            >
              <h3 className={open2 === 2 ? "!text-colorBlack" : ""}>
                Marketing
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open2 === 2 ? "border-b border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Supercharge your marketing strategy with SwiftSupport – your
                  dedicated ally in boosting productivity. Experience a
                  remarkable 50x increase in efficiency with Swiftsupport.
                  Create compelling marketing content, recommend tailored
                  products and services, and effortlessly resolve their queries
                  – all year round, 365 days a year.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open2 === 3} icon={<Icon id={3} open={open2} />}>
            <AccordionHeader
              onClick={() => handleOpen2(3)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open2 === 3 ? "border-b-0" : "border-b "
              }`}
            >
              <h3 className={open2 === 3 ? "!text-colorBlack" : ""}>
                Education
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open2 === 3 ? "border-b border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Provide 24/7 support with your AI service buddy —
                  Swiftsupport. Empower students with personalized learning and
                  streamline academic processes like instructions, assessments,
                  data retrieval, updates, AI-driven surveys, and much more.
                  Enjoy unparalleled efficiency at a fraction of the cost,
                  scaling your impact without breaking the bank.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open2 === 4} icon={<Icon id={4} open={open2} />}>
            <AccordionHeader
              onClick={() => handleOpen2(4)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open2 === 4 ? "border-b-0 pb-[14px]" : "border-b "
              }`}
            >
              <h3 className={open2 === 4 ? "!text-colorBlack" : ""}>
                Manufacturing
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open2 === 4 ? "border-b  border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Fine-tuned AI agents to meet the demands of your manufacturing
                  and application requirements precisely, our AI solution stands
                  out by effectively identifying anomalies in processes,
                  equipment, and assets, ultimately optimizing workflows to
                  minimize risk through the utilization of advanced pattern
                  recognition and machine learning capabilities.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open2 === 5} icon={<Icon id={5} open={open2} />}>
            <AccordionHeader
              onClick={() => handleOpen2(5)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open2 === 5 ? "border-b-0 pb-[14px]" : "border-b "
              }`}
            >
              <h3 className={open2 === 5 ? "!text-colorBlack" : ""}>
                Logistics
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open2 === 5 ? "border-b  border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  By seamlessly integrating advanced algorithms, our AI agent
                  optimizes route planning, inventory management, and resource
                  allocation, enabling logistics companies to enhance overall
                  operational productivity, empowering businesses to make
                  data-driven decisions, minimizing costs, and streamlining
                  supply chain processes.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open2 === 6} icon={<Icon id={6} open={open2} />}>
            <AccordionHeader
              onClick={() => handleOpen2(6)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open2 === 6 ? "border-b-0 pb-[14px]" : "border-b "
              }`}
            >
              <h3 className={open2 === 6 ? "!text-colorBlack" : ""}>
                Insurance
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open2 === 6 ? "border-b  border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Swiftsupport is designed to revolutionize the insurance
                  industry by seamlessly automating complex tasks, optimizing
                  risk assessment, and enhancing decision-making processes.
                  Leveraging advanced machine learning algorithms, it empowers
                  insurance professionals to streamline underwriting, claims
                  processing, and fraud detection.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open2 === 7} icon={<Icon id={7} open={open2} />}>
            <AccordionHeader
              onClick={() => handleOpen2(7)}
              className={`xl:py-8 md:py-6 py-4 border-lightGray ${
                open2 === 7 ? "border-b-0 pb-[14px]" : "border-b "
              }`}
            >
              <h3 className={open2 === 7 ? "!text-colorBlack" : ""}>
                Researcher
              </h3>
            </AccordionHeader>
            <AccordionBody
              className={
                open2 === 7 ? "border-b  border-lightGray pt-0 pb-10" : "hidden"
              }
            >
              <div className="w-full flex flex-wrap flex-col-reverse lg:flex-row">
                <p className="lg:w-6/12 w-full text-base text-colorGray">
                  Share findings, brainstorm ideas, and receive feedback from
                  your AI assistant, anytime, anywhere, and refine your research
                  questions. It seamlessly analyzes vast datasets and extracts
                  valuable patterns to accelerate your research timelines and
                  uncover insights that may have otherwise remained hidden.
                </p>
                <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
                  <Image
                    className="rounded-[15px]"
                    src="/images/Finance.svg"
                    alt="Finance image"
                    width="412"
                    height="268"
                  />
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default IndustriesWeServe;
