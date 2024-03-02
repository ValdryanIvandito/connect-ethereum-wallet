import React from "react";

interface CryptoTickerProps {
  cryptoTickers: Record<
    string,
    {
      usd: number;
      usd_24h_change: number;
    }
  >;
}

const CryptoTicker: React.FC<CryptoTickerProps> = ({ cryptoTickers }) => {
  return (
    <div className="flex">
      {Object.entries(cryptoTickers).map(
        ([crypto, { usd, usd_24h_change }]) => (
          <div className="text-sm mx-4" key={crypto}>
            <div>{`${crypto.toUpperCase()}/USD $${usd.toFixed(2)}`}</div>
            {Number(usd_24h_change) < 0 ? (
              <div className="text-red-500">{` ${usd_24h_change.toFixed(
                2
              )}%`}</div>
            ) : (
              <div className="text-green-500">{` ${usd_24h_change.toFixed(
                1
              )}%`}</div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default CryptoTicker;
