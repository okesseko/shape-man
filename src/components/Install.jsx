import React from "react";
import metamask from "../../img/metamask.png";

const Install = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3
        style={{
          fontSize: "4rem",
          marginTop: "10vh",
        }}
      >
        You need to install the Wallet
      </h3>
      <a
        target="_blank"
        style={{
          marginTop: "2.5rem",
          fontSize: "2rem",
        }}
        href="https://metamask.io/download/"
      >
        Click me to install Meta Mask{" "}
      </a>
      <img
        style={{
          width: "70vw",
          height: "39.5vw",
          margin: "2rem 0",
        }}
        src={metamask}
      />
    </div>
  );
};

export default Install;
