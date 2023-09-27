import "./Title.css";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
  Web3Button,
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
  return (
    <div className="title-container">
      <img src={Mario} alt="" className="mario-logo" />
      <h1 className="title">Whale arcade</h1>
      <Web3Button
        style={{ color: "orange", background: "black", border: "solid" }}
        contractAddress={MINING_CONTRACT_ADDRESS}
        action={(contract) => contract.call("claim")}
      >
        Claim rewards
      </Web3Button>
      {pickaxeContract && tokenContract ? (
        <>
          <Shop pickaxeContract={pickaxeContract} />
        </>
      ) : (
        <LoadingSection />
      )}
    </div>
  );
};
export default Title;
