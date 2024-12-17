import ImageGenerator from "@/app/components/ImageGenerator/ImageGenerator";
import React from "react";



const fetchAllGeneratedImages = async () => {
  const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

  const response = await fetch(`${NEXT_PUBLIC_BE_URL}/generated_image`,{method:"GET"});

  const data = await response.json();

  return data.generated_image_list.map((item) => ({
    prompt: item.prompt,
    summary: item.summary,
  }));
      
};


export default async function Page() {
  const images = await fetchAllGeneratedImages();
  return (
    <main className="mb-10 mt-[190px] w-full md:max-w-[90%] mx-auto">
      <div className="mt-20 w-full max-w-[90%] mx-auto">
        <ImageGenerator allGeneratedImages={images}/>
      </div>
    </main>
  );
};

