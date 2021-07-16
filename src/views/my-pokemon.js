import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import CardHorizontal from "../components/card-horizontal/card-horizontal";
import { getMyPokemon, removePokemon } from "../helper/localstorage";
import missing from "../assets/missing.png";
import { Link } from "react-router-dom";

export default function MyPokemon() {
  const [confirm, setconfirm] = useState(false);
  const [myPokemon, setmyPokemon] = useState([]);
  const [selectedPokemon, setselectedPokemon] = useState({});
  const [refresh, setrefresh] = useState(false);
  const [ok, setok] = useState(false);

  useEffect(() => {
    setrefresh(false);
    setmyPokemon(getMyPokemon());
  }, [refresh]);

  const openConfirmation = (data) => {
    setselectedPokemon(data);
    setconfirm(true);
  };
  const handleRelease = () => {
    removePokemon(selectedPokemon);
    setconfirm(false);
    setok(true);
    setrefresh(true);
    setTimeout(() => {
      setok(false);
    }, 1000);
  };
  return (
    <div>
      <div className="detail">
        <div
          onClick={() => setconfirm(false)}
          className={confirm || ok ? "detail-bg" : "detail-bg hide"}
        ></div>
        {ok ? (
          <div className="detail-center">
            <p>{selectedPokemon.nickname} Released!</p>
          </div>
        ) : confirm ? (
          <div className={confirm ? "detail-card" : "detail-card hide"}>
            <p>Are you sure you want to release {selectedPokemon.nickname}</p>
            <div className="confirm-button">
              <button onClick={() => setconfirm(false)}>CANCEL</button>
              <button onClick={() => handleRelease()}>RELEASE</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div
        className={css`
          display: grid;
          grid-gap: 16px;
          justify-content: center;
          align-items: center;
          padding-top: 80px;
        `}
      >
        {myPokemon && myPokemon.length > 0 ? (
          myPokemon.map((val, idx) => {
            return (
              <CardHorizontal
                key={val.nickname}
                data={val}
                openConfirmation={openConfirmation}
              />
            );
          })
        ) : (
          <div
            class={css`
              padding-top: 50px;
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 300px;
              img {
                width: 75px;
              }
              p {
                text-align: left;
                width: 100%;
                margin-bottom: 0px;
              }
            `}
          >
            <img src={missing} alt="missing" />
            <p>Uh Oh</p>
            <p>It seems that you haven't caught any pokemon yet</p>
            <p>
              Go <Link to="/">here</Link> to catch some
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
