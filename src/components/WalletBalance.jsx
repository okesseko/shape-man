import { useEffect, useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
  const [balance, setBalance] = useState();

  useEffect(() => {
    getBalance();
  });

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);

    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div className="flex  flex-col items-center justify-center pt-16 ">
      <a
        target="_blank"
        className="text-2xl hover:text-red-400"
        href="https://chainlist.org/"
      >
        Click me to add chain (Mumbai)
      </a>
      <a
        target="_blank"
        className="text-2xl hover:text-red-400"
        href="https://faucet.polygon.technology/"
      >
        Get test metic
      </a>

      <h5 className="text-2xl">
        Your Balance:
        <br />
        <span className="text-3xl text-[#BFF0D4]">{balance}</span>
      </h5>
      <button
        className="my-4 rounded-lg border border-solid border-[#F1F7ED] bg-[#222] p-2 text-2xl text-[#F1F7ED]"
        onClick={getBalance}
      >
        Reload my Balance
      </button>
    </div>
  );
}

export default WalletBalance;
