"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItem = ({ path, onClick, name, icon, className }) => {
  const pathname = usePathname();

  return (
    <Link href={path} onClick={onClick} className={className}>
      <p
        className={`!mb-0 w-full  text-colorBlack whitespace-nowrap flex items-center justify-start gap-2 text-base font-medium ${
          pathname === path ? "font-semibold" : ""
        }`}
      >
        {icon && (
          <Image
            src={icon}
            alt={`${name.replace(" ", "-")}-icon`}
            width="24"
            height="24"
          />
        )}
        {name}
      </p>
    </Link>
  );
};

export default MenuItem;
