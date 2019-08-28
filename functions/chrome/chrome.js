const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

const api_key = process.env.API_KEY;

const hasAuthorization = (event, context) => {
  if (event.queryStringParameters.api_key !== 'undefined' && event.queryStringParameters.api_key == api_key) {
    return true;
  }
  console.log('unauthorized')
  console.log(JSON.stringify(event))
  console.log(JSON.stringify(context))
  return false;
}

exports.handler = async (event, context, callback) => {

  if (!hasAuthorization(event, context)){
    return callback(null, {statusCode: 403})
  }

  let pdf = null
  let browser = null
  let body = null

  console.log('spawning chrome headless')

  const targetUrl = event.queryStringParameters.url || 'https://eenengelswoord.nl/';

  try {
    const executablePath = await chromium.executablePath
    // setup
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath,
      headless: chromium.headless,
    })

    // Do stuff with headless chrome
    const page = await browser.newPage()

    // Goto page and then do stuff
    await page.goto(targetUrl, {
      waitUntil: ["domcontentloaded", "networkidle0"]
    })

    pdf = await page.pdf()
    body = new Buffer(pdf).toString('base64')

    console.log(`done on page ${targetUrl}`)

  } catch (error) {
    console.log('error', error)
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({
        error: error
      })
    })
  } finally {
    // close browser
    if (browser !== null) {
      await browser.close()
    }
  }

  return callback(null, {
    isBase64Encoded: true,
    statusCode: 200,
    body: body,
    headers: { "Content-Type": "application/pdf" }
  })
}