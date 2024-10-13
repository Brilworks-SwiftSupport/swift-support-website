"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Icon } from "./Common";
import Image from "next/image";

const AccordionItem = ({
  index,
  title,
  imageSrc,
  imageAlt,
  content,
  handleOpen,
  open,
}) => {
  return (
    <>
      <Accordion open={open === index} icon={<Icon id={index} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(index)}
          className={`font-Outfit xl:py-8 md:py-6 py-4 !border-lightGray ${
            index === 1 ? "!border-t" : ""
          }  ${open === index ? "border-b-0 !pb-[14px]" : "!border-b"}`}
        >
          <h3 className={open === index ? "!text-colorBlack" : ""}>{title}</h3>
        </AccordionHeader>
        <AccordionBody
          className={
            open === index
              ? "border-b border-lightGray pt-0 lg:pb-8 pb-4 fade-in-content"
              : "hidden"
          }
        >
          <div className="w-full flex flex-col-reverse md:flex-row font-Outfit">
            <p className="lg:w-6/12 w-full text-base !text-colorGray">
              {content}
            </p>
            <div className="lg:w-6/12 w-full md:pl-[20px] pl-0 mb-5 lg:mb-0">
              <Image
                className="rounded-lg"
                src={imageSrc}
                alt={imageAlt}
                width="412"
                height="268"
              />
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default AccordionItem;
