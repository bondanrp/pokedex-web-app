import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import { GET_POKEMONS } from "../api/api";
import Card from "../components/card/card";
import CatchComponent from "../components/catch-component/catch-component";
import Detail from "../components/detail/detail";
import Loading from "../components/loading/loading";
import Navbar from "../components/navbar/navbar";
import Pagination from "../components/pagination/pagination";
import { getMyPokemon } from "../helper/localstorage";

export function Home() {
  const [pokemons, setpokemons] = useState({});
  const [page, setpage] = useState(0);
  const [count, setcount] = useState(0);
  const [pokemon, setpokemon] = useState("");
  const [myPokemon, setmyPokemon] = useState([]);
  const [lastPokemon, setlastPokemon] = useState({});
  const [catching, setcatching] = useState(false);
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    onCompleted: (data) => {
      setpokemons(data.pokemons);
      setcount(data.pokemons.count);
    },
    variables: {
      limit: 30,
      offset: page * 30,
    },
  });

  useEffect(() => {
    setmyPokemon(getMyPokemon());
  }, [catching]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const countOwned = (name) => {
    return myPokemon.filter((obj) => obj.pokemon === name).length;
  };

  const handleCatch = () => {
    setpokemon("");
    setcatching(true);
  };

  return (
    <div>
      <Detail
        setPokemon={setpokemon}
        setLastPokemon={setlastPokemon}
        pokemon={pokemon}
        owned={countOwned(pokemon.name)}
        handleCatch={handleCatch}
      />
      <CatchComponent
        pokemon={lastPokemon}
        catching={catching}
        setCatching={setcatching}
      />
      {loading ? (
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            height: 90vh;
          `}
        >
          <Loading />
        </div>
      ) : (
        <div
          className={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(170px, 170px));
            grid-gap: 16px;
            justify-content: center;
            padding-top: 80px;
          `}
        >
          {pokemons &&
            pokemons.results &&
            pokemons.results.map((val) => {
              return (
                <Card
                  setPokemon={setpokemon}
                  key={val.name}
                  data={val}
                  owned={countOwned(val.name)}
                />
              );
            })}
        </div>
      )}
      <Pagination page={page} setPage={setpage} count={count} />
    </div>
  );
}
