// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ShapeMan is ERC721, ERC721Enumerable, Ownable {

    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public mintPrice = 0.05 ether;
    uint256 public maxMint = 1;

    string public baseURI;

    bool public saleIsActive = false;

    constructor() ERC721("ShapeMan", "SM") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function payToMint(uint256 tokenQuantity) public payable {
        require(
            totalSupply() + 1 <= MAX_SUPPLY,
            "All NTF are minted"
        );
        require(msg.value >= mintPrice, "At least need 0.05 ether");
        require(tokenQuantity <= maxMint, "Can only mint 1 tokens at a time");

        for (uint256 i = 0; i < tokenQuantity; i++) {
            uint256 mintIndex = totalSupply();
            if (totalSupply() < MAX_SUPPLY) {
                _safeMint(msg.sender, mintIndex);
            }
        }
    }

    function count() public view returns (uint256){
        return totalSupply();
    }


    //for owner 
    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }
    function setMaxMint(uint256 _maxMint) public onlyOwner {
        maxMint = _maxMint;
    }
    function setSaleActive() public onlyOwner {
        saleIsActive = !saleIsActive;
    }
    function withdraw(address to) public onlyOwner {
        uint256 balance = address(this).balance;
        payable(to).transfer(balance);
    }

    // override 
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}