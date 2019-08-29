const api_key = process.env.API_KEY;

module.exports = (event, context) => {
  if (event.queryStringParameters.api_key !== 'undefined' && event.queryStringParameters.api_key == api_key) {
    return true;
  }
  console.log('unauthorized')
  console.log(JSON.stringify(event))
  console.log(JSON.stringify(context))
  return false;
}
