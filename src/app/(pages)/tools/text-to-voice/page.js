import TextToVoiceConverter from "@/app/components/TextToVoice/TextToVoice";
import React from "react";

export const metadata = {
  title: "Free AI Text to Speech with High-Quality Voices",
  description:
    "Convert text to speech effortlessly with our AI-powered Text to Speech tool for clear and natural audio.",
  keywords:
    "AI text to speech, text to speech tool, speech synthesis, convert text to voice, text to voice, natural speech, AI voice generator, speech conversion, high-quality voices, text-to-speech online, free text-to-speech",
  openGraph: {
    title: "Free AI Text to Speech with High-Quality Voices",
    description:
      "Convert text to speech effortlessly with our AI-powered Text to Speech tool for clear and natural audio.",
    images: [
      {
        url: "/text-to-voice/images/text-to-voice.svg",
        width: 1200,
        height: 630,
        alt: "Text to Speech tool",
      },
    ],
  },
};

const fetchData = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;
  const queryParam = "tts";

  const response = await fetch(
    `${NEXT_PUBLIC_BE_URL}/stt_tts_data?type=${encodeURIComponent(queryParam)}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();

  return data.data_list.map((item) => ({
    tts_url: item.file_url,
    tts_text: item.text,
  }));
};

export default async function Page() {
  const records = await fetchData();
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <TextToVoiceConverter TTSrecords={records} />
      </div>
    </main>
  );
}
