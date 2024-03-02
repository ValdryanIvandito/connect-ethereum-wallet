import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HelloWeb3WorldProps {
  walletAddress: string;
  balance: number;
}

const HelloWeb3World: React.FC<HelloWeb3WorldProps> = ({
  walletAddress,
  balance,
}) => {
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(walletAddress)
      .then(() => {
        setMessage("Text copied to clipboard");
        setMessageColor("text-green-500");
      })
      .catch((err) => {
        setMessage(`Failed to copy text to clipboard: ${err}`);
        setMessageColor("text-red-500");
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
      setMessageColor("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div>
      <h1 className="font-bold text-4xl text-center pb-6">Hello Web3 World!</h1>
      <div className="rounded-xl border-2 border-green-500 p-4">
        <h2 className="text-center text-xl text-green-400 font-semibold pb-3">
          Your wallet is connected
        </h2>
        <h3 className={`text-center text-sm ${messageColor} h-10 pb-4`}>{message}</h3>
        <div className="flex mb-3">
          <div className="w-28 font-bold py-1">Address</div>
          <div className="flex justify-between items-center bg-gray-600 rounded-lg w-full px-4 py-2">
            <div className="mr-2">{walletAddress}</div>
            <button
              onClick={handleCopyToClipboard}
              className="p-1 bg-white rounded-xl border-[1.5px] hover:border-black"
            >
              <Image src="/copy.png" alt="Icon" width={20} height={20} />
            </button>
          </div>
        </div>
        <div className="flex mb-3">
          <div className="w-28 font-bold py-1">Balance</div>
          <div className="bg-gray-600 rounded-lg w-full px-4 py-2">
            {Number(balance).toFixed(4)} ETH
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelloWeb3World;
