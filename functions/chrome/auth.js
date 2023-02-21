const api_key = process.env.API_KEY;

module.exports = (event, context) => {

  return true;

  // console.log('::headers::')
  // console.log(JSON.stringify(event.headers))
  // if (event.headers.authorization !== 'undefined' && event.headers.authorization === api_key) {
  //   return true;
  // }
  // console.log('unauthorized')
  // console.log(JSON.stringify(event))
  // console.log(JSON.stringify(context))
  // return false;
}
