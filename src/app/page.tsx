"use client";
import { useState, useEffect } from "react";
import Web3 from "web3";

const Home = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [cryptoTickers, setCryptoTickers] = useState([]);

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
    setBalance("");
    setCryptoTickers([]);
  };

  const updateBalance = async (web3: any, address: any) => {
    const weiBalance = await web3.eth.getBalance(address);
    const ethBalance = web3.utils.fromWei(weiBalance, "ether");
    setBalance(ethBalance);
  };

  const fetchCryptoTickers = async () => {
    // Gunakan API Coinmarketcap atau Coingecko untuk mendapatkan data ticker harga crypto
    // Ganti URL_API dengan URL yang sesuai dengan API yang Anda pilih.
    const URL_API =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano&vs_currencies=usd";

    try {
      const response = await fetch(URL_API);
      const data = await response.json();
      setCryptoTickers(data);
    } catch (error) {
      console.error("Error fetching crypto tickers:", error);
    }
  };

  useEffect(() => {
    // Cek apakah sudah terkoneksi wallet saat memuat halaman
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          updateBalance(web3, accounts[0]);
          fetchCryptoTickers();
        }
      });
    }
  }, []);

  return (
    <main>
      <h1>Wallet App</h1>
      {walletAddress ? (
        <div>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Wallet Address: {walletAddress}</p>
          {balance && <p>Balance: {balance} ETH</p>}
          {cryptoTickers && (
            <div>
              <h2>Crypto Tickers</h2>
              <ul>
                {Object.entries(cryptoTickers).map(([crypto, { usd }]) => (
                  <li key={crypto}>{`${crypto.toUpperCase()}/USD: $${usd}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </main>
  );
};

export default Home;
