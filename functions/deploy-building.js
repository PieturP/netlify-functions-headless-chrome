const request = require('request');

//https://hooks.zapier.com/hooks/catch/3416786/o3zmw51/?date=123&description=456&source=script
exports.handler = async (event, context, callback) => {
  console.log('deploy started') ;

  const date = new Date().toString();
  const url = `https://hooks.zapier.com/hooks/catch/3416786/o3zmw51/?date=${date}&description=deploy&source=script`;

  const options = {json: true};



  request(url, options, (error, res, body) => {
      if (error) {
          return  console.log(error)
      };
  });

}