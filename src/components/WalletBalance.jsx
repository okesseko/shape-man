function WalletBalance({ balance, getBalance }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <a
        target="_blank"
        className="text-2xl"
        href="https://faucet.polygon.technology/"
      >
        Get test metic
      </a>
      <h5 className="my-2 text-2xl">
        Your Balance: <span className="text-[#BFF0D4]">{balance}</span>
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
