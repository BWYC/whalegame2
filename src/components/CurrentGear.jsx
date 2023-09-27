import { ThirdwebNftMedia, useAddress, useNFT } from "@thirdweb-dev/react";
import { EditionDrop, NFT, SmartContract } from "@thirdweb-dev/sdk";
import React, { useEffect, useState } from "react";
import ContractMappingResponse from "./types/ContractMappingResponse.ts";


type Props = {
  miningContract: SmartContract<any>;
  characterContract: EditionDrop;
  pickaxeContract: EditionDrop;
};

/**
 * This component shows the:
 * - Currently equipped miner character (right now there is just one (token ID 0))
 * - Currently equipped character's pickaxe
 */
export default function CurrentGear({
  miningContract,
  characterContract,
  pickaxeContract,
}: Props) {
  const address = useAddress();

  const { data: playerNft } = useNFT(characterContract, 0);
  const [pickaxe, setPickaxe] = useState();

  useEffect(() => {
    (async () => {
      if (!address) return;

      const ContractMappingResponse = (await miningContract.call("playerPickaxe", [
        address,
      ])) 
      const p = ContractMappingResponse;
      // Now we have the tokenId of the equipped pickaxe, if there is one, fetch the metadata for it
      if (p.isData) {
        const pickaxeMetadata = await pickaxeContract.get(p.value);
        setPickaxe(pickaxeMetadata);
      }
    })();
  }, [address, miningContract, pickaxeContract]);

  return (
    <>
    <div style={{ display: "flex", flexDirection: "column" }}>
        
      <h6 style={{marginLeft: "1%", color: "white", fontWeight: "400" }}>Your Character</h6>
      <div
      >
        {/* Currently equipped player */}
        <div style={{margin: "1%" }}>
          {playerNft && (
            <ThirdwebNftMedia metadata={playerNft?.metadata} height={120} width={"auto"}  style={{borderRadius: 16, border: "solid", color: "white"}} />
          )}
        </div>
        
        {/* Currently equipped pickaxe */}
     
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 5,
        }}
      >

      </div>
    </div>
    </>
  );
}
