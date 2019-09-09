import fetch from "node-fetch"

// axios.get(url)

exports.handler = async (event, context) => {
  console.log('buidling 2')
  const url = `https://hooks.zapier.com/hooks/catch/3416786/o3zmw51/?date=123&description=456&source=script`

  const response = await fetch(url)
    const data = await response.json()
    return  {
      statusCode: 200,
      body: JSON.stringify(data.projects)
    }
}