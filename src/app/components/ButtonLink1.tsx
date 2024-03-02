import React, { FC } from "react";
import Link from "next/link";

interface LinkProps {
  link: string;
  label: string;
}

const ButtonLink1: FC<LinkProps> = ({ link, label }) => {
  return (
    <Link
      href={link}
      target="_blank"
      className="py-4 px-8 bg-green-500 rounded-md text-black font-semibold hover:bg-white"
    >
      {label}
    </Link>
  );
};

export default ButtonLink1;
