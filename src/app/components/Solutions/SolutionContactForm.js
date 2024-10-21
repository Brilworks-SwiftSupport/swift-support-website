"use client";
import React, { useState } from "react";
import { COUNTRIES } from "../lib/Constant";
import { usePathname } from "next/navigation";

const SolutionContactForm = () => {
  const pathname = usePathname();
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [respMessage, setRespMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    workEmail: "",
    companyName: "",
    message: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phoneValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (phoneValue.length > 10) return; // Prevent input if it exceeds 10 digits
      setFormData((prevData) => ({
        ...prevData,
        [name]: phoneValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const clearMessage = () => {
    setTimeout(() => {
      setRespMessage("");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/solutions`,
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            phone: selectedCountryCode + formData?.phone,
            page: pathname,
          }),
        }
      );

      if (response.ok) {
        setFormData({
          name: "",
          phone: "",
          workEmail: "",
          companyName: "",
          message: "",
        });
        setRespMessage("Your response is submitted successfully.");
        clearMessage();
      } else {
        setRespMessage("Something went wrong!");
      }
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error sending email", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#E8FCFF] form-shadow rounded-[20px] p-8">
      <form id="solution-form" onSubmit={handleSubmit}>
        <p className="text-colorBlack font-semibold md:text-2xl text-xl mb-5">
          Let’s grow your business together.
        </p>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3 md:mb-5 mb-3">
          <div>
            <label
              htmlFor="name"
              className="text-colorBlack !text-sm font-normal mb-1"
            >
              Name
            </label>
            <br />
            <input
              className="w-full border border-[#E2E2E2] h-11 rounded-[10px] md:pl-4 pl-3"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="workEmail"
              className="text-colorBlack !text-sm font-normal mb-1"
            >
              Work Email
            </label>
            <br />
            <input
              className="w-full border border-[#E2E2E2] h-11 rounded-[10px] md:pl-4 pl-3"
              type="workEmail"
              id="workEmail"
              name="workEmail"
              placeholder="Enter your email"
              value={formData.workEmail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-colorBlack !text-sm font-normal mb-1"
            >
              Phone Number
            </label>
            <br />
            <div className="flex gap-[6px]">
              <select
                onChange={(e) => setSelectedCountryCode(e.target.value)}
                value={selectedCountryCode}
                className="max-w-[70px] bg-colorWhite items-center border border-[#E2E2E2] rounded-[10px] h-11 pl-2"
              >
                {uniqueSortedCountries.map((country) => (
                  <option key={country.mobileCode} value={country.mobileCode}>
                    {`${country.mobileCode} `}
                  </option>
                ))}
              </select>
              <input
                className="w-full border border-[#E2E2E2] h-11 rounded-[10px] md:pl-4 pl-3"
                type="phone"
                id="number"
                name="phone"
                placeholder="123 456 7890"
                pattern="\d{10}"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="text-colorBlack text-sm font-normal mb-1"
            >
              Company
            </label>
            <br />
            <input
              className="w-full border border-[#E2E2E2] h-11 rounded-[10px] md:pl-4 pl-3"
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="message"
            className="text-colorBlack text-sm font-normal mb-1"
          >
            Your Message
          </label>
          <br />
          <textarea
            className="w-full border border-[#E2E2E2] rounded-[10px] md:pl-4 pl-3 pt-[10px]"
            type="text"
            id="message"
            name="message"
            rows="4"
            placeholder="Enter your company name"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div className="text-colorBlack h-4 mt-1" id="sucess_msg">
          {respMessage}
        </div>

        <button
          type="submit"
          className={`flex w-full items-center justify-center md:w-fit font-semibold border-colorBlack border bg-colorBlack text-colorWhite rounded-[30px] px-6 py-3 text-sm mt-[30px] disabled:cursor-not-allowed disabled:bg-opacity-60`}
          disabled={isSubmitting}
        >
          Request a Demo
        </button>
      </form>
    </div>
  );
};

export default SolutionContactForm;
