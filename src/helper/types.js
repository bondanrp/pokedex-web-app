export function types(type) {
  const baseUrl = "https://static.wikia.nocookie.net/pokemongo/images/";
  if (type === "grass") {
    return {
      image: baseUrl + "9/92/Type_Background_Grass.png",
      hex: "#7AC74C",
    };
  } else if (type === "fire") {
    return { image: baseUrl + "6/64/Type_Background_Fire.png", hex: "#EE8130" };
  } else if (type === "water") {
    return {
      image: baseUrl + "d/d2/Type_Background_Water.png",
      hex: "#6390F0",
    };
  } else if (type === "flying") {
    return {
      image: baseUrl + "6/65/Type_Background_Flying.png",
      hex: "#A98FF3",
    };
  } else if (type === "normal") {
    return {
      image: baseUrl + "f/f6/Type_Background_Normal.png",
      hex: "#A8A77A",
    };
  } else if (type === "bug") {
    return { image: baseUrl + "0/05/Type_Background_Bug.png", hex: "#A6B91A" };
  } else if (type === "dark") {
    return { image: baseUrl + "f/f5/Type_Background_Dark.png", hex: "#705746" };
  } else if (type === "dragon") {
    return {
      image: baseUrl + "2/28/Type_Background_Dragon.png",
      hex: "#6F35FC",
    };
  } else if (type === "electric") {
    return {
      image: baseUrl + "6/6c/Type_Background_Electric.png",
      hex: "#F7D02C",
    };
  } else if (type === "fairy") {
    return {
      image: baseUrl + "1/19/Type_Background_Fairy.png",
      hex: "#D685AD",
    };
  } else if (type === "fighting") {
    return {
      image: baseUrl + "1/17/Type_Background_Fighting.png",
      hex: "#C22E28",
    };
  } else if (type === "ghost") {
    return {
      image: baseUrl + "4/44/Type_Background_Ghost.png",
      hex: "#735797",
    };
  } else if (type === "ground") {
    return {
      image: baseUrl + "a/a3/Type_Background_Ground.png",
      hex: "#E2BF65",
    };
  } else if (type === "ice") {
    return { image: baseUrl + "8/85/Type_Background_Ice.png", hex: "#96D9D6" };
  } else if (type === "poison") {
    return {
      image: baseUrl + "d/db/Type_Background_Poison.png",
      hex: "#A33EA1",
    };
  } else if (type === "psychic") {
    return {
      image: baseUrl + "f/f8/Type_Background_Psychic.png",
      hex: "#F95587",
    };
  } else if (type === "rock") {
    return { image: baseUrl + "5/5d/Type_Background_Rock.png", hex: "#B6A136" };
  } else if (type === "steel") {
    return {
      image: baseUrl + "3/30/Type_Background_Steel.png",
      hex: "#B7B7CE",
    };
  } else {
    return {
      image: baseUrl + "f/f6/Type_Background_Normal.png",
      hex: "#A8A77A",
    };
  }
}
