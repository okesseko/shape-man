import { useEffect, useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
  const [balance, setBalance] = useState();

  useEffect(() => {
    getBalance();
  });

  const getBalance = async () => {
    console.log("123");
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);

    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div
      style={{
        paddingTop: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <a
        target="_blank"
        style={{
          fontSize: "1.5rem",
        }}
        href="https://chainlist.org/"
      >
        Click me to add chain (Mumbai)
      </a>
      <a
        target="_blank"
        style={{
          fontSize: "1.5rem",
        }}
        href="https://faucet.polygon.technology/"
      >
        Get test metic
      </a>

      <h5 style={{ fontSize: "1.5rem" }}>
        Your Balance:
        <br />
        <span style={{ fontSize: "2rem", color: "#BFF0D4" }}>{balance}</span>
      </h5>
      <button
        style={{
          margin: "1rem 0",
          padding: "0.5rem",
          fontSize: "1.5rem",
          background: "#222",
          color: "#F1F7ED",
          borderRadius: "0.5rem",
          border: "#F1F7ED 1px solid",
        }}
        onClick={getBalance}
      >
        Reload my Balance
      </button>
    </div>
  );
}

export default WalletBalance;
