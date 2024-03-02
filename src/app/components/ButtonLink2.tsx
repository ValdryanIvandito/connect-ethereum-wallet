import React, { FC } from "react";
import Link from "next/link";

interface LinkProps {
  link: string;
  label: string;
}

const ButtonLink2: FC<LinkProps> = ({ link, label }) => {
  return (
    <Link
      href={link}
      target="_blank"
      className="py-4 px-8 rounded-md text-white font-semibold border-2 border-green-500 hover:bg-green-500 hover:text-black"
    >
      {label}
    </Link>
  );
};

export default ButtonLink2;
