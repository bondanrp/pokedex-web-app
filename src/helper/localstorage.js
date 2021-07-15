export function addPokemon(item) {
  var pokemon = getMyPokemon();
  var found = false;
  for (var i = 0; i < pokemon.length; i++) {
    if (pokemon[i].nickname.toLowerCase() == item.nickname.toLowerCase()) {
      found = true;
      break;
    }
  }
  if (!found) {
    pokemon.push(item);
    localStorage.setItem("myPokemon", JSON.stringify(pokemon));
    return true;
  } else {
    return false;
  }
}
export function getMyPokemon() {
  return JSON.parse(localStorage.getItem("myPokemon"));
}

export function removePokemon(item) {
  var pokemon = getMyPokemon();
  var index = pokemon.map((val) => val.nickname).indexOf(item.nickname);
  if (index >= 0) {
    pokemon.splice(index, 1);
    localStorage.setItem("myPokemon", JSON.stringify(pokemon));
  }
}
