import {
  Menu,
  MenuHandler,
  MenuItem as MaterialMenuItem,
  MenuList,
} from "@material-tailwind/react";
import React from "react";
import MenuItem from "./MenuItem";

const MegaMenu = ({ setOpenNav, name, menuItems }) => {
  return (
    <Menu
      placement="bottom"
      dismiss={{ itemPress: true, ancestorScroll: true }}
      allowHover
    >
      <MenuHandler>
        <MaterialMenuItem className="flex items-center outline-none pt-2 my-1 px-0">
          <div
            onClick={(e) => {
              e.preventDefault();
              setOpenNav(false);
            }}
            className="!flex items-center text-colorBlack font-Urbanist nav-underline"
          >
            <p className="!mb-0 font-medium">{name}</p>
            <svg
              className="w-4 h-[6px] ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </MaterialMenuItem>
      </MenuHandler>
      <MenuList
        dismissible
        className="flex items-start z-10 w-full rounded-[20px] menu-shadow overflow-y-auto max-w-4xl"
      >
        <div className="!w-full flex p-[18px] outline-none">
          <div className="w-full">
            {menuItems.map((mainSection, index) => (
              <div
                key={mainSection?.name}
                className="w-full flex flex-col gap-6"
              >
                <span className="font-semibold md:text-2xl text-xl break-words !text-colorBlack">
                  {mainSection?.name}
                </span>
                <div
                  className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 ${
                    index === 0 ? "border-b border-borderGray pb-6 mb-6" : ""
                  }`}
                >
                  {mainSection?.subSections.map((subSection) => (
                    <MaterialMenuItem
                      key={subSection?.name}
                      className="hover:bg-[#EAFAFF] py-1 px-2.5"
                    >
                      <MenuItem
                        name={subSection?.name}
                        path={subSection?.path}
                        icon={subSection?.icon}
                        onClick={() => setOpenNav(false)}
                      />
                    </MaterialMenuItem>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </MenuList>
    </Menu>
  );
};

export default MegaMenu;
