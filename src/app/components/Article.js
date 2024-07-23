/* eslint-disable @next/next/no-img-element */
"use client";
import parse from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import "../styles/Blogstyle.scss";
import { memo, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getblogData } from "../lib/getblog";
import { usePathname } from "next/navigation";
import { blogAuthor, calculateReadingTime, formattedDate } from "./lib/Common";
import BlogFAQ from "./Blog/BlogFAQ";
import Svgs from "./lib/Svgs";

const BlogContactForm = dynamic(() => import("./Blog/BlogContactForm"));

const Article = ({ blok }) => {
  const pathname = usePathname();
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1080 });
  const [blogData, setBlogData] = useState(null);
  const [headings, setHeadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeLink, setActiveLink] = useState(null);

  const blogTableOfContent =
    blok.Content_1 +
      blok.Content_2 +
      blok.Content_3 +
      `${blok?.FAQ?.length && "<h2>FAQ</h2>"}` || "";

  const readingTime = calculateReadingTime(blogTableOfContent);

  async function fetchData() {
    try {
      const blogData = await getblogData(1, isTablet ? 3 : 4);
      setBlogData(blogData.storyData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
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
  }, [blogTableOfContent, !isLoading]);

  useEffect(() => {
    // Add temporary IDs to the headings for smooth scrolling
    const headings = document.querySelectorAll("h2");
    headings.forEach((heading, index) => {
      heading.id = `temp-section-${index}`;
    });
  }, [!isLoading]);

  const handleTableOfContentLinkClick = (e, index) => {
    setActiveLink(index);
    e.preventDefault();

    const targetId = e.target.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const headingPositions = headings.map((heading, index) => {
        const targetElement = document.getElementById(`temp-section-${index}`);

        if (targetElement) {
          return {
            id: `${index}`,
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

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const author = blogAuthor(blok?.BlogAuthor);

  return (
    <div className="md:mt-[8rem] mt-[6rem]">
      {!blok ? (
        <div className="flex items-center justify-center !py-60">
          Loading...
        </div>
      ) : (
        <>
          <div className="container max-w-[1280px] mx-auto my-0 !px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="sxl:basis-3/4 sxl:flex-shrink-0 sxl:flex-grow-0 sxl:max-w-[75%] sxl:ml-[20%] sxl:mb-6 mb-4 !px-4 min-h-[1px] w-full">
                <div className="slg:w-[calc(100%_-_170px)]">
                  <h1 className="md:!text-[3rem] !text-[2rem] !font-bold !mb-5 md:leading-[57px] leading-[44px] -tracking-[.52px]">
                    {blok?.title}
                  </h1>
                </div>
                <div className="slg:w-[calc(100%_-_170px)] flex xl:items-end items-start xl:flex-row flex-col justify-between md:gap-1 gap-2">
                  {author && (
                    <div className="flex items-center justify-between">
                      <Image
                        src={author?.authorImage}
                        width="54"
                        height="56"
                        alt={author?.name}
                        className="!rounded-full md:!w-14 md:!h-14 !w-10 !h-10"
                      />
                      <div className="pl-[10px]">
                        <Link
                          className="md:text-[20px] text-base font-bold text-colorDarkBlue"
                          href={author?.authorLinkedIn}
                          title={`Posts by ${author?.name}`}
                          rel="author external"
                        >
                          {author?.name}
                        </Link>
                        <br />
                        <span className=" text-colorGray">
                          {formattedDate(blok?.Published)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex sxl:items-center items-start sxl:flex-row flex-col !text-[16px] pb-1 md:mt-4 md:gap-0 gap-2">
                    <div className="flex items-center md:mr-5 text-colorGray">
                      <Svgs name="clock-icon" />
                      &nbsp;
                      {readingTime} mins read
                    </div>
                    <div className="flex items-center text-colorGray">
                      <Svgs name="calendar-icon" />
                      &nbsp; Last updated {formattedDate(blok?.Published)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap -mx-4">
              <div className="sxl:basis-3/4 sxl:flex-shrink-0 sxl:flex-grow-0 sxl:max-w-[75%] sxl:ml-[20%] !px-4 min-h-[1px] w-full">
                <div className="h-auto relative md:mb-6 mb-4 slg:!w-[calc(100%_-_170px)] overflow-hidden bg-cover bg-center">
                  <Image
                    className="rounded-lg block md:hidden max-h-[288px] h-auto object-cover"
                    src={blok?.mobile_banner?.filename || blok?.image?.filename}
                    alt={blok?.image?.alt}
                    width="343"
                    height="177"
                    priority={true}
                    sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                  />
                  <Image
                    className="rounded-lg hidden md:block max-h-[288px] h-auto object-cover"
                    src={blok?.image?.filename || blok?.mobile_banner?.filename}
                    alt={blok?.image?.alt}
                    width="758"
                    height="169"
                    priority={true}
                    sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                  />
                </div>
                {blok?.Quick_Summary && (
                  <div>
                    <div className="slg:w-[calc(100%_-_170px)] w-full text-left text-xl md:mb-6 mb-4 text-colorBlack">
                      <span className="font-bold text-colorDarkBlue">
                        Quick Summary:-{" "}
                      </span>
                      {blok?.Quick_Summary}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container max-w-[1280px] mx-auto my-0 px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="slg:basis-1/5 slg:flex-shrink-0 slg:flex-grow-0 slg:max-w-[20%] !px-4 min-h-[1px] w-full slg:block hidden">
                <div className="sticky top-[110px] !pb-5">
                  <div
                    className={`${
                      headings?.length
                        ? "rounded-[4px] blog-tab-content"
                        : "!hidden"
                    }`}
                  >
                    <div className="flex justify-between !mb-5">
                      <p className="text-lg font-bold m-0">Table of Contents</p>
                    </div>
                    <ul className="max-h-[calc(100vh_-_300px)] overflow-auto pr-3">
                      {headings?.length ? (
                        headings.map((heading, index) => (
                          <li
                            key={index}
                            className="mb-2 hover:cursor-pointer hover:underline"
                          >
                            <Link
                              href={`#temp-section-${index}`}
                              onClick={(e) =>
                                handleTableOfContentLinkClick(e, index)
                              }
                              className={`${
                                index == activeLink ? "text-colorDarkBlue" : ""
                              }`}
                            >
                              {heading?.text}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <div className="flex align-middle justify-center">
                          Loading...
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
                    <div className="md:w-3/4 w-full float-left">
                      <div className="h-full w-full box-border px-4">
                        <div className="h-full flex flex-col">
                          <div className="blog-content">
                            {blok?.CTA_1 && (
                              <div
                                className={`${
                                  blok?.CTA_1 ? "blog_content_CTA_1" : ""
                                }`}
                              >
                                {modifyImagesWithLazyLoading(blok?.CTA_1 || "")}
                              </div>
                            )}

                            {blok?.Content_1 && (
                              <div className="blog_content_new">
                                {modifyImagesWithLazyLoading(
                                  blok?.Content_1 || ""
                                )}
                              </div>
                            )}
                            {blok?.CTA_2 && (
                              <div
                                className={`${
                                  blok?.CTA_2 ? "blog_content_CTA_2" : ""
                                }`}
                              >
                                {modifyImagesWithLazyLoading(blok?.CTA_2 || "")}
                              </div>
                            )}
                            {blok?.Content_2 && (
                              <div className="blog_content_new">
                                {modifyImagesWithLazyLoading(
                                  blok?.Content_2 || ""
                                )}
                              </div>
                            )}
                            {blok?.CTA_3 && (
                              <div
                                className={`${
                                  blok?.CTA_3?.includes("<img")
                                    ? ""
                                    : "blog_content_CTA_3"
                                }`}
                              >
                                {modifyImagesWithLazyLoading(blok?.CTA_3 || "")}
                              </div>
                            )}
                            {blok?.Content_3 && (
                              <div className="blog_content_new">
                                {modifyImagesWithLazyLoading(
                                  blok?.Content_3 || ""
                                )}
                              </div>
                            )}
                            {blok?.FAQ && blok?.FAQ?.length > 0 ? (
                              <BlogFAQ FAQData={blok?.FAQ} />
                            ) : (
                              ""
                            )}
                          </div>

                          {/* ********************Author Detail******************************/}
                          {author && (
                            <div className="single-author-bio">
                              <div className="img-blk-wrapper lg:pb-[0rem] !pb-[3rem]">
                                <div className="img-blk">
                                  <img
                                    decoding="async"
                                    loading="lazy"
                                    src={author?.authorImage}
                                    width="96"
                                    height="96"
                                    alt={author?.name}
                                  />
                                </div>
                              </div>
                              <div className="single-author-bio-text">
                                <h3 className="text-2xl mb-2 font-bold">
                                  <Link
                                    href={author?.authorLinkedIn}
                                    title={`View ${author?.name} website`}
                                    rel="author external"
                                  >
                                    {author?.name}
                                  </Link>
                                </h3>
                                <p className="text-lg">{author?.authorDesc}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/4 w-full float-left">
                      <div className="h-full w-full box-border px-4">
                        <div className="h-full flex flex-col">
                          <BlogContactForm />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto md:!px-3 !px-4">
            <div className="flex flex-wrap flex-col xl:pb-20 md:pb-14 pb-8">
            <div className="service_sec3 mb-2">
                <p className="home_sec2_txt3 !pb-0 md:!pt-8 !pt-0">
                  <p className="!ml-0 text-[2rem] font-bold !w-full">
                    You might also like
                  </p>
                </p>
              </div>
              <div
                className={`grid 
                   xl:grid-cols-3 md:grid-cols-2
                 grid-cols-1 items-center gap-[2rem]`}
              >
          
                {  blogData
                    ?.filter(({ slug }) => !pathname?.includes(slug))
                    ?.slice(0, `${isTablet ? 2 : 3}`)
                    ?.map(({ slug, name, content }, index) => (
                      <div
              className="blog-card h-fit border flex border-lightGray rounded-[10px]"
              key={index}
            >
              <Link className="flex flex-col h-full" as={`/blog/${slug}`} href={`/blog/[slug]`} prefetch={false}>
                <div className="flex-[0.5]">
                  <Image
                    className="block md:hidden w-full zoom-image"
                    src={content?.mobile_banner?.filename}
                    alt={
                      content?.mobile_banner?.alt ||
                      content?.Image?.alt ||
                      `Blog-List-banner-${index + 1}`
                    }
                    quality={40}
                    width={310}
                    height={150}
                    priority={index === 0}
                    sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                  />
                  <Image
                    className="hidden md:block w-full zoom-image"
                    src={content?.mobile_banner?.filename}
                    alt={
                      content?.mobile_banner?.alt ||
                      content?.Image?.alt ||
                      `Blog-List-banner-${index + 1}`
                    }
                    
                    width={450}
                    height={230}
                    priority={index === 0}
                    sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                  />
                </div>
                <div className="flex flex-[0.4] flex-col p-[5%] h-full items-start bg-colorWhite">
                  {/* <div
                    className={`text-colorBlack font-medium px-1 py-1 rounded-lg mb-2 bg-themePink`}
                  >
                    {content?.Category === "Cloud DevOps and Data"
                      ? "Cloud, DevOps and Data"
                      : content?.Category}
                  </div> */}
                  <h2 className="mb-1">{name}</h2>
                </div>
                <div className="w-full flex  flex-[0.1] flex-row p-[5%] items-start border-t border-lightGray bg-lightGray bg-opacity-10">
                  <div className="w-full flex items-center justify-between gap-2 text-colorGray">
                    <div className="text-colorDarkBlue">
                      By {content?.BlogAuthor}
                    </div>
                    <div className="flex items-center gap-2">
                      <Svgs name="calendar-icon" />
                      <span>{formattedDate(content?.Published)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
                    ))
              }
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Article);