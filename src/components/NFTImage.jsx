import React, { useState } from "react";
import { ethers } from "ethers";
import loadingImg from "../../img/loading.gif";
import questionImg from "../../img/question.svg";

const NFTImage = ({ isMinted, tokenId, contract, signer, setTotalMinted }) => {
  const imageIFPSId = import.meta.env.VITE_PINATA_ID;
  const metaDataURI = `${imageIFPSId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${imageIFPSId}/${tokenId}.png`;

  const [loading, setLoading] = useState(false);

  async function mintNFT() {
    try {
      const connection = contract.connect(signer);
      const address = connection.address;
      const result = await contract.payToMint(address, metaDataURI, {
        value: ethers.utils.parseEther("0.05"),
      });
      setLoading(true);
      await result.wait();
      setTotalMinted();
    } catch (e) {
      window.alert(e.message);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    window.alert(`uri is:\n ${uri}`);
  }

  return (
    <div>
      <img
        className="rounded-lg bg-white"
        width={250}
        height={250}
        src={isMinted ? imageURI : loading ? loadingImg : questionImg}
      />
      <div>
        <h5 className="mb-2 text-3xl">{isMinted ? `ID: ${tokenId}` : ""}</h5>
        {!isMinted ? (
          <button
            className="w-full rounded-lg border border-solid border-[#F1F7ED] bg-[#222] p-4 text-base text-[#F1F7ED]"
            onClick={mintNFT}
            disabled={loading}
          >
            Mint
          </button>
        ) : (
          <button
            className="w-full rounded-lg border border-solid border-[#F1F7ED] bg-[#222] p-4 text-base text-[#F1F7ED]"
            onClick={getURI}
          >
            Already minted! Show URI
          </button>
        )}
      </div>
    </div>
  );
};

export default NFTImage;
