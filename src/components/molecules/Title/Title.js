import "./Title.css";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
  Web3Button,
  useOwnedNFTs
} from "@thirdweb-dev/react";
import React from "react";
import CurrentGear from "../../../components/Shop";
import LoadingSection from "../../../components/Shop";
import OwnedGear from "../../../components/Shop";
import Rewards from "../../../components/Shop";

import {
  CHARACTER_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
} from "../../../const/contractAddresses";

import Shop from "../../../components/Shop";

// assets
import Mario from "../../../assets/img/mario.png";

const Title = () => {
  const address = useAddress();

  const { contract: miningContract } = useContract(MINING_CONTRACT_ADDRESS);
  const { contract: characterContract } = useContract(
    CHARACTER_EDITION_ADDRESS,
    "edition-drop",
  );
  const { contract: pickaxeContract } = useContract(
    PICKAXE_EDITION_ADDRESS,
    "edition-drop",
  );
  const { contract: tokenContract } = useContract(GOLD_GEMS_ADDRESS, "token");
  const { data: ownedPickaxes, isLoading } = useOwnedNFTs(
    pickaxeContract,
    address
  );

  async function equip(id: string) {
    if (!address) return;

    // The contract requires approval to be able to transfer the pickaxe
    const hasApproval = await pickaxeContract.isApproved(
      address,
      MINING_CONTRACT_ADDRESS
    );

    if (!hasApproval) {
      await pickaxeContract.setApprovalForAll(MINING_CONTRACT_ADDRESS, true);
    }

    await miningContract.call("stake", [id]);

    // Refresh the page
    window.location.reload();
  }
  return (
    <div className="title-container">
      <img 
       style={{
        margin: "1%",
        borderRadius: "200px",
        color: "orange",
        border: "solid",
        boxShadow: "rgba(108, 240, 242, 0.451) 0px 8px 24px",
      }}
      src={"/0.gif"} alt="" className="mario-logo" />
      <h4 className="title">Whale arcade</h4>
      {pickaxeContract && tokenContract ? (
        <>
          <Shop pickaxeContract={pickaxeContract} />
        </>
      ) : (
        <LoadingSection />
      )}
      {ownedPickaxes?.map((p) => (
        <div key={p.metadata.id.toString()}>
            <Web3Button
              theme="dark"
              contractAddress={MINING_CONTRACT_ADDRESS}
              action={() => equip(p.metadata.id)}
              style={{ color: "orange", background: "black", border: "solid",  fontSize: "10px" }}
            >
              Equip assistant
            </Web3Button>
         </div>
      ))}
    </div>
  );
};
export default Title;
