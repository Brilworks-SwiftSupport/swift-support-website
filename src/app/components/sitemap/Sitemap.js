import { getblog } from "@/app/lib/getblog";
import Link from "next/link";

async function getBlogData() {
  const url = new URL("https://api.storyblok.com/v2/cdn/stories");
  url.searchParams.append("cv", "1721647132");
  url.searchParams.append(
    "filter_query[component][in]",
    "swiftsupport_article"
  );
  url.searchParams.append("page", "1");
  url.searchParams.append("per_page", "100");
  url.searchParams.append("starts_with", "swiftsupport/swiftsupport-blog/");
  url.searchParams.append("token", process.env.NEXT_PUBLIC_ACCESS_TOKEN);
  url.searchParams.append("version", process.env.NEXT_PUBLIC_STORYBLOK_VERSION);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    throw new Error("Failed to fetch blog data");
  }

  const data = await res.json();
  return data.stories || [];
}

export default async function Sitemap() {
  const blogData = await getblog();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className="mt-[6rem] md:mt-[9rem] my-[15px] mx-auto md:w-1/2 w-[90%]">
      <div className="flex align-middle justify-center">
        <h1 className="text-[30px] leading-9 font-bold">Site Map</h1>
      </div>
      <div className="py-10">
        <div className="mb-4">
          <h3 className="text-2xl border-b border-b-[#c5ccd0] font-bold pb-2 mb-3">
            About Swift Support
          </h3>
          <div className="grid gap-2 md:grid-cols-4 grid-cols-2">
            <div>
              <li>
                <Link href={baseUrl} className="font-medium">
                  Home
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://cal.com/swiftsupport/demo"
                  className="font-medium"
                >
                  Contact
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link href={`${baseUrl}blog/`} className="font-medium">
                  Blog
                </Link>
              </li>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl border-b border-b-[#c5ccd0] font-bold pb-2 mb-3">
            Solutions
          </h3>
          <div className="grid gap-2 md:grid-cols-3 grid-cols-2">
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-healthcare/"
                  className="font-medium"
                >
                  Automate Healthcare
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-manufacturing/"
                  className="font-medium"
                >
                  Automate Manufacturing
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-freight/"
                  className="font-medium"
                >
                  Automate Freight
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-ecommerce/"
                  className="font-medium"
                >
                  Automate Ecommerce
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-insurance/"
                  className="font-medium"
                >
                  Automate Insurance
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-education/"
                  className="font-medium"
                >
                  Automate Education
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-finance/"
                  className="font-medium"
                >
                  Automate Finance
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-hr/"
                  className="font-medium"
                >
                  Automate HR Workflow
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-it-operations/"
                  className="font-medium"
                >
                  Automate IT
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-operations/"
                  className="font-medium"
                >
                  Automate Operations
                </Link>
              </li>
            </div>

            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-marketing/"
                  className="font-medium"
                >
                  Automate Marketing
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/solutions/automate-sales/"
                  className="font-medium"
                >
                  Automate Sales
                </Link>
              </li>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl border-b border-b-[#c5ccd0] font-bold pb-2 mb-3">
            Guide
          </h3>
          <div className="grid gap-2 md:grid-cols-3 grid-cols-2">
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/guide/how-to-build-an-ai-agent/"
                  className="font-medium"
                >
                  How to Build an AI Agent?
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/guide/how-to-add-live-chat-to-website/"
                  className="font-medium"
                >
                  How to add Live Chat ?
                </Link>
              </li>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-2xl border-b border-b-[#c5ccd0] font-bold pb-2 mb-3">
            Tools
          </h3>
          <div className="grid gap-2 md:grid-cols-3 grid-cols-2">
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/text-to-voice/"
                  className="font-medium"
                >
                  Text To Voice
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/voice-to-text/"
                  className="font-medium"
                >
                  Voice To Text
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/image-generator/"
                  className="font-medium"
                >
                  AI Image Generator
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/ai-paraphraser/"
                  className="font-medium"
                >
                  AI Paraphraser
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/plagiarism-checker/"
                  className="font-medium"
                >
                  Plagiarism Checker
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/ai-content-detector/"
                  className="font-medium"
                >
                  AI Content Detector
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/youtube-summary/"
                  className="font-medium"
                >
                  Youtube Video Summarizer
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link
                  href="https://www.swiftsupport.ai/tools/chat-pdf/"
                  className="font-medium"
                >
                  Talk WIth Document
                </Link>
              </li>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl border-b border-b-[#c5ccd0] font-bold pb-2 mb-3">
            Blogs
          </h3>
          <div className="grid gap-[10px] grid-cols-1">
            {blogData.length ? (
              blogData.map(({ slug, content }, index) => (
                <div key={index}>
                  <li>
                    <Link
                      href={`${baseUrl}blog/${slug}/`}
                      className="font-medium"
                    >
                      {content.title}
                    </Link>
                  </li>
                </div>
              ))
            ) : (
              <div className="flex align-middle justify-center">
                No blog posts found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600; // revalidate every hour
