const axios = require("axios");

console.log('building...');

const date = new Date().toString();
const url = `https://hooks.zapier.com/hooks/catch/3416786/o3zmw51/?date=${date}&description=building&source=script`;


exports.handler = async (event, context, cb) => {
  console.log('buidling 2')

  await axios.get(url)

  return cb(null, {
    statusCode: 200,
    body: 'Ok',
  })
}