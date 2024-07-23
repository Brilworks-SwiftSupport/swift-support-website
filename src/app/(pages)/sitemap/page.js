import Sitemap from "@/app/components/sitemap/Sitemap"
import React from 'react'

export async function generateMetadata() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  
    return {
      title: "Site Map | Swift Support",
      description: "Explore our site map page to find information about who we are and who we work with, and details about our  product.",
      openGraph: {
        title: "Site Map | Swift Support",
        description: "Explore our site map page to find information about who we are and who we work with, and details about our product.",
        url: `${baseUrl}sitemap/`,
        siteName: "Swift Support",
        images: [
          {
            url: `${baseUrl}images/Prototype.jpg`,
          },
        ],
        locale: "en-US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: "Site Map | Swift Support",
        description: "Explore our site map page to find information about who we are and who we work with, and details about our product.",
        site: "@_SwiftSupport",
      },
      alternates: {
        canonical: `${baseUrl}sitemap/`,
      },
    };
  }
const page = () => {
  return (
    <Sitemap/>
  )
}

export default page