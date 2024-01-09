import Image from "next/image";
import React from "react";

const TrustedBy = () => {
  return (
    <div className="section-padding">
      <p className="md:text-[36px] text-[26px] font-bold text-center mb-10">
        Trusted by 500+ companies.
      </p>
      <div className="flex flex-wrap items-center justify-center md:gap-[60px] xl:gap-[80px] gap-10">
        <Image
          src="/images/Logo (1).svg"
          alt="Custom AI Logo"
          width="132"
          height="35"
        />
        <Image
          src="/images/Logo (2).svg"
          alt="Custom AI Logo"
          width="172"
          height="40"
        />
        <Image
          src="/images/Logo (3).svg"
          alt="Custom AI Logo"
          width="119"
          height="30"
        />
        <Image
          src="/images/Logo (4).svg"
          alt="Custom AI Logo"
          width="134"
          height="34"
        />
        <Image
          src="/images/Logo (5).svg"
          alt="Custom AI Logo"
          width="154"
          height="27"
        />
        <Image
          src="/images/Logo (6).svg"
          alt="Custom AI Logo"
          width="140"
          height="30"
        />
      </div>
    </div>
  );
};

export default TrustedBy;
