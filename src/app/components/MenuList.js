'use client'
import { Button, MenuItem, MenuList } from "@material-tailwind/react"
import Link from "next/link"
import React from 'react'

const MenuListDynamic = ({menuItems}) => {
  return (
    <MenuList className=" rounded-[8px]  md:!z-[1] !z-[999] ">
       
        
    {menuItems.map(({ title}) => (
      <Link href="#" key={title}>
        <MenuItem className="!flex !items-start py-2 ">
         
            <span className=" font-semibold !text-colorGray  hover:underline   nav-underline capitalize  py-0  ">{title}
        </span>
        
        </MenuItem>
      </Link>
    ))}
 
</MenuList>
  )
}

export default MenuListDynamic