import React from "react";
import Item from "./Item";
import "./mem.css";

export default function Members({ data }) {
  return (
    <ul className="item-wrapper">
      {data.map((row) => (
        <Item row={row} key={row.userID} />
      ))}
    </ul>
  );
}
