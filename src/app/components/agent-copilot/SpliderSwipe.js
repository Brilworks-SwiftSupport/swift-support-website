"use client"
import React from 'react'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
// Default theme
import '@splidejs/react-splide/css';

// or other themes
import '@splidejs/react-splide/css/skyblue';
import '@splidejs/react-splide/css/sea-green';

// or only core styles
import '@splidejs/react-splide/css/core';

import "./splide.scss"
// import Image from "next/image";
import FoundationSwiperDataDiv from "./FoundationSwiperDataDiv";


const SpliderSwipe = () => {
  return (
    <div>
<Splide hasTrack={ true } aria-label=""  options={{
    
    padding:{left:280 , right:160},
    
    gap:0
   
}} className="splide-list">

 
  <SplideSlide >
   <FoundationSwiperDataDiv/>
  </SplideSlide>
  <SplideSlide>
  <FoundationSwiperDataDiv/>
  </SplideSlide>
  <SplideSlide>
   <FoundationSwiperDataDiv/>
  </SplideSlide>
  <SplideSlide>
  <FoundationSwiperDataDiv/>
  </SplideSlide>


    

</Splide>
  </div>
  )
}

export default SpliderSwipe
