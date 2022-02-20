import { useEffect, useState } from "react";
import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import NTFImage from "./NFTImage";
import ShapeMan from "../artifacts/contracts/ShapeMan.sol/ShapeMan.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

function Home() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ShapeMan.abi, signer);
  const [totalMinted, setTotalMined] = useState(0);
  const [networkId, setNetworkId] = useState(0);

  useEffect(() => {
    getCount();

    provider.on("network", (newNetwork) => {
      if (newNetwork.chainId !== 31337) {
        console.log("your network is error");
      }
      setNetworkId(newNetwork.chainId);
    });
    getNetwork();
  }, []);

  async function getCount() {
    const count = await contract.count();
    console.log(count, "qwe");
    setTotalMined(parseInt(count));
  }

  async function getNetwork() {
    const { chainId } = await provider.getNetwork();
    console.log(chainId); // 42
  }

  return (
    <div>
      <WalletBalance />
      <h1 style={{ textAlign: "center" }}>
        Total minted <span style={{ color: "#BFF0D4" }}>{totalMinted} </span>/
        1000
      </h1>
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: "2rem",
        }}
      >
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
