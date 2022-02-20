import React from "react";
import metamask from "../../img/metamask.png";

const Install = () => {
  return (
    <div className="flex h-screen flex-col items-center">
      <h3 className="mt-[10vh] text-[4rem]">You need to install the Wallet</h3>
      <a
        target="_blank"
        className="mt-10 text-3xl"
        href="https://metamask.io/download/"
      >
        Click me to install Meta Mask
      </a>
      <img className="my-8 h-[39.5vw] w-[70vw]" src={metamask} />
    </div>
  );
};

export default Install;
