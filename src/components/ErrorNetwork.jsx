import React from "react";

const ErrorNetwork = () => {
  async function changeNetwork() {
    console.log("click");
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
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center text-3xl">
      <p className="my-2">Oops, you are in the wrong net</p>
      <p className="my-2">Please click the button to add (switch to)</p>
      <b className="my-2 text-4xl text-green-300"> Mumbai test net</b>
      <button
        className="my-2 rounded-lg border py-2 px-4 hover:border-[red]"
        onClick={changeNetwork}
      >
        Click me 🖐
      </button>
    </div>
  );
};

export default ErrorNetwork;
