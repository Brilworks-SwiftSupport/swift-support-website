"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../../styles/Blogstyle.scss";
import { useMediaQuery } from "react-responsive";
import { getblogData } from "@/app/lib/getblog";
import { formattedDate } from "../lib/Common";
import Svgs from "../lib/Svgs";
import BeatLoader from "../Loader";

const BlogList = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1080 });
  const ITEMS_PER_PAGE = isTablet ? 8 : 9;

  const [currentPage, setCurrentPage] = useState(1);

  const [blogDataPerPage, setBlogDataPerPage] = useState([]);
  const [totalBlog, setTotalBlog] = useState(0);

  const fetchData = async () => {
 
    try {
      const blogData = await getblogData(currentPage, ITEMS_PER_PAGE);
      setBlogDataPerPage(blogData?.storyData);
      setTotalBlog(blogData?.totalData);
        
    } catch (error) {
      console.error(error);
     
    }
;
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    for (let i = -2; i <= 2; i++) {
      const page = currentPage + i;
      if (page > 0 && page <= Math.ceil(totalBlog / ITEMS_PER_PAGE)) {
        pages.push(page);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  

  return (
    <div className="container max-w-[1280px] h-full mx-auto section-padding md:!pt-[120px] !pt-[80px] !pb-0">
      <div className="text-colorBlack font-light xl:text-[70px] md:text-[50px] text-[32px] flex text-center flex-col lg:mb-[60px] md:mb-8 mb-5">
        <h1 className="font-medium">Blog</h1>
        <p className="!text-xl font-normal">
          Discover Hidden Tech Trends with Swiftsupport Blog Insights
        </p>
      </div>
     { !blogDataPerPage?.length ?<BeatLoader/> :
     <> <div
        className={`grid ${
         !blogDataPerPage?.length
            ? "grid-cols-1"
            : "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
        } !gap-8`}
      >
        {blogDataPerPage?.length ? (
          blogDataPerPage.map(({ slug, name, content }, index) => (
            <div
              className="blog-card h-full border flex border-lightGray rounded-[10px]"
              key={index}
            >
              <Link className="flex flex-col h-full" as={`/blog/${slug}`} href={`/blog/[slug]`} prefetch={true}>
                <div className="flex-[0.5]">
                <Image
                  className="block md:hidden zoom-image"
                  src={content?.mobile_banner?.filename}
                  alt={
                    content?.mobile_banner?.alt ||
                    content?.Image?.alt ||
                    `Blog-List-banner-${index + 1}`
                  }
                  quality={40}
                  width="310"
                  height="150"
                  priority={index === 0}
                  sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                />
                <Image
                  className="hidden md:block zoom-image"
                  src={content?.mobile_banner?.filename}
                  alt={
                    content?.mobile_banner?.alt ||
                    content?.Image?.alt ||
                    `Blog-List-banner-${index + 1}`
                  }
                  width="450"
                  height="230"
                  priority={index === 0}
                  sizes="(min-width: 1040px) 42.35vw, (min-width: 640px) 60.84vw, calc(100vw - 30px)"
                />
</div>
                <div className="flex flex-[0.4] flex-col p-[5%] h-full items-start bg-colorWhite">
                  <div
                    className={`text-colorBlack font-medium px-1 py-1 rounded-lg mb-2 bg-themePink`}
                  >
                    {content?.Category === "Cloud DevOps and Data"
                      ? "Cloud, DevOps and Data"
                      : content?.Category}
                  </div>
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
        ) : (
          <div className="flex items-center justify-center text-xl pt-20 pb-36">
            No Data found.
          </div>
        )}
      </div>
      { blogDataPerPage?.length ? (
        <div className="flex justify-center my-16">
          <ul className="list-none flex flex-wrap">
            <li
              className={`h-10 w-fit font-bold mr-4 mb-2 flex items-center justify-center cursor-pointer ${
                currentPage === 1 ? "opacity-50 !cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              {"< PREV"}
            </li>
            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`h-10 w-10 rounded-[10px] font-bold mr-4 mb-2 flex items-center justify-center cursor-pointer ${
                  currentPage === page
                    ? "border-2 border-themeBlue text-colorBlack"
                    : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </li>
            ))}
            <li
              className={`h-10 w-fit font-bold mr-4 mb-2 flex items-center justify-center cursor-pointer ${
                currentPage === Math.ceil(totalBlog / ITEMS_PER_PAGE)
                  ? "!opacity-50 !cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                if (currentPage < Math.ceil(totalBlog / ITEMS_PER_PAGE)) {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              {"NEXT >"}
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}</>}
    </div>
  );
};

export default BlogList;
