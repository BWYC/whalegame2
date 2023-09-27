import "./Title.css";
import {
  ThirdwebNftMedia,
  useAddress,
  useContractRead,
  useMetadata,
  useTokenBalance,
  Web3Button,
} from "@thirdweb-dev/react";
import { MINING_CONTRACT_ADDRESS } from "../../../const/contractAddresses";

// assets
import Mario from "../../../assets/img/mario.png";

const Title = () => {
  return (
    <div className="title-container">
      <img src={Mario} alt="" className="mario-logo" />
      <h1 className="title">Whale arcade</h1>
      <Web3Button
        contractAddress={MINING_CONTRACT_ADDRESS}
        action={(contract) => contract.call("claim")}
      >
        Claim
      </Web3Button>
    </div>
  );
};
export default Title;
