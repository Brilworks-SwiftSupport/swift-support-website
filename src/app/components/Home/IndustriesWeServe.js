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
        <p className="md:w-1/2 w-full md:text-[18px] text-[14px] font-normal text-colorGray md:pl-[10%]">
          Lorem ipsum dolor sit amet consectetur: Nibh scelerisque ut sit a
          libero fringilla pellentesque pellentesque morbi. Magna massa nec quam
          pretium. Cras porta eu in elementum nunc diam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
                  Lorem ipsum dolor sit amet consectetur Nibh scelerisque ut sit
                  a libero fringillrea pellentesque pellentesque morbi.Magna
                  massa nec quam pretium. Cras porta euy in elementum nunc diam
                  aliquam. Interdu vitae ultrices amet consectetur Nibhward
                  scelerisque ut sit a libero fringillrea wasde pellentesque
                  pellentesque morbi. Lorem ipsum dolor sit amet consectetur
                  Nibh scelerisque ut sit a libero fringillrea pellentesque
                  pellentesque morbi.Magna massa nec quam pretium. Cras porta
                  euy in elementum nunc diam aliquam.
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
