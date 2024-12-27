import VoiceToTextConverter from "@/app/components/VoiceToText/VoiceToText";
import React from "react";

export const metadata = {
  title: "Free Voice to Text Converter for Accurate Transcription",
  description:
    "Transcribe voice to text instantly with our AI Voice to Text tool, offering high accuracy and reliability.",
  keywords:
    "voice to text, speech to text, AI transcription, voice transcription, convert voice to text, speech recognition, accurate transcription, voice recognition, AI voice converter, text transcription tool, free voice to text",
  openGraph: {
    title: "Free Voice to Text Converter for Accurate Transcription",
    description:
      "Transcribe voice to text instantly with our AI Voice to Text tool, offering high accuracy and reliability.",
    images: [
      {
        url: "/voice-to-text/images/voice-to-text.png",
        width: 1200,
        height: 630,
        alt: "Voice to Text tool",
      },
    ],
  },
};

const fetchData = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;
  const queryParam = "stt";

  try {
    const response = await fetch(`${NEXT_PUBLIC_BE_URL}/stt_tts_data?type=${encodeURIComponent(queryParam)}`
    ,{method: "GET",
      next: { revalidate: 10 },
    });

    const data = await response.json();

    return data.data_list.map((item) => ({
      stt_url: item.file_url,
      stt_text: item.text,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default async function Page() {
  const records = await fetchData();
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <VoiceToTextConverter STTrecords={records} />
      </div>
    </main>
  );
}
