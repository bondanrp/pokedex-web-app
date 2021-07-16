import { useQuery } from "@apollo/client";
import { css } from "@emotion/css";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GET_POKEMONS } from "../api/api";
import Card from "../components/card/card";
import CatchComponent from "../components/catch-component/catch-component";
import Detail from "../components/detail/detail";
import Loading from "../components/loading/loading";
import Pagination from "../components/pagination/pagination";
import { getMyPokemon } from "../helper/localstorage";

export function Home() {
  const [pokemons, setpokemons] = useState({});
  const [page, setpage] = useState(1);
  const [count, setcount] = useState(0);
  const [pokemon, setpokemon] = useState("");
  const [myPokemon, setmyPokemon] = useState([]);
  const [lastPokemon, setlastPokemon] = useState({});
  const [catching, setcatching] = useState(false);
  const { loading } = useQuery(GET_POKEMONS, {
    onCompleted: (data) => {
      setpokemons(data.pokemons);
      setcount(data.pokemons.count);
    },
    variables: {
      limit: 30,
      offset: (page - 1) * 30,
    },
  });
  const location = useLocation();

  useEffect(() => {
    console.log(page);
  }, [page]);
  useEffect(() => {
    setmyPokemon(getMyPokemon());
  }, [catching]);

  useEffect(() => {
    const queryString = qs.parse(location.search, { ignoreQueryPrefix: true });
    const n = Number(queryString.page);
    setpage(n || 1);
  }, [location]);

  const countOwned = (name) => {
    if (myPokemon && myPokemon.length > 0) {
      return myPokemon.filter((obj) => obj.pokemon === name).length;
    } else {
      return 0;
    }
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
            grid-gap: 16px;
            justify-content: center;
            padding-top: 80px;
            grid-template-columns: repeat(2, 170px);
            @media only screen and (min-width: 1100px) {
              grid-template-columns: repeat(6, 170px);
            }
            @media only screen and (min-width: 600px) and (max-width: 1100px) {
              grid-template-columns: repeat(3, 170px);
            }
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
