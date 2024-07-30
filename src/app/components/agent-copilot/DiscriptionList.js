import React from "react";
import { CiMonitor } from "react-icons/ci";

const DiscriptionList = () => {
  return (
    <div className="space-y-[30px] flex-[0.5] p-[50px_100px_50px_50px]">
      <div className="space-y-2">
        <h1 className="font-semibold text-[40px]">Customer Identification</h1>
        <h2 className="font-[600]  text-[26px]">
          A 360-degree view before the first<br></br> “hello”
        </h2>
      </div>
      <ul className="list-outside pl-6 space-y-1">
        <li className="text-[#333333] marker:text-[#8ed1fc] font-[400] text-[22px] leading-[32px] list-disc ">
          Identify customers instantly and surface critical details through
          AI-driven caller recognition.
        </li>
        <li className="text-[#333333] marker:text-[#8ed1fc] font-[400] text-[22px] leading-[32px] list-disc ">
          Eliminates manual lookups and summarizes relevant information from
          CRMs, past tickets, interaction history, and more.
        </li>
      </ul>
      <div className="flex">
        <button className="bg-[#01a9f4] flex rounded-[40px] hover:bg-black text-[#fff]  text-[12px] md:text-[18px] px-[20px]  gap-3 justify-center items-center py-[0.6rem] hover:text-[#fff] ">
          Request Demo <CiMonitor />
        </button>
      </div>
    </div>
  );
};

export default DiscriptionList;
