const AWS = require("aws-sdk")
const s3 = new AWS.S3()
require("../config")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
}

module.exports.importProductsFile = async (event) => {
  console.log("event", event)
  const { name } = event.queryStringParameters

  try {
    const url = await s3.getSignedUrlPromise("putObject", {
      Bucket: process.env.S3_BUCKET,
      Key: `uploaded/${name}`,
      Expires: 300, // 5 min
      ContentType: "text/csv",
    })

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "AWS S3 Pre-signed urls generated successfully.",
        url,
      }),
      headers: corsHeaders,
    }
  } catch (err) {
    console.log("Error getting presigned url from AWS S3:", err)
    return {
      statusCode: err.statusCode || 502,
      body: JSON.stringify({
        success: false,
        message: "Pre-Signed URL error",
        err,
      }),
      headers: corsHeaders,
    }
  }
}
