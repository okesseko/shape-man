import { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletBalance from "../components/WalletBalance";
import MintNFT from "../components/MintNFT";
import NFTImage from "../components/NFTImage";

function Home({ contract, provider, account }) {
  const [totalMinted, setTotalMined] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (contract) getCount();
  }, [contract, account]);

  async function getCount() {
    const count = await contract.count();
    setTotalMined(parseInt(count));
  }

  useEffect(() => {
    if (account) getBalance();
    else setBalance(0);
  }, [account]);

  const getBalance = async () => {
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div id="layout">
      {account ? (
        <WalletBalance balance={balance} getBalance={getBalance} />
      ) : (
        <p className="text-3xl">Please connect wallet</p>
      )}
      <h1 className="my-4 text-center text-2xl">
        Total minted <span className="text-[#BFF0D4]">{totalMinted} </span>/
        1000
      </h1>
      <div className="flex flex-wrap justify-evenly gap-8 px-8">
        <div>
          <MintNFT
            account={account}
            isMinted={false}
            contract={contract}
            successfulCallback={() => {
              getCount();
              getBalance();
            }}
          />
        </div>
        {Array(totalMinted)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <NFTImage tokenId={i} contract={contract} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
