import React from "react";
import pokeball from "../../assets/pokeball.png";
import "./loading.scss";

export default function Loading({ alt }) {
  return (
    <div className="loading">
      <img src={pokeball} alt="missing" />
      <p>{alt ? alt : "Loading..."}</p>
    </div>
  );
}
