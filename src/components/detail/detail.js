import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import { GET_POKEMON } from "../../api/api";
import { types } from "../../helper/types";
import Loading from "../loading/loading";
import "./detail.scss";

export default function Detail({
  pokemon,
  setPokemon,
  setLastPokemon,
  handleCatch,
  owned,
}) {
  const [item, setitem] = useState({});
  const { loading } = useQuery(GET_POKEMON, {
    onCompleted: (data) => {
      setitem(data.pokemon);
      setLastPokemon(data.pokemon);
    },
    skip: !pokemon,
    variables: {
      name: pokemon.name,
    },
  });
  return (
    <div className="detail">
      <div
        className={pokemon ? "detail-bg" : "detail-bg hide"}
        onClick={() => setPokemon("")}
      ></div>
      <div className={pokemon ? "detail-card" : "detail-card hide"}>
        {loading ? (
          <Loading />
        ) : (
          <div className="detail-card-container">
            <div className="detail-card-container-header">
              <div>
                <div className="detail-card-container-header-img">
                  <img
                    style={{
                      backgroundImage: `url(${
                        types(
                          item.types &&
                            item.types[0] &&
                            item.types[0].type &&
                            item.types[0].type.name
                        ).image
                      })`,
                    }}
                    src={item.sprites && item.sprites.front_default}
                    alt="missing"
                  />
                </div>
                <p className="detail-card-container-header-detail-owned">
                  Owned: {owned}
                </p>
              </div>
              <div className="detail-card-container-header-detail">
                <p className="detail-card-container-header-detail-title">
                  {item.name && item.name.replace(/-/g, " ")}
                </p>
                <p className="detail-card-container-header-detail-subtitle">
                  No. {item.id}
                </p>
                <div className="detail-card-container-header-detail-types">
                  {item.types &&
                    item.types.map((val, idx) => {
                      const type =
                        item.types &&
                        item.types[idx] &&
                        item.types[idx].type &&
                        item.types[idx].type.name;
                      return (
                        <p
                          key={"type" + idx}
                          style={{ backgroundColor: types(type).hex }}
                        >
                          {val.type.name}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="detail-card-container-body">
              <p>Available Moves:</p>
              <div className="detail-card-container-body-moves">
                {item.moves &&
                  item.moves.map((val, idx) => {
                    return (
                      <p key={val.move.name + idx}>
                        {val.move.name.replace(/-/g, " ")}
                      </p>
                    );
                  })}
              </div>
            </div>
            <div className="detail-card-container-footer">
              <button className="catch" onClick={handleCatch}>
                CATCH
              </button>
              <button className="close" onClick={() => setPokemon("")}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
