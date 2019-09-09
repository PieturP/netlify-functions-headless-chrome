const axios = require("axios");


// axios.get(url)

exports.handler = async (event, context) => {
  console.log('buidling 2')
  const url = `https://hooks.zapier.com/hooks/catch/3416786/o3zmw51/?date=123&description=456&source=script`

  axios.get(url).then((response) => console.log(JSON.stringify(response)))
  console.log('bulding 3')
}