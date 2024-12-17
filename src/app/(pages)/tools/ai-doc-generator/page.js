import DocGenerator from "@/app/components/DocGenerator/DocGenerator";
import React from "react";

const page = () => {
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <DocGenerator />
      </div>
    </main>
  );
};

export default page;
