const uuid = require("uuid")
const AWS = require("aws-sdk")
const dynamo = new AWS.DynamoDB.DocumentClient()
const sns = new AWS.SNS()

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
}

module.exports.catalogBatchProcess = async (event) => {
  try {
    console.log("Event: ", JSON.stringify(event))

    const products = event.Records.map((record) => JSON.parse(record.body))
    console.log("products", products)

    for (const product of products) {
      const { title, description, price, count } = product
      const id = uuid.v1()
      const item = {
        id,
        title,
        description,
        price,
      }

      await dynamo
        .put({
          TableName: process.env.PRODUCTS_TABLE,
          Item: item,
        })
        .promise()

      await dynamo
        .put({
          TableName: process.env.STOCKS_TABLE,
          Item: {
            product_id: id,
            count,
          },
        })
        .promise()

      console.log("inserted in database")

      const params = {
        TopicArn: process.env.SNS_ARN,
        Subject: "Product SNS From Lambda",
        Message: `Created product: ${JSON.stringify(item)}`,
      }

      await sns.publish(params).promise()

      console.log("message send to SNS topic")
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
