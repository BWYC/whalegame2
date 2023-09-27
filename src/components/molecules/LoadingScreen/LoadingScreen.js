import { useEffect, useState } from "react";
import MarioCharacter from "../../../assets/img/mario.png";
import "./LoadingScreen.css";
import { setLoadingScreen } from "../../../config/redux/engineSlice";
import { useDispatch } from "react-redux";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import {
  CHARACTER_EDITION_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
} from "../../../const/contractAddresses";
import MintContainer from "../../../components/MintContainer";

const LoadingScreen = () => {
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

  const { contract: editionDrop } = useContract(
    CHARACTER_EDITION_ADDRESS,
    "edition-drop",
  );

  const address = useAddress();

  const {
    data: ownedNfts,
    isLoading,
    isError,
  } = useOwnedNFTs(editionDrop, address);

  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 10000);
  }, []);

  if (!address) {
    return (
      <div className="loading-screen-container">
        <ConnectWallet theme="dark" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-screen-container">LOADING BLOCKCHAIN DATA...</div>
    );
  }

  if (!ownedNfts || isError) {
    return (
      <div className="loading-screen-container">
        YOU DO NOT HAVE A CHARACTER
      </div>
    );
  }

  if (ownedNfts.length === 0) {
    return (
      <div className="loading-screen-container">
        <MintContainer />
      </div>
    );
  }

  if (ownedNfts.length !== 0) {
    return (
      <>
        <div className="loading-screen-container">
          <img src={MarioCharacter} alt="" className="loading-mario" />
          {!isReady && (
            <h1 className="loading-title">LOADING THE OCEAN🌊...</h1>
          )}
          {isReady && (
            <button
              className="enter-button"
              onClick={() => dispatch(setLoadingScreen(false))}
            >
              ENTER WHALE ARCADE
            </button>
          )}
        </div>
      </>
    );
  }
};
export default LoadingScreen;
