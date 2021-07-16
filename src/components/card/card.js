import "./card.scss";
import React from "react";
import { css } from "@emotion/css";

export default function Card({ data, setPokemon, owned }) {
  return (
    <div onClick={() => setPokemon(data)} className="card">
      <img src={data.image} alt="missing" />
      <p>{data.name.replace(/-/g, " ")}</p>
      <p
        className={css`
          font-size: 10px;
          color: #383838;
        `}
      >
        Total Owned:
      </p>
      <p
        className={css`
          font-size: 10px;
          color: #383838;
        `}
      >
        {owned}
      </p>
    </div>
  );
}
