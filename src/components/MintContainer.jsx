import { Web3Button } from "@thirdweb-dev/react";
import { CHARACTER_EDITION_ADDRESS } from "../const/contractAddresses";

export default function MintContainer() {
  return (
    <>
      <div style={{ color: "white" }}>
        <Web3Button
          theme="dark"
          contractAddress={CHARACTER_EDITION_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
        >
          Claim
        </Web3Button>
      </div>
    </>
  );
}
