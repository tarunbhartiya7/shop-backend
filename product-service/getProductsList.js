const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()
require("../config")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
}

module.exports.getProductsList = async (event, context, callback) => {
  console.log("Scanning Products table.")

  try {
    const productsData = await dynamo
      .scan({
        TableName: process.env.DYNAMODB_PRODUCTS,
      })
      .promise()

    const stocksData = await dynamo
      .scan({
        TableName: process.env.DYNAMODB_STOCKS,
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
