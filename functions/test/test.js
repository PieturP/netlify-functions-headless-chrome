const axios = require("axios");

const url = `https://hooks.zapier.com/hooks/catch/3416786/o3zmw51/?date=today&description=building&source=script`;


// axios.get(url)

exports.handler = async (event, context) => {
  console.log('buidling 2')
  axios.get(url).then((response) => console.log(JSON.stringify(response)))
  console.log('bulding 3')
}