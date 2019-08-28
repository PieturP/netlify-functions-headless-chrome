const chromium = require('chrome-aws-lambda')
const puppeteer = require('puppeteer-core')

exports.handler = async (event, context, callback) => {
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
    console.log('browser set up');

    // Do stuff with headless chrome
    const page = await browser.newPage()


    console.log('browser new page')

    // Goto page and then do stuff
    await page.goto(targetUrl, {
      waitUntil: ["domcontentloaded", "networkidle0"]
    })



    console.log('browser page loaded')

    // await page.waitForSelector('#phenomic')
    pdf = await page.pdf()
    body = btoa(pdf)

    console.log('done on page')

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