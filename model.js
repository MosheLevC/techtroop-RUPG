import axios from "axios";

let userData = {};
const generateUser = async () => {
  axios
    .get("https://randomuser.me/api/?inc=picture,name,location")
    .then(({ data }) => {
      if (data) {
        const result = data.results?.[0];
        const userInfo = {};

        userInfo["userPictureUrl"] = result.picture.thumbnail;
        userInfo["fNAme"] = result.name.first;
        userInfo["lName"] = result.name.last;
        userInfo["city"] = result.location.city;
        userInfo["state"] = result.location.state;

        userData["userInfo"] = userInfo;
      } else {
        userData["userInfo"] = null;
        console.log("blep");

        throw new Error("fetch user data failed");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserInfo = async () => {
  // need to turn into a promise all type thing so it gets it in parralel
  await generateUser();
};
