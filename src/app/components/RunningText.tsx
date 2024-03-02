import React from "react";
import CryptoTicker from "./_childComponents/CryptoTicker";

interface RunningTextProps {
  cryptoTickers: Record<
    string,
    {
      usd: number;
      usd_24h_change: number;
    }
  >;
}

const RunningText: React.FC<RunningTextProps> = ({ cryptoTickers }) => {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <CryptoTicker cryptoTickers={cryptoTickers} />
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
        <CryptoTicker cryptoTickers={cryptoTickers} />
      </div>
    </div>
  );
};

export default RunningText;
