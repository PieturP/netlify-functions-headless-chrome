const api_key = process.env.API_KEY;

module.exports = (event, context) => {
  if (event.headers.Authorization !== 'undefined' && event.headers.Authorization === api_key) {
    return true;
  }
  console.log('unauthorized')
  console.log(JSON.stringify(event))
  console.log(JSON.stringify(context))
  return false;
}
