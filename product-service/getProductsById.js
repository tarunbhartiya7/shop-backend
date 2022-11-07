const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
}

async function getProduct(id) {
  const product = await dynamo
    .get({
      TableName: process.env.PRODUCTS_TABLE,
      Key: {
        id,
      },
    })
    .promise()

  return product.Item
}

async function getStockByProductId(id) {
  const stock = await dynamo
    .get({
      TableName: process.env.STOCKS_TABLE,
      Key: {
        product_id: id,
      },
    })
    .promise()

  return stock.Item
}

module.exports.getProductsById = async (event) => {
  try {
    console.log("Event: ", event)
    const { productId } = event.pathParameters

    const product = await getProduct(productId)
    const stock = await getStockByProductId(productId)

    console.log("product", product)
    console.log("stock", stock)

    if (product && stock) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          ...product,
          count: stock.count,
        }),
        headers: corsHeaders,
      }
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "Product not found",
        }),
        headers: corsHeaders,
      }
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
