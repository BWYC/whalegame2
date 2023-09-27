import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../../App.css";
import { useSelector } from "react-redux";
import {
  Birds,
  Bricks,
  Clouds,
  Mario,
  Obstacles,
  Sun,
  KeyMessage,
  LoadingScreen,
  Score,
  MobileControls,
  Footer,
} from "../../components";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
  Web3Button,
} from "@thirdweb-dev/react";
import React from "react";
import CurrentGear from "../../components/Shop";
import LoadingSection from "../../components/Shop";
import OwnedGear from "../../components/Shop";
import Rewards from "../../components/Shop";

import {
  CHARACTER_EDITION_ADDRESS,
  GOLD_GEMS_ADDRESS,
  MINING_CONTRACT_ADDRESS,
  PICKAXE_EDITION_ADDRESS,
} from "../../const/contractAddresses";

import Shop from "../../components/Shop";

function Home() {
  const isPlay = useSelector((state) => state.engine.play);
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
    <>
      <div className="App">
        {!isPlay && <KeyMessage />}

        <Bricks />
        <Mario />
        <Sun />
        <Clouds />
        <Birds />
        <Obstacles />
        <Score />
      </div>

      <MobileControls />

      <Footer />
    </>
  );
}

function AppRoutes() {
  const isLoading = useSelector((state) => state.engine.loadingScreen);
  return (
    <BrowserRouter>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
