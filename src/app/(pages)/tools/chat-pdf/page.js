import ChatPDF from "@/app/components/ChatPDF/ChatPDF";
import React from "react";

const page = () => {
  return (
    <main className="mb-10 mt-20 w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <ChatPDF />
      </div>
    </main>
  );
};

export default page;
