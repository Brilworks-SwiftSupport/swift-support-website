import { getblogData } from "@/app/lib/getblog";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Svgs from "../lib/Svgs";
import { formattedDate } from "../lib/Common";
import { IoArrowForwardOutline } from "react-icons/io5";

const BlogSection = async () => {
  const currentPage = 1;
  const currentSearchValue = "";

  const blogData = await getblogData(currentPage, 6, false, currentSearchValue);
  const blogDataPerPage = blogData?.storyData || [];

  if (blogDataPerPage.length === 0 && currentPage !== 1) {
    notFound();
  }

  return (
    <div className="container mx-auto py-[100px] px-[120px]">
      <div className="grid xl:grid-cols-3 min-h-[80vh] md:grid-cols-2 grid-cols-1 !gap-10">
        {blogDataPerPage.length ? (
          blogDataPerPage.map(({ slug, name, content }, index) => (
            <div className="h-full flex border-lightGray " key={index}>
              <Link
                className="flex flex-col h-full  justify-between items-stretch"
                as={`/blog/${slug}`}
                href={`/blog/[slug]`}
                prefetch={false}
              >
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
                <div className="flex flex-[0.4] flex-col pt-[5%] h-full items-start bg-colorWhite">
                 
                  <h2 className="mb-1 text-[1.6rem]">{name}</h2>
                </div>
                <div className="flex flex-[0.4] flex-col pt-[5%] h-full items-start bg-colorWhite ">
                  <h2 className="mb-1 text-[1.2rem] font-[200] ">
                    {[
                      ...(
                        content?.metatags?.description || content?.Quick_Summary
                      )
                        .split(" ")
                        .slice(0, 10),
                      (
                        content?.metatags?.description || content?.Quick_Summary
                      ).split(" ").length > 10
                        ? "..."
                        : "",
                    ].join(" ")}
                  </h2>
                </div>
                <div className="w-full flex  flex-[0.1] flex-row pt-[5%] items-start ">
                  <div className="w-full flex items-center justify-between gap-2 text-blue-500">
                    <div className="flex items-center gap-2 text-[1.2rem] font-thin">
                      Read More <IoArrowForwardOutline />
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
    </div>
  );
};

export default BlogSection;
