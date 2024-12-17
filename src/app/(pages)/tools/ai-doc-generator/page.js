import DocGenerator from "@/app/components/DocGenerator/DocGenerator";
import React from "react";


const fetchAllDocs = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;
  const queryParam = "doc";

  const response = await fetch(
    `${NEXT_PUBLIC_BE_URL}/stt_tts_data?type=${encodeURIComponent(
      queryParam
    )}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  console.log(data)

  // Map API response to match Tools component props
  return data.data_list.map((item) => ({
    text: item.text,
    doc_url: item.file_url,
    description: item.description,

  }));

   

};
export default async function Page()  {

  const all_docs = await fetchAllDocs();
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <DocGenerator DocRecords={all_docs}/>
      </div>
    </main>
  );
};

