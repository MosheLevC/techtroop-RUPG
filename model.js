import axios from "axios";

const generateUser = axios
  .get("https://randomuser.me/api/?inc=picture,name,location&noinfo")
  .then(({ data }) => {
    if (!data?.results) throw new Error("fetch user data error");

    const result = data.results?.[0];

    return {
      userPictureUrl: result.picture.thumbnail,
      fNAme: result.name.first,
      lName: result.name.last,
      city: result.location.city,
      state: result.location.state,
    };
  })
  .catch((error) => {
    console.error(error);
    return null;
  });

const generateFriends = axios
  .get("https://randomuser.me/api/?inc=name&results=6&noinfo")
  .then(({ data }) => {
    if (!data?.results) throw new Error("fetch friends data error");

    const results = data.results;

    return results.map((friend) => ({
      fName: friend.name.first,
      lName: friend.name.last,
    }));
  })
  .catch((error) => {
    console.error(error);
    return null;
  });

const generateQuote = axios
  .get("https://api.kanye.rest")
  .then(({ data }) => {
    if (!data?.quote) throw new Error("fetch quote error");

    return { quoteText: data?.quote, quoteBy: "Kanye West" };
  })
  .catch((error) => {
    console.error(error);
    return null;
  });

const generatePokemon = axios
  .get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1025) + 1}`)
  .then(({ data }) => {
    if (!data) throw new Error("fetch pokemon error");

    const properCasePokemon = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    return {
      name: properCasePokemon,
      picture: data.sprites.front_default,
    };
  })
  .catch((error) => {
    console.error(error);
    return null;
  });

const generateBaconIpsum = axios
  .get("https://baconipsum.com/api/?type=meat-and-filler&sentences=5&format=text")
  .then(({ data }) => {
    if (!data) throw new Error("fetch baconIpsum error");

    return data;
  })
  .catch((error) => {
    console.error(error);
    return null;
  });

export const getUserInfo = async () => {
  const [userInfo, userFriends, favoriteQuote, favoritePokemon, userAbout] = await Promise.all([
    generateUser,
    generateFriends,
    generateQuote,
    generatePokemon,
    generateBaconIpsum,
  ]);

  return { userInfo, userFriends, favoriteQuote, favoritePokemon, userAbout };
};
