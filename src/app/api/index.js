const axios = require("axios");

const apiUrl = "http://127.0.0.1:5000/generate-completion";

export const generateResponse = async (reqBody) =>
  await axios.post(apiUrl, reqBody);
