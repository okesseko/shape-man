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
        Your Balance: <span className="text-green-400 font-bold">{balance}</span>
      </h5>
      <button
        className="my-4 rounded-lg border border-solid border-white bg-[#222] p-2 px-4 text-2xl text-white"
        onClick={getBalance}
      >
        Reload Balance
      </button>
    </div>
  );
}

export default WalletBalance;
