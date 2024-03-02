"use client";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Logo from "./components/Logo";
import Button from "./components/Button";
import Text from "./components/Text";
import RunningText from "./components/RunningText";
import HelloWeb3World from "./components/HelloWeb3World";
import Picture1 from "./components/Picture1";
import Picture2 from "./components/Picture2";
import ButtonLink1 from "./components/ButtonLink1";
import ButtonLink2 from "./components/ButtonLink2";

// Interface for the response data
interface CryptoData {
  usd: number;
  usd_24h_change: number;
}

// Interface for the crypto tickers state
interface CryptoTickers {
  [key: string]: CryptoData;
}

const Home: React.FC = () => {
  const [cryptoTickers, setCryptoTickers] = useState<CryptoTickers>({});
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        updateBalance(web3, accounts[0]);
        fetchCryptoTickers();
      } catch (error) {
        console.error(error);
      }
    } else {
      alert(
        "Metamask not detected. Please install Metamask to use this feature."
      );
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setBalance(0);
  };

  const updateBalance = async (web3: any, address: any) => {
    const weiBalance = await web3.eth.getBalance(address);
    const ethBalance = web3.utils.fromWei(weiBalance, "ether");
    setBalance(ethBalance);
  };

  const fetchCryptoTickers = async () => {
    const URL_API =
      "https://api.coingecko.com/api/v3/simple/price/?ids=bitcoin,ethereum,cardano,binancecoin,solana,ripple,polkadot,cosmos&vs_currencies=usd&include_24hr_change=true";

    const cryptoNameMapping: { [key: string]: string } = {
      bitcoin: "BTC",
      ethereum: "ETH",
      binancecoin: "BNB",
      cardano: "ADA",
      solana: "SOL",
      ripple: "XRP",
      polkadot: "DOT",
      cosmos: "ATOM",
    };

    try {
      const response = await fetch(URL_API);
      const data: { [key: string]: CryptoData } = await response.json();

      // Ubah nama kripto sesuai pemetaan
      const mappedData: CryptoTickers = {};
      Object.keys(data).forEach((cryptoName) => {
        const mappedCryptoName = cryptoNameMapping[cryptoName] || cryptoName;
        mappedData[mappedCryptoName] = data[cryptoName];
      });

      setCryptoTickers(mappedData);

      console.log(mappedData);
    } catch (error) {
      console.error("Error fetching crypto tickers:", error);
    }
  };

  useEffect(() => {
    fetchCryptoTickers();
    // Cek apakah sudah terkoneksi wallet saat memuat halaman
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          updateBalance(web3, accounts[0]);
        }
      });
    }
  }, []);

  return (
    <main>
      <div>
        <div className="flex justify-between items-center py-6 px-32">
          <Logo />
          {!walletAddress && (
            <Button getClick={connectWallet} label="CONNECT WALLET" />
          )}
          {walletAddress && (
            <Button getClick={disconnectWallet} label="DISCONNECT WALLET" />
          )}
        </div>
        <div className="pb-6">
          <RunningText cryptoTickers={cryptoTickers} />
        </div>
        {!walletAddress && (
          <div className="flex justify-between items-center gap-4 py-6 px-32">
            <div>
              <Text />
              <div className="flex justify-start items-center gap-8">
                <ButtonLink1
                  link="https://app.nusa.finance/"
                  label="LAUNCH APP"
                />
                <ButtonLink2
                  link="https://nft.nusa.finance/"
                  label="NFT MARKETPLACE"
                />
              </div>
            </div>
            <Picture1 />
          </div>
        )}
        {walletAddress && (
          <div className="flex justify-between items-center gap-8 py-6 px-32">
            <Picture2 />
            <HelloWeb3World walletAddress={walletAddress} balance={balance} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
