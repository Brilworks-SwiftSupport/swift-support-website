"use client";
import Image from "next/image";
import React, { useState } from "react";
import { COUNTRIES } from "../lib/Constant";

const ContactUS = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");

  const uniqueSortedCountries = Array.from(
    new Set(COUNTRIES.map((country) => country.mobileCode))
  )
    .map((mobileCode) =>
      COUNTRIES.find((country) => country.mobileCode === mobileCode)
    )
    .sort(
      (a, b) =>
        a.mobileCode.length - b.mobileCode.length ||
        a.mobileCode.localeCompare(b.mobileCode)
    );

  return (
    <div className="section-padding !pt-[120px]">
      <div className="text-colorBlack font-light xl:text-[70px] md:text-[50px] text-[32px] flex text-center flex-col lg:mb-[60px] md:mb-10 mb-5">
        <h1>Get in touch</h1>
      </div>
      <div className="flex gap-5 flex-col lg:flex-row">
        <div className="lg:w-1/2 w-full rounded-[30px] [background:linear-gradient(180deg,_#a9e9ff,_rgba(131,_222,_252,_0))] pxl:p-10 md:p-7 p-5">
          <div>
            <Image
              src="/images/logo.svg"
              alt="SwiftSupport Logo"
              width="263"
              height="45"
              className="mb-[10px]"
            />

            <p className="text-lg mb-[30px] text-colorDarkBlue">
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
          <div className="[background:linear-gradient(-90deg,_rgba(131,_222,_252,_0),_#fba8a8_48.96%,_rgba(131,_222,_252,_0))] w-full h-1 lg:my-[60px] md:my-10 my-7" />
          <div>
            <p className="text-colorBlack text-xl font-normal mb-10 text-center">
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
        <div className="lg:w-1/2 w-full rounded-[30px] [background:linear-gradient(180deg,_#f6f395,_rgba(242,_237,_123,_0))] xl:p-10 md:p-7 p-5">
          <div>
            <span className="text-[30px] font-semibold mb-[10px]">
              Quick Responses Await!
            </span>
            <p className="text-lg font-normal leading-[26px] text-colorDarkBlue mb-7">
              Connect with us! Feel free to ask any questions or share your
              thoughts.
            </p>
            <form>
              <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3 md:mb-5 mb-3">
                <div>
                  <label
                    for="firstName"
                    className="text-colorGray font-normal mb-[10px]"
                  >
                    First Name*
                  </label>
                  <br />
                  <input
                    className="w-full border border-colorBlack lg:h-[50px] h-[40px] rounded-[10px] mt-[10px] md:py-[30px] md:pl-5 pl-3"
                    type="text"
                    id="firstName"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    for="lastName"
                    className="text-colorGray font-normal mb-[10px]"
                  >
                    Last Name*
                  </label>
                  <br />
                  <input
                    className="w-full border border-colorBlack lg:h-[50px] h-[40px] rounded-[10px] mt-[10px] md:py-[30px] md:pl-5 pl-3"
                    type="text"
                    id="lastName"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    className="text-colorGray font-normal mb-[10px]"
                  >
                    Email Address*
                  </label>
                  <br />
                  <input
                    className="w-full border border-colorBlack lg:h-[50px] h-[40px] rounded-[10px] mt-[10px] md:py-[30px] md:pl-5 pl-3"
                    type="email"
                    id="email"
                    placeholder="john@gmail.com"
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    className="text-colorGray font-normal mb-[10px]"
                  >
                    Phone Number*
                  </label>
                  <br />
                  <div className="flex gap-[6px]">
                    <select
                      onChange={(e) => setSelectedCountryCode(e.target.value)}
                      value={selectedCountryCode}
                      className="max-w-[70px] items-center border border-colorBlack rounded-[10px] md:h-auto h-10 mt-[10px] md:py-[20px] pl-2"
                    >
                      {uniqueSortedCountries.map((country) => (
                        <option
                          key={country.mobileCode}
                          value={country.mobileCode}
                        >
                          {`${country.mobileCode} `}
                        </option>
                      ))}
                    </select>
                    <input
                      className="w-full border border-colorBlack lg:h-[50px] h-[40px] rounded-[10px] mt-[10px] md:py-[30px] md:pl-5 pl-3"
                      type="phone"
                      id="number"
                      placeholder="123 456 7890"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="companyName"
                    className="text-colorGray font-normal mb-[10px]"
                  >
                    Company Name*
                  </label>
                  <br />
                  <input
                    className="w-full border border-colorBlack lg:h-[50px] h-[40px] rounded-[10px] mt-[10px] md:py-[30px] md:pl-5 pl-3"
                    type="text"
                    id="companyName"
                    placeholder="XYZ Company"
                  />
                </div>

                <div>
                  <label
                    for="jobTitle"
                    className="text-colorGray font-normal mb-[10px]"
                  >
                    Job Title*
                  </label>
                  <br />
                  <input
                    className="w-full border border-colorBlack lg:h-[50px] h-[40px] rounded-[10px] mt-[10px] md:py-[30px] md:pl-5 pl-3"
                    type="text"
                    id="jobTitle"
                    placeholder="Designer"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  for="help"
                  className="text-colorGray font-normal mb-[10px]"
                >
                  How can we help?
                </label>
                <br />
                <select
                  className="w-full items-center border border-colorBlack rounded-[10px] md:h-auto h-10 mt-[10px] md:py-[20px] md:pl-5 pl-3"
                  id="help"
                  name="help"
                >
                  <option value="one">Lorem ipsum dolor sit amen 1.</option>
                  <option value="two">Lorem ipsum dolor sit amen 2.</option>
                  <option value="three">Lorem ipsum dolor sit amen 3.</option>
                </select>
              </div>
              <div className="form-group font-medium text-sm mb-5">
                <input type="checkbox" id="terms-and-condition" />
                <label
                  for="terms-and-condition"
                  className="select-none relative cursor-pointer"
                >
                  I read and accept
                  <b className="pl-[3px]">
                    <u>Terms & Conditions, Privacy Policy.</u>
                  </b>
                </label>
              </div>
              <button type="submit" className="button_black">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;
