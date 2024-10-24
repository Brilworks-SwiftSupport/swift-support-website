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
  url.searchParams.append("starts_with", "blog/");
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
  const blogData = await getBlogData();
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
                <Link href={`${baseUrl}contact-us`} className="font-medium">
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
            Blogs
          </h3>
          <div className="grid gap-[10px] grid-cols-1">
            {blogData.length ? (
              blogData.map(({ full_slug, content }, index) => (
                <div key={index}>
                  <li>
                    <Link
                      href={`${baseUrl}${full_slug}`}
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
