import axios from "axios";

const userData = {};
const generateUser = async () => {
  axios
    .get("https://randomuser.me/api/?inc=picture,name,location&noinfo")
    .then(({ data }) => {
      if (data) {
        const result = data.results?.[0];

        userData.userInfo = {
          userPictureUrl: result.picture.thumbnail,
          fNAme: result.name.first,
          lName: result.name.last,
          city: result.location.city,
          state: result.location.state,
        };
      } else {
        userData.userInfo = null;

        throw new Error("fetch user data failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const generateFriends = async () => {
  axios
    .get("https://randomuser.me/api/?inc=name&results=6&noinfo")
    .then(({ data }) => {
      if (data) {
        const results = data.results;
        userData.userFriends = results.map((friend) => ({
          fName: friend.name.first,
          lName: friend.name.last,
        }));
      } else {
        userData.userFriends = null;

        throw new Error("fetch user data failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserInfo = async () => {
  // note to self need to turn into a promise all type thing so it gets it in parralel
  await generateUser();
  await generateFriends();
};
