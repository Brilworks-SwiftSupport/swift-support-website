import React from "react";
import YouTubeVideoDetails from "@/app/components/YouTube/YouTubeVideoDetails";

// Fetch all YouTube summary data
async function fetchAllPageData() {
    const NEXT_PUBLIC_BE_URL = process.env.NEXT_PUBLIC_BE_URL;

    try {
        const response = await fetch(`${NEXT_PUBLIC_BE_URL}/youtube_summary`,  { cache: "no-store"  });
        const data = await response.json();
        return data.youtube_summary_list || [];
    } catch (error) {
        console.error("Error fetching all data:", error);
        return [];
    }
}

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from the start
        .replace(/-+$/, ""); // Trim - from the end
};

export async function generateStaticParams() {
    const allData = await fetchAllPageData();

    return allData.map((record) => ({
        id: record.id.toString(), // Ensure ID is a string for URL params
        slug: slugify(record.video_title) // Use slugify for the slug
    }));
}

// Fetch individual video data by ID
async function fetchPageData(id) {
    const allData = await fetchAllPageData();
    return allData.find((record) => record.id === parseInt(id)) || null;
}

// Static Page Generation
export default async function Page({ params }) {
    const { id, slug } = params;

    // Fetch data for the specific ID
    const pageData = await fetchPageData(id);

    if (!pageData) {
        // Return a 404-like page if no data found
        return (
            <div className="text-center mt-20">
                <h1>Video Not Found</h1>
                <p>We couldn't find the details for this video. Please try again later.</p>
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
}

