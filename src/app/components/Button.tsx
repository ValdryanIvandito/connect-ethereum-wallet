import React, { FC, MouseEventHandler } from "react";

interface ButtonProps {
  getClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const Button: FC<ButtonProps> = ({ getClick, label }) => {
  return (
    <button
      className="py-4 px-8 bg-green-500 rounded-md text-black font-semibold hover:bg-white"
      onClick={getClick}
    >
      {label}
    </button>
  );
};

export default Button;
