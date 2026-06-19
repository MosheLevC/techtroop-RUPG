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

export const getUserInfo = async () => {
  // note to self need to turn into a promise all type thing so it gets it in parralel
  await generateUser();
};
