import Image from "next/image";
import React from "react";

const ContactUS = () => {
  return (
    <div className="section-padding !pt-[120px]">
      <div className="text-colorBlack font-light xl:text-[70px] md:text-[50px] text-[32px] flex text-center flex-col">
        <h1 className="text-[70px]">Get in touch</h1>
      </div>
      <div className="flex gap-5">
        <div className="lg:w-1/2 w-full rounded-[30px] [background:linear-gradient(180deg,_#a9e9ff,_rgba(131,_222,_252,_0))] p-10">
          <div>
            <Image
              src="/images/logo.svg"
              alt="SwiftSupport Logo"
              width="263"
              height="45"
              className="mb-[10px]"
            />

            <p className="text-[18px] mb-[30px] text-colorDarkBlue">
              Swiftsupport, your dynamic AI assistant, scans your websites,
              PDFs, and text to deliver accurate answers, generate creative
              formats, and resolve up to 80% of customer queries.
            </p>
          </div>
          <div className="">
            <span className="text-xl font-normal text-colorBlack">
              John Smith
            </span>
            <br />
            <span className="text-sm font-medium text-colorGray">
              Member of Technical Staff
            </span>
          </div>
          <div className="[background:linear-gradient(-90deg,_rgba(131,_222,_252,_0),_#fba8a8_48.96%,_rgba(131,_222,_252,_0))] w-full h-1 my-[60px]" />
          <div>
            <p className="text-colorBlack text-xl font-normal mb-10 px-20">
              Trusted by the world’s most ambitious teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              <Image
                src="/images/Logo (1).svg"
                alt="SwiftSupport Logo"
                width="132"
                height="35"
              />
              <Image
                src="/images/Logo (2).svg"
                alt="SwiftSupport Logo"
                width="172"
                height="40"
              />
              <Image
                src="/images/Logo (3).svg"
                alt="SwiftSupport Logo"
                width="119"
                height="30"
              />
              <Image
                src="/images/Logo (4).svg"
                alt="SwiftSupport Logo"
                width="134"
                height="34"
              />
              <Image
                src="/images/Logo (5).svg"
                alt="SwiftSupport Logo"
                width="154"
                height="27"
              />
              <Image
                src="/images/Logo (6).svg"
                alt="SwiftSupport Logo"
                width="140"
                height="30"
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full rounded-[30px] [background:linear-gradient(180deg,_#f6f395,_rgba(242,_237,_123,_0))] p-10"></div>
      </div>
    </div>
  );
};

export default ContactUS;
