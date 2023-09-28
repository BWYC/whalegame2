import {
  ThirdwebNftMedia,
  useActiveClaimCondition,
  Web3Button,
} from "@thirdweb-dev/react";
import { EditionDrop, NFT } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import React from "react";
import { PICKAXE_EDITION_ADDRESS } from "../const/contractAddresses";


type Props = {
  pickaxeContract: EditionDrop;
  item: NFT;
};

export default function ShopItem({ item, pickaxeContract }: Props) {
  const { data: claimCondition } = useActiveClaimCondition(
    pickaxeContract,
    item.metadata.id
  );

  return (
    <div style={{display: "flex", flexDirection: "row"}} key={item.metadata.id.toString()}>


      <div>
        <Web3Button
         style={{ color: "orange", background: "black", border: "solid", fontSize: "10px" }}
          theme="dark"
          contractAddress={PICKAXE_EDITION_ADDRESS}
          action={(contract) => contract.erc1155.claim(item.metadata.id, 1)}
          onSuccess={() => alert("Purchased!")}
          onError={(error) => alert(error)}
        >
          BUY ASSISTANT
        </Web3Button>

      </div>
    </div>
  );
}
