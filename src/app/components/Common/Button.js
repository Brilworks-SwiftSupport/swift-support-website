import React from "react";
import Link from "next/link";
import { scrollToSection } from "../lib/Common";

const Button = ({
  type = "button",
  label,
  icon,
  redirect = "https://cal.com/hiteshr/15min",
  variant = "primary",
  className,
  scrollingButton,
  innerClassName,
  ...props
}) => {
  return (
    <button
      type={type}
      className={[
        `common-button gap-2 outline-none overflow-hidden whitespace-nowrap transition-all duration-300`,
        `button-${variant} !text-[#fff]`,
        className,
      ].join(" ")}
      {...props}
    >
      {type === "submit" ? (
        <div className="flex items-center justify-center">{label}</div>
      ) : (
        <Link
          className={innerClassName}
          href={redirect}
          onClick={
            scrollingButton
              ? (e) => scrollToSection(e, redirect.replace("#", ""))
              : ""
          }
          {...props}
        >
          {label}
        </Link>
      )}
    </button>
  );
};

export default Button;
