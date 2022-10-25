const uuid = require("uuid")
const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
}

module.exports.getProductsList = async (event, context, callback) => {
  console.log("Scanning Products table.")

  try {
    const data = await dynamo
      .scan({
        TableName: "products",
      })
      .promise()

    console.log("Scan succeeded.")

    return {
      statusCode: 201,
      body: JSON.stringify(data.Items),
      headers: corsHeaders,
    }
  } catch (error) {
    console.log(
      "Scan failed to load data. Error JSON:",
      JSON.stringify(err, null, 2)
    )
    return {
      statusCode: 500,
      body: JSON.stringify(err, null, 2),
      headers: corsHeaders,
    }
  }
}

module.exports.getProductsById = async (event) => {
  console.log("Event: ", event)
  const { productId } = event.pathParameters

  const product = await dynamo
    .get({
      TableName: "products",
      Key: {
        id: productId,
      },
    })
    .promise()

  if (Object.keys(product).length === 0) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Product not found",
      }),
      headers: corsHeaders,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product.Item),
    headers: corsHeaders,
  }
}

module.exports.createProduct = async (event) => {
  console.log("Event: ", event)
  const requestBody = JSON.parse(event.body)
  const { title, description, price } = requestBody

  const item = {
    id: uuid.v1(),
    title,
    description,
    price,
  }

  try {
    await dynamo
      .put({
        TableName: "products",
        Item: item,
      })
      .promise()

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Data inserted." }),
      headers: corsHeaders,
    }
  } catch (error) {
    console.log(
      "Failed to insert data. Error JSON:",
      JSON.stringify(err, null, 2)
    )
    return {
      statusCode: 500,
      body: JSON.stringify(err, null, 2),
      headers: corsHeaders,
    }
  }
}
