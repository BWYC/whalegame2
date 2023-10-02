import React from "react";
import { Blockie } from "web3uikit";
import truncateEthAddress from "truncate-eth-address";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useMetamask,
} from "@thirdweb-dev/react";

export default function Item({ row }) {
  const address = useAddress();
  return (
    <li className="item">
      <div className="item__avatar">
        <Blockie />
      </div>
      <span className="item__name">{row.displayName}</span>
      <span className="item__score">{row.score}</span>
    </li>
  );
}
