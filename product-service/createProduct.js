const uuid = require("uuid")
const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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
        TableName: process.env.PRODUCTS_TABLE,
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
      JSON.stringify(error, null, 2)
    )
    return {
      statusCode: 500,
      body: JSON.stringify(error, null, 2),
      headers: corsHeaders,
    }
  }
}
