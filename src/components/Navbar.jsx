import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";

const Navbar = ({ account, setAccount }) => {
  async function changeNetwork() {
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
          console.log(addError);
        }
      }
    }
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (account) {
      console.log("hichange");
      setAccount(account);
    }
  }

  function ellipsisAccount(account) {
    return account.slice(0, 6) + "..." + account.slice(-4);
  }

  return (
    <nav className="sticky top-0 flex justify-between bg-green-400">
      <Link to="/">
        <img className="ml-2" src={logo} width={150} />
      </Link>
      <ul className="flex items-center">
        <li className="my-3 mx-6 text-xl">
          <Link to="/about">About</Link>
        </li>
        <li className="my-3 mx-6 text-xl">
          <Link to="/install">Install</Link>
        </li>
        <li className="my-3 mx-6 text-xl">
          <button
            disabled={!window.ethereum}
            className="rounded-full bg-black px-4 py-2"
            onClick={changeNetwork}
          >
            {!window.ethereum
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
