"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "../lib/Common";

const Accordion = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.Accordion),
  { ssr: false }
);
const AccordionHeader = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.AccordionHeader),
  { ssr: false }
);
const AccordionBody = dynamic(
  () => import("@material-tailwind/react").then((mod) => mod.AccordionBody),
  { ssr: false }
);

const BlogFAQ = ({ FAQData }) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="container w-full mx-auto faq-bottom font-out">
      <div className="text-center">
        <h2 className="text-left lg:text-[32px] md:text-[32px] text-[32px]">
          FAQ
        </h2>
      </div>

      <div>
        <div itemScope={true} itemType="https://schema.org/FAQPage">
          {FAQData?.length &&
            FAQData?.map(({ Question, Answer }, index) => (
              <Accordion
                key={index + 1}
                open={open === index + 1}
                icon={
                  <Icon
                    id={index + 1}
                    open={open}
                    openClass={"rotate-180"}
                    closeClass={"rotate-0"}
                  />
                }
                className={`accordion-item ${
                  open === index + 1 ? "bg-colorLightBlue" : "bg-colorWhite"
                }`}
                itemScope="true"
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <AccordionHeader
                  onClick={() => handleOpen(index + 1)}
                  className="accordion-button font-Urbanist"
                >
                  <h3 itemProp="name">{Question}</h3>
                </AccordionHeader>
                <AccordionBody>
                  <div
                    className="accordion-body font-Urbanist"
                    itemScope="true"
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p style={{ whiteSpace: "pre-wrap" }} itemProp="text">
                      {Answer}
                    </p>
                  </div>
                </AccordionBody>
              </Accordion>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogFAQ;
