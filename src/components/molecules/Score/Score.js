import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore, setLastScore } from "../../../config/redux/engineSlice";
import "./Score.css";
import Rewards from "../../../components/Rewards";
import LoadingSection from "../../../components/LoadingSection";
import {
  CHARACTER_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
} from "../../../const/contractAddresses";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
} from "@thirdweb-dev/react";
import CurrentGear from "../../../components/CurrentGear";
import truncateEthAddress from "truncate-eth-address";
import { Blockie } from "web3uikit";
import { data } from "../../../components/members/data/data";

export const Score = () => {
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

  const score = useSelector((state) => state.engine.score);
  const lastScore = useSelector((state) => state.engine.lastScore);
  const play = useSelector((state) => state.engine.play);
  const die = useSelector((state) => state.engine.die);
  const dispatch = useDispatch();

  var Highscore = {
    address: address,
    score: { lastScore },
  };

  data.push(Highscore);

  useEffect(() => {
    if (play && !die) {
      setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);
    }
    if (score && !play) {
      dispatch(setLastScore(score));
    }
  }, [dispatch, play, score, lastScore, die]);

  return (
    <>
      <div className="score-container">
        {play && <p className="score">Score: {score}</p>}
        {!play && <p className="score"> Score: {lastScore}</p>}
      </div>

      {miningContract &&
      characterContract &&
      tokenContract &&
      pickaxeContract ? (
        <div
          style={{
            margin: "1%",
            color: "white",
            display: "flex",
            width: "100%",
          }}
        >
          <Rewards
            miningContract={miningContract}
            tokenContract={tokenContract}
          />
          <CurrentGear
            miningContract={miningContract}
            characterContract={characterContract}
            pickaxeContract={pickaxeContract}
          />
        </div>
      ) : (
        <LoadingSection />
      )}
    </>
  );
};
export default Score;
