'use client'
import React, { useEffect } from "react";
import {
  Menu,
  MenuHandler,
  Button,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import MenuListDynamic from "./MenuList";
// import dynamic from "next/dynamic";

// const MenuListDynamic = dynamic(() => import( "./MenuList"));

const menuItems = [
  {
    title: "Virtual assistance for Customer support",
  },
  {
    title: "Virtual assistance Sales",
  },
];
 
export function MenuCustomList() {
  const [openMenu, setOpenMenu] = React.useState(false);

  useEffect(()=>{
    window.addEventListener("Onscroll",()=>{
      setOpenMenu(false)
    })
  },[])
 
  return (
    <Menu open={openMenu} handler={setOpenMenu} allowHover placement="bottom" offset={30}>
      <MenuHandler >
        <Button
          variant="text"
          className="!flex items-center !focus:outline-none gap-3 text-base !text-[#000]  capitalize tracking-normal nav-underline  md:justify-center justify-start font-medium"
        >
          Technology
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3.5 w-3.5 transition-transform ${
              openMenu ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuListDynamic menuItems={menuItems}/>
    </Menu>
  );
}



