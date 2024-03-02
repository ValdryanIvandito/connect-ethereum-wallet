import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/nusa-finance-logo.png"
      width={200}
      height={50}
      alt="Nusa Finance Logo"
    />
  );
};

export default Logo;
