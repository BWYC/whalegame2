import { Web3Button } from "@thirdweb-dev/react";
import { CHARACTER_EDITION_ADDRESS } from "../const/contractAddresses";

export default function MintContainer() {
  return (
    <>
      <div
        style={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/whale.png"
          alt="nft"
          height={250}
          style={{
            margin: "10%",
            borderRadius: "16px",
            color: "orange",
            border: "solid",
          }}
        />
        <Web3Button
          style={{ color: "orange", background: "black", border: "solid" }}
          theme="dark"
          contractAddress={CHARACTER_EDITION_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
        >
          Claim a character
        </Web3Button>
      </div>
    </>
  );
}
