const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
}

module.exports.getProductsList = async (event, context, callback) => {
  console.log("Scanning Products table.")

  try {
    const productsData = await dynamo
      .scan({
        TableName: process.env.PRODUCTS_TABLE,
      })
      .promise()

    const stocksData = await dynamo
      .scan({
        TableName: process.env.STOCKS_TABLE,
      })
      .promise()

    const result = productsData.Items.map((product) => {
      const found = stocksData.Items.find(
        (stock) => stock.product_id === product.id
      )
      return {
        ...product,
        count: found.count,
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: corsHeaders,
    }
  } catch (error) {
    console.log(
      "Scan failed to load data. Error JSON:",
      JSON.stringify(error, null, 2)
    )
    return {
      statusCode: 500,
      body: JSON.stringify(error, null, 2),
      headers: corsHeaders,
    }
  }
}
