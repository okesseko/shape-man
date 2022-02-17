const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
  const recipient = "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"; // need to change for each npm run node

  it("Should mint fail", async function () {
    const ShapeMan = await ethers.getContractFactory("ShapeMan");
    const shapeMan = await ShapeMan.deploy();
    await shapeMan.deployed();

    const metaDataURI = "cid/test.png";

    let balance = await shapeMan.balanceOf(recipient);
    expect(balance).to.equal(0);

    try {
      await shapeMan.payToMint(recipient, metaDataURI, {
        value: ethers.utils.parseEther("0.05"),
      });
    } catch (e) {
      expect(e.value).equal("At least need 0.8 ether");
    }
  });

  it("Should mint success", async function () {
    const ShapeMan = await ethers.getContractFactory("ShapeMan");
    const shapeMan = await ShapeMan.deploy();
    await shapeMan.deployed();

    const metaDataURI = "cid/test.png";

    let balance = await shapeMan.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newMintedNFT = await shapeMan.payToMint(recipient, metaDataURI, {
      value: ethers.utils.parseEther("0.8"),
    });

    await newMintedNFT.wait();
    balance = await shapeMan.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await shapeMan.isNFTOwned(metaDataURI)).to.equal(true);
  });
});
