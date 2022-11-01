const AWS = require("aws-sdk")
const s3 = new AWS.S3()
require("../config")
const csv = require("csv-parser")

module.exports.importFileParser = async (event) => {
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `uploaded/products.csv`,
  }
  const results = []

  const promise = new Promise(function (resolve, reject) {
    s3.getObject(params)
      .createReadStream()
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        console.log(results)

        await s3
          .copyObject({
            Bucket: process.env.S3_BUCKET,
            CopySource: `${process.env.S3_BUCKET}/uploaded/products.csv`,
            Key: `parsed/products.csv`,
          })
          .promise()

        await s3.deleteObject(params).promise()

        resolve(results)
      })
      .on("error", (error) => {
        console.error("Error while downloading object from S3", error.message)
        reject(error)
      })
  })
  return promise
}