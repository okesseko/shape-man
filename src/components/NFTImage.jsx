import React from "react";

const NFTImage = ({ tokenId }) => {
  const imageIFPSId = import.meta.env.VITE_PINATA_ID;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${imageIFPSId}/${tokenId}.png`;

  async function downloadImage() {
    const image = await fetch(
      `https://gateway.pinata.cloud/ipfs/${imageIFPSId}/${tokenId}.png`
    );
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `shape man-${tokenId}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <img
        className="rounded-lg bg-white"
        width={250}
        height={250}
        alt={`ID: ${tokenId}`}
        src={imageURI}
      />
      <div>
        <h5 className="mb-2 text-3xl">ID: {tokenId}</h5>
        <button
          className="w-full rounded-lg bg-sky-200 p-4 text-base font-bold text-black"
          onClick={downloadImage}
        >
          Download image 😍
        </button>
      </div>
    </div>
  );
};

export default NFTImage;
