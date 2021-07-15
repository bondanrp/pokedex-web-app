import { css } from "@emotion/css";
import React from "react";
import "./card-horizontal.scss";

export default function CardHorizontal({ data, openConfirmation }) {
  return (
    <div className="card-horizontal">
      <div>
        <img src={data.image} />
        <div>
          <p>{data.nickname}</p>
          <p
            className={css`
              font-size: 0.5em;
              text-transform: capitalize;
            `}
          >
            {data.pokemon.replace(/-/g, " ")}
          </p>
        </div>
      </div>
      <button onClick={() => openConfirmation(data)}>Release</button>
    </div>
  );
}
