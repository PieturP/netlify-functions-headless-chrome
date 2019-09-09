const axios = require("axios");

const date = new Date().toString();
const url = `https://hooks.zapier.com/hooks/catch/3416786/o3zmw51/?date=${date}&description=building&source=script`;


// axios.get(url)

exports.handler = async (event, context) => {
  console.log('buidling 2')
  axios.get(url)
}