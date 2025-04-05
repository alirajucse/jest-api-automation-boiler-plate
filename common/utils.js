const axios = require("axios");
const { appconf } = require("../jest.config");
const Service = require("./httpClientService");

class AppApi extends Service {}

async function getAuthToken(email, password) {
  const endpoint = appconf.baseUrl + `/users/login`;
  const response = await axios.post(endpoint, {
    email: email,
    password: password,
  });
  const authToken = response.data.data.token;
  return authToken;
}

const generateRandomString = () => {
  const length = 10;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

module.exports = {
  AppApi,
  getAuthToken,
  generateRandomString,
};
