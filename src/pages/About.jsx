import React from "react";

const About = () => {
  return (
    <div id="layout">
      <p className="text-center text-3xl leading-[4rem]">
        This project is build by hardhat & vite react.
        <br />
        Images are deployed on the{" "}
        <a
          className="underline transition-colors hover:text-green-400"
          target="_blank"
          href="https://www.pinata.cloud/"
        >
          Pinata
        </a>{" "}
        a IFPS file system.
        <br />
        Smart contract is deployed on the Polygon test net{" "}
        <b className="text-green-400">Mumbai</b> by{" "}
        <a
          className="underline transition-colors hover:text-green-400"
          target="_blank"
          href="https://www.alchemy.com/"
        >
          Alchemy
        </a>{" "}
        .
        <br />
        And final, website is deployed on the firebase. <br />
      </p>
      <p className="mt-14 text-xl">
        If you like this project please give me a star on{" "}
        <a
          className="underline transition-colors hover:text-green-400"
          target="_blank"
          href="https://github.com/okesseko/shape-man"
        >
          Github
        </a>
      </p>
    </div>
  );
};

export default About;
