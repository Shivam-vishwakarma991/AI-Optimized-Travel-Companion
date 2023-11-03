const axios = require("axios");

const apiUrl = `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/generate-completion`;

export const generateResponse = async (reqBody) =>
  await axios.post(apiUrl, reqBody);
