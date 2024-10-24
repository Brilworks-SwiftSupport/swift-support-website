"use client";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import Link from "next/link";
import BlogFAQ from "../Blog/BlogFAQ";
import { usePathname } from "next/navigation";
import Image from "next/image";
import BeatLoader from "../Loader";
// const ProductSuggestion = dynamic(() => import("./ProductSuggestion"));
// const UseCaseSuggestion = dynamic(() => import("./UseCaseSuggestion"));

const GuideContentSection = ({ content, FAQData }) => {
  const pathname = usePathname();
  const [headings, setHeadings] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const blogTableOfContent =
    content + `${FAQData?.length && "<h2>FAQ</h2>"}` || "";

  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const headingId = hash.replace("#", ""); // Remove the # symbol to get the ID
      setTimeout(() => {
        const targetElement = document.getElementById(headingId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }, 500);
    }
  }, []);

  function modifyImagesWithLazyLoading(html) {
    return parse(html, {
      replace: (node, index) => {
        if (node.type === "tag" && node.name === "img") {
          node.attribs.loading = "lazy";
          node.attribs.decoding = "async";
        }

        if (node.type === "tag" && node.name === "a") {
          if (
            node.attribs.href &&
            !node.attribs.href.includes("swiftsupport.ai")
          ) {
            node.attribs.rel = "nofollow noopener";
          } else {
            node.attribs.rel = "noopener";
          }
        }
        return node;
      },
    });
  }

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(blogTableOfContent, "text/html");
    const headings = Array.from(doc.querySelectorAll("h2")).map((heading) => {
      const level = parseInt(heading.tagName.slice(1), 10);
      const text = heading.textContent;
      return { level, text };
    });
    setHeadings(headings);
  }, [blogTableOfContent]);

  useEffect(() => {
    // Add temporary IDs to the headings for smooth scrolling
    const headings = document.querySelectorAll("h2");
    headings.forEach((heading, index) => {
      heading.id = `temp-section-${index}`;
    });
  }, []);

  function textToId(headingText) {
    return headingText
      .toLowerCase() // Convert to lowercase
      .replace(/[^\w\s]/g, "") // Remove all non-word characters (punctuation, etc.)
      .replace(/\s+/g, "-");
  }

  useEffect(() => {
    // Add temporary IDs to the headings for smooth scrolling
    const headings = document.querySelectorAll("h2");
    headings.forEach((heading, index) => {
      let headingText = heading.textContent || heading.innerText;

      let headingId = textToId(headingText);
      heading.id = headingId;
    });
  }, [!isLoading]);

  const handleTableOfContentLinkClick = (e, index) => {
    setActiveLink(index);
    e.preventDefault();

    const targetId = e.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", targetId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headingPositions = headings.map((heading, index) => {
        let headingText = heading.text;

        let headingId = textToId(headingText);
        const targetElement = document.getElementById(`${headingId}`);

        if (targetElement) {
          return {
            id: `${headingId}`,
            offsetTop: targetElement.offsetTop,
          };
        }
        return null;
      });

      // Find the first heading whose offsetTop is greater than or equal to scrollY
      const activeHeadingIndex = headingPositions.find(
        (position) => position !== null && position.offsetTop >= scrollY
      );
      // Set the active link to the ID of the active heading
      if (activeHeadingIndex) {
        setActiveLink(activeHeadingIndex.id);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  return (
    <div className="container max-w-[1200px] mx-auto my-0 px-4">
      <div className="flex flex-wrap -mx-4 !mb-16">
        <div className="slg:basis-1/5 slg:flex-shrink-0 slg:flex-grow-0 slg:max-w-[20%] !pr-4 min-h-[1px] w-full slg:block hidden">
          <div className="sticky top-[110px] !pb-5">
            <div
              className={`${
                headings?.length ? "rounded-[4px] blog-tab-content" : "!hidden"
              }`}
            >
              <div className="flex justify-between !mb-5">
                <p className="text-lg font-bold m-0">Table of Contents</p>
              </div>
              <ul className="max-h-[calc(100vh_-_300px)] overflow-auto">
                {headings?.length ? (
                  headings.map((heading, index) => (
                    <li
                      key={index}
                      className="mb-2 hover:cursor-pointer hover:underline"
                    >
                      <Link
                        href={`#${textToId(heading?.text)}`}
                        onClick={(e) => handleTableOfContentLinkClick(e, index)}
                        className={`${
                          textToId(heading?.text) == activeLink
                            ? "text-colorDarkBlue font-semibold"
                            : ""
                        }`}
                      >
                        {heading?.text}
                      </Link>
                    </li>
                  ))
                ) : (
                  <div className="flex align-middle justify-center py-10">
                    <BeatLoader />
                  </div>
                )}
              </ul>
            </div>
            <div className="mt-6">
              <div className="flex items-start flex-wrap">
                <Link
                  target="_blank"
                  href={`http://www.facebook.com/sharer.php?u=https://www.swiftsupport.ai${pathname}`}
                  className="!mr-4"
                >
                  <Image
                    src="/images/fb-share.svg"
                    width="43"
                    height="43"
                    alt="Facebook blog share"
                  />
                </Link>
                <Link
                  target="_blank"
                  className="!mr-4"
                  href={`https://twitter.com/share?url=https://www.swiftsupport.ai${pathname}`}
                >
                  <Image
                    src="/images/twitter-share.svg"
                    width="43"
                    height="43"
                    alt="Twitter blog share"
                  />
                </Link>
                <Link
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.swiftsupport.ai${pathname}`}
                >
                  <Image
                    src="/images/linkedin-share.svg"
                    width="43"
                    height="43"
                    alt="LinkedIn blog share"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="slg:basis-4/5 slg:flex-shrink-0 slg:flex-grow-0 slg:max-w-[80%] !px-4 min-h-[1px] w-full">
          <div className="items-center">
            <div className="flex -mx-4 md:flex-row flex-col">
              <div className="w-full float-left">
                <div className="h-full w-full box-border px-4">
                  <div className="h-full flex flex-col">
                    <div className="blog-content">
                      {modifyImagesWithLazyLoading(content)}

                      {FAQData && FAQData?.length > 0 ? (
                        <BlogFAQ FAQData={FAQData} />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="container mx-auto md:!px-0 !px-4">
          <div className="flex flex-wrap flex-col xl:pb-20 md:pb-14 pb-8">
            <div className="service_sec3">
              <p className="home_sec2_txt3 !pb-0 md:!pt-10 !pt-0">
                <p className="!ml-0 extra_bold !w-full">You might also like</p>
              </p>
            </div> */}
        {/* <div
              className={`grid ${
                !blogResponse["/aws-consulting-services/"]?.length
                  ? ""
                  : "xl:grid-cols-3 md:grid-cols-2"
              } grid-cols-1 items-center gap-[2rem]`}
            >
              {blogResponse[
                pathname.includes("aws")
                  ? "/aws-consulting-services/"
                  : "/generative-ai-development-services/"
              ]?.length ? (
                blogResponse[
                  pathname.includes("aws")
                    ? "/aws-consulting-services/"
                    : "/generative-ai-development-services/"
                ]?.map(({ slug, name, content }, index) => (
                  <div
                    key={index}
                    className="border-[1px] border-[#80808038] rounded-[30px] blog_flex_30"
                  >
                    <Link
                      as={`/blog/${slug}`}
                      href={`/blog/[slug]`}
                      target="_blank"
                      rel="external"
                    >
                      <div className="sec9_img1">
                        <Image
                          className="rounded-[30px]"
                          src={content?.mobile_banner?.filename}
                          alt={content?.mobile_banner?.alt}
                          width={550}
                          height={283}
                        />
                      </div>
                      <div className="pt-[1rem] px-[1rem] pb-[1.5rem] blog-hover">
                        <div className="border-b-[1px] border-[#80808038] py-[1rem]">
                          <p className="entry-title default-max-width aspect-[518/116]">
                            {name}
                          </p>
                        </div>
                        <div className="sec9_txt2 mt-[1.5rem]">
                          <p className="publish_date">
                            {formattedDate(content?.Published)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center p-24">
                  <FetchDataSpinner />
                </div>
              )}
            </div> */}
        {/* {pathname.includes("product") ? (
              <ProductSuggestion />
            ) : (
              <UseCaseSuggestion blogResponse={blogResponse} />
            )} */}
        {/* </div>
        </div> */}
      </div>
    </div>
  );
};

export default GuideContentSection;
