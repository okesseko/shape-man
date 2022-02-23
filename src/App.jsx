import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ethers } from "ethers";
import Install from "./pages/Install";
import About from "./pages/About";
import Home from "./pages/Main";
import Notfound from "./pages/404";
import Navbar from "./components/Navbar";
import ShapeMan from "./artifacts/contracts/ShapeMan.sol/ShapeMan.json";
import "./App.css";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

function App() {
  const [provider, setProvider] = useState();
  const [contract, setContract] = useState();
  const [signer, setSigner] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      setProvider(provider);

      provider.on("network", (newNetwork) => {
        console.log(newNetwork.chainId);
        if (newNetwork.chainId !== 31337) setAccount(null);
      });
      connectWalletInRightNetwork(provider);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ShapeMan.abi,
        signer
      );
      setSigner(signer);
      setContract(contract);
    }
  }, []);

  async function connectWalletInRightNetwork(provider) {
    const { chainId } = await provider.getNetwork();
    if (chainId === 31337) {
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (account) setAccount(account);
    }
  }

  return (
    <div id="app">
      <BrowserRouter>
        <Navbar account={account} setAccount={setAccount} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                account={account}
                provider={provider}
                contract={contract}
                signer={signer}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/install" element={<Install />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );

  // <div id="app">{window.ethereum ? <Home /> : <Install />}</div>;
}

export default App;
