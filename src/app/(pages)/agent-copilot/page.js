import AboutAgent from "@/app/components/agent-copilot/AboutAgent"
import BlogSection from "@/app/components/agent-copilot/BlogSection"
import FoundationTech from "@/app/components/agent-copilot/FoundationTech"
import Main from "@/app/components/agent-copilot/Main"
import SectionOne from "@/app/components/agent-copilot/SectionOne"
import SectionThree from "@/app/components/agent-copilot/SectionThree"
import SectionTwo from "@/app/components/agent-copilot/SectionTwo"
import VideoSection from "@/app/components/agent-copilot/VideoSection"
import React from 'react'

const page = () => {
  return (
    <div className="">
        <Main/>
        <AboutAgent/>
        <SectionOne/>
        <SectionTwo/>
        <SectionThree/>
       <FoundationTech/>
       <VideoSection/>
       <BlogSection/>

    </div>
  )
}

export default page