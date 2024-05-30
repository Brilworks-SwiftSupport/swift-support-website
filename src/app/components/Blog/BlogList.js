"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../styles/Blogstyle.scss";
import { useMediaQuery } from "react-responsive";
import { getblogData } from "@/app/lib/getblog";
import Link from "next/link";
import { formattedDate } from "../lib/Common";

const BlogList = () => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1080 });
  const ITEMS_PER_PAGE = isTablet ? 8 : 9;
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [blogDataPerPage, setBlogDataPerPage] = useState([]);
  const [totalBlog, setTotalBlog] = useState(0);

  const blogData = [
    {
      category: "Business",
      tagColor: "bg-themePink",
      title: "Blog writing competition",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!",
      imageSrc: "/images/blog-1.webp",
      publishDate: "24 May 2024",
    },
    {
      category: "Travel",
      tagColor: "bg-themeBlue",
      title: "Trip to Swizerland",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!",
      imageSrc: "/images/blog-2.webp",
      publishDate: "18 May 2024",
    },
    {
      category: "Article",
      tagColor: "bg-themeYellow",
      title: "Blog competition",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!",
      imageSrc: "/images/blog-3.webp",
      publishDate: "12 May 2024",
    },
    {
      category: "Living",
      tagColor: "bg-themeBlue",
      title: "Hello World",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!",
      imageSrc: "/images/blog-2.webp",
      publishDate: "7 May 2024",
    },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const blogData = await getblogData(currentPage, ITEMS_PER_PAGE);
      setBlogDataPerPage(blogData?.storyData);
      setTotalBlog(blogData?.totalData);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
      <div className="text-colorBlack font-light xl:text-[70px] md:text-[50px] text-[32px] flex text-center flex-col lg:mb-[60px] md:mb-10 mb-5">
        <h1 className="font-medium">Blog</h1>
      </div>
      <div
        className={`grid ${
          totalBlog > 0 ? "lg:grid-cols-3 md:grid-cols-2" : ""
        } grid-cols-1 !gap-8 items-center`}
      >
        {blogDataPerPage && blogDataPerPage?.length ? (
          blogDataPerPage.map(({ slug, name, content }, index) => (
            <div
              className="blog-card min-w-[300px] h-full w-fit border border-lightGray rounded-[10px]"
              key={index}
            >
              <Link as={`/blog/${slug}`} href={`/blog/[slug]`} prefetch={true}>
                <Image
                  className="block md:hidden zoom-image"
                  src={content?.mobile_banner?.filename}
                  alt={
                    content?.mobile_banner?.alt ||
                    content?.Image?.alt ||
                    `Blog-List-banner-${index + 1}`
                  }
                  quality={40}
                  width="300"
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

                <div className="flex flex-col p-[5%] items-start">
                  <div
                    className={`text-colorBlack font-medium px-2 py-1 rounded-lg mb-2`}
                  >
                    {content?.category}
                  </div>
                  <p className="mb-1">{name}</p>
                  <h3 className="text-colorGray">{name}</h3>
                </div>
                <div className="flex flex-col p-[5%] items-start border-t border-lightGray bg-lightGray bg-opacity-20">
                  <div className="flex items-center gap-2 justify-start text-colorGray">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"></path>
                      <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                    </svg>
                    <span>{formattedDate(content?.Published)}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-24">
            Loading...
          </div>
        )}
      </div>
      {isLoading ? (
        ""
      ) : blogDataPerPage?.length ? (
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
      )}
    </div>
  );
};

export default BlogList;
