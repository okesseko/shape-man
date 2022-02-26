import React, { useState } from "react";
import { ethers } from "ethers";
import loadingImg from "../../img/loading.gif";
import questionImg from "../../img/question.svg";

const MintNFT = ({ account, contract, successfulCallback }) => {
  const [loading, setLoading] = useState(false);

  async function mintNFT() {
    try {
      const result = await contract.payToMint(1, {
        value: ethers.utils.parseEther("0.05"),
      });
      setLoading(true);
      await result.wait();
      successfulCallback();
    } catch (e) {
      window.alert(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <img
        className="rounded-lg bg-white"
        width={250}
        height={250}
        src={loading ? loadingImg : questionImg}
      />
      <button
        className="mt-11 w-full rounded-lg border border-solid border-[#F1F7ED] bg-[#222] p-4 text-base text-[#F1F7ED] disabled:bg-gray-500 disabled:text-black"
        onClick={mintNFT}
        disabled={loading || !account}
      >
        Mint
      </button>
    </div>
  );
};

export default MintNFT;
