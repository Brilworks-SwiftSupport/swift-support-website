import ImageGenerator from "@/app/components/ImageGenerator/ImageGenerator";
import React from "react";
import axios from "axios";

export const metadata = {
  title: "Free AI Image Generator for Custom Visual Creations",
  description:
    "Generate stunning images from text with our AI Image Generator tool, delivering high-quality visuals in seconds.",
  keywords:
    "AI image generator, text to image, image creation, generate images, AI art generator, custom visuals, AI-powered visuals, image generator tool, create images with AI, AI-generated art, high-quality visuals",
  openGraph: {
    title: "Free AI Image Generator for Custom Visual Creations",
    description:
      "Generate stunning images from text with our AI Image Generator tool, delivering high-quality visuals in seconds.",
    images: [
      {
        url: "/image-generator/images/image_generator.svg",
        width: 1200,
        height: 630,
        alt: "AI Image Generator tool",
      },
    ],
  },
};

const fetchAllGeneratedImages = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  try {
    const response = await axios.get(`${NEXT_PUBLIC_BE_URL}/generated_image`);
    const data = response.data;

    return data.generated_image_list.map((item) => ({
      prompt: item.prompt,
      summary: item.summary,
    }));
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export default async function Page() {
  const images = await fetchAllGeneratedImages();
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <ImageGenerator allGeneratedImages={images} />
      </div>
    </main>
  );
}
