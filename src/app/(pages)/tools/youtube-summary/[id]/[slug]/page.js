import React from "react";
import YouTubeVideoDetails from "@/app/components/YouTube/YouTubeVideoDetails";

// Page Component
const DetailsPage = ({ pageData }) => {

    if (!pageData) {
        // If pageData is not available, show a fallback page
        return (
            <div className="text-center mt-20">
                
            </div>
        );
    }

    return (
        <main className="mb-10 mt-[100px] w-full max-w-[90%] mx-auto px-4">
            <div className="flex flex-col gap-6 items-center">
                <YouTubeVideoDetails pageData={pageData} />
            </div>
        </main>
    );
};

export async function getPageData(id) {
    const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

    try {
        const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_summary`, {method: "GET",
            next: { revalidate: 10 },
          });
        const data = await response.json();
        const youtube_data = data.youtube_summary_list;
        const matchingRecord = youtube_data.find((record) => record.id === parseInt(id)); 
        return matchingRecord;
    } catch (error) {
        console.error("Error fetching data:", error);
    }

}

// Server-side logic to fetch data for each request
export default async function Page({ params }) {
    const { id,slug } = params;  // Get the slug from the URL params
    const pageData = await getPageData(id); // Fetch the data based on the slug
    
    return <DetailsPage pageData={pageData} />;
}
