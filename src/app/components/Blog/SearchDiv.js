'use client'

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from 'react'

const SearchDiv = () => {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState();
    
    const searchQueryUpdated = useCallback(()=>{
        searchQuery?.trim() ? router.push(`/blog?search=${searchQuery || ""}`) :router.push(`/blog`);
    },[searchQuery])

    useEffect(()=>{
     setTimeout(()=>{
        searchQueryUpdated()
     },900)
    },[searchQuery])
    
  return (

    <div className="flex sxl:flex-row flex-col-reverse !mt-4 ">
          <div className="blog_category w-full flex flex-nowrap  justify-start items-center !overflow-auto whitespace-nowrap !mb-4">
            <div>
   

            </div>
          </div>
          <div className="w-full sxl:w-3/6 ">
            <form
              className="md:pb-0 !pb-4 "
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="find-blog-search-box border-[#a6a8a8] !rounded-lg border-[1px] ">
                <div className="w-full inline-flex relative flex-wrap items-center justify-end !rounded-lg ">
                  <input
                    type="submit"
                    className="w-auto !mr-1  !bg-black px-2 py-1  rounded-lg font-semibold text-base !text-white border !cursor-pointer
                     hover:border-themeColor focus:ring focus:outline-none focus:border-themeColor focus:!ring-[#00C4C8] active:border-themeColor absolute bg-themeColor"
                    value="Search"
                  />
                  <div className="w-full  ">
                    <input
                      type="text"
                      id="serachValue"
                      value={searchQuery}
                      className="text-[1rem] p-3 !pr-[110px] rounded-lg leading-4 focus:outline-none w-full"
                      placeholder="What are you looking for?"
                      autoComplete="off"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
  )
}

export default SearchDiv