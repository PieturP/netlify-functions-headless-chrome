const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')
const hasAuthorization = require('./auth.js')

exports.handler = async (event, context, callback) => {

  if (!hasAuthorization(event, context)){
    return callback(null, {statusCode: 403})
  }

  let browser = null
  let body = null

  const targetUrl = event.queryStringParameters.url || 'https://eenengelswoord.nl/';

  try {
    const executablePath = await chromium.executablePath

    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: executablePath,
      headless: chromium.headless,
    })

    const page = await browser.newPage()
    await page.setViewport({ width: 1366, height: 768})

    // page.setExtraHTTPHeaders({"Authorization": process.env.INVOICE_API_KEY})
    await page.goto(targetUrl, {
      waitUntil: ["domcontentloaded", "networkidle0"]
    })
    await page.emulateMedia('screen')

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        left: "0cm",
        right: "0cm",
        top: "0cm",
        bottom: "0cm",
      }
    })

    body = new Buffer(pdf).toString('base64')
    console.log(`done on page ${targetUrl}`)

  } catch (error) {
    console.log('error', error)
    return callback(null, {
      statusCode: 500,
      // body: JSON.stringify({
      //   error: error
      // })
    })
  } finally {

    // IMPORTANT: close browser
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