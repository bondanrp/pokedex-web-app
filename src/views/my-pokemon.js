import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import CardHorizontal from "../components/card-horizontal/card-horizontal";
import { getMyPokemon, removePokemon } from "../helper/localstorage";

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
        {myPokemon.map((val, idx) => {
          return (
            <CardHorizontal
              key={val.nickname}
              data={val}
              openConfirmation={openConfirmation}
            />
          );
        })}
      </div>
    </div>
  );
}
