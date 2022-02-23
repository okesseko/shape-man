import { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletBalance from "../components/WalletBalance";
import NTFImage from "../components/NFTImage";

function Home({ contract, provider, signer, account }) {
  const [totalMinted, setTotalMined] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (contract) getCount();
  }, [contract]);

  async function getCount() {
    const count = await contract.count();
    setTotalMined(parseInt(count));
  }

  useEffect(() => {
    if (account) getBalance();
    else setBalance(0);
  }, [account]);

  const getBalance = async () => {
    console.log(account);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div id="layout">
      <WalletBalance balance={balance} getBalance={getBalance} />
      <h1 className="my-4 text-center text-2xl">
        Total minted <span className="text-[#BFF0D4]">{totalMinted} </span>/
        1000
      </h1>
      <div className="flex flex-wrap justify-evenly gap-8 px-8">
        <div>
          <NTFImage
            isMinted={false}
            tokenId={totalMinted + 1}
            contract={contract}
            signer={signer}
            setTotalMinted={getCount}
          />
        </div>
        {Array(totalMinted)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              {console.log(i)}
              <NTFImage
                isMinted={true}
                tokenId={i}
                contract={contract}
                signer={signer}
                setTotalMinted={getCount}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
