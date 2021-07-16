import React, { useEffect, useState } from "react";
import { addPokemon } from "../../helper/localstorage";
import { types } from "../../helper/types";
import Loading from "../loading/loading";
import "./catch-component.scss";

export default function CatchComponent({ pokemon, catching, setCatching }) {
  const [loading, setloading] = useState(true);
  const [success, setsuccess] = useState(false);
  const [nickname, setnickname] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [ok, setok] = useState(false);
  useEffect(() => {
    setloading(true);
    if (Math.random() > 0.5) {
      setsuccess(true);
    } else {
      setsuccess(false);
    }
    let loader = setTimeout(() => {
      setloading(false);
    }, 500);
    return () => {
      clearTimeout(loader);
    };
  }, [catching]);
  const handleAdd = () => {
    if (nickname) {
      if (
        addPokemon({
          pokemon: pokemon.name,
          nickname: nickname,
          image: pokemon.sprites.front_default,
        })
      ) {
        setok(true);
        setTimeout(() => {
          handleClear();
        }, 1000);
      } else {
        seterrMsg(`You Already Have A Pokemon With The Name ${nickname}`);
      }
    }
  };
  const handleClear = () => {
    setCatching(false);
    seterrMsg("");
    setloading(true);
    setnickname("");
    setok(false);
  };
  return (
    <div className="detail">
      <div className={catching ? "detail-bg" : "detail-bg hide"}></div>
      {ok ? (
        <div className="detail-center">
          <p>Added To My Pokemon!</p>
        </div>
      ) : loading && catching ? (
        <div className="detail-center">
          <Loading alt="Catching Pokemon..." />
        </div>
      ) : catching ? (
        <div className="detail-card">
          {success ? (
            <div className="catch-card">
              <p className="catch-card-title">
                You've successfuly caught this {pokemon.name.replace(/-/g, " ")}
                !
              </p>
              <div className="catch-card-img">
                <img
                  style={{
                    backgroundImage: `url(${
                      types(
                        pokemon.types &&
                          pokemon.types[0] &&
                          pokemon.types[0].type &&
                          pokemon.types[0].type.name
                      ).image
                    })`,
                  }}
                  src={pokemon.sprites && pokemon.sprites.front_default}
                  alt="missing"
                />
              </div>
              <p className="catch-card-subtitle">
                What would you like to name it?
              </p>
              <input
                maxLength="12"
                value={nickname}
                onChange={(e) => {
                  setnickname(e.target.value);
                }}
                type="text"
              />
              {errMsg ? <p className="error-message">{errMsg}</p> : ""}
              <div className="detail-card-container-footer">
                <button className="catch" onClick={handleAdd}>
                  ADD TO MY POKEMON
                </button>
                <button
                  className="close"
                  onClick={() => {
                    handleClear();
                  }}
                >
                  RELEASE
                </button>
              </div>
            </div>
          ) : (
            <div className="catch-card">
              <p className="catch-card-title">
                {pokemon.name.replace(/-/g, " ")} got away!
              </p>
              <div className="catch-card-img">
                <img
                  style={{
                    backgroundImage: `url(${
                      types(
                        pokemon.types &&
                          pokemon.types[0] &&
                          pokemon.types[0].type &&
                          pokemon.types[0].type.name
                      ).image
                    })`,
                  }}
                  src={pokemon.sprites && pokemon.sprites.front_default}
                  alt="missing"
                />
              </div>
              <div className="detail-card-container-footer">
                <button
                  className="close"
                  onClick={() => {
                    handleClear();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
