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
    console.log(error);
  });

export const getUserInfo = async () => {
  const [userInfo, userFriends] = await Promise.all([generateUser, generateFriends]);

  return { userInfo, userFriends };
};
