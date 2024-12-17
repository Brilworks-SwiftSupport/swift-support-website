import TextToVoiceConverter from "@/app/components/TextToVoice/TextToVoice";
import React from "react";


const fetchData = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;
  const queryParam = "tts";

  const response = await fetch(
    `${NEXT_PUBLIC_BE_URL}/stt_tts_data?type=${encodeURIComponent(
      queryParam
    )}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  // Map API response to match Tools component props
  return data.data_list.map((item) => ({
    tts_url: item.audio_url,
    tts_text: item.text,
  }));

   

};

export default async function Page() {
  const records = await fetchData();
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <TextToVoiceConverter TTSrecords={records}/>
      </div>
    </main>
  );
};

