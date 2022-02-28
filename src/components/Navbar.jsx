import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

const Navbar = ({ account, setAccount }) => {
  const [isConnectWalletDisabled, setIsConnectWalletDisabled] = useState(false);

  useEffect(() => {
    setIsConnectWalletDisabled(isEthereumNotExist());
  }, []);

  function isEthereumNotExist() {
    if (typeof window === "undefined") return true;
    return !window.ethereum;
  }

  async function changeNetwork() {
    let rejectSwitchNet = false;
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881", // 80001 (Mumbai)
                chainName: "Mumbai",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          rejectSwitchNet = true;
        }
      } else {
        rejectSwitchNet = true;
      }
    }
    if (!rejectSwitchNet) {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (account) {
        setAccount(account);
      }
    }
  }

  function ellipsisAccount(account) {
    return account.slice(0, 6) + "..." + account.slice(-4);
  }

  return (
    <nav className="sticky top-0 flex justify-between bg-white">
      <Link to="/">
        <img className="ml-2" src={logo} width={150} />
      </Link>
      <ul className="flex items-center text-black">
        <li className="my-3 mx-6 text-xl font-bold hover:underline">
          <Link to="/about">About</Link>
        </li>
        <li className="my-3 mx-6 text-xl font-bold hover:underline">
          <Link to="/install">Install</Link>
        </li>
        <li className="my-3 mx-6 text-xl">
          <button
            suppressHydrationWarning
            disabled={isConnectWalletDisabled}
            className="rounded-full bg-[#222] px-4 py-2 text-white"
            onClick={changeNetwork}
          >
            {isConnectWalletDisabled
              ? "Plz Install Wallet"
              : account
              ? ellipsisAccount(account)
              : "Connect Wallet"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
