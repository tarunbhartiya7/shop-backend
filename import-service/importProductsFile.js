const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
}

module.exports.importProductsFile = async (event) => {
  console.log("Import lambda running...")

  return {
    statusCode: 200,
    body: JSON.stringify("It Worked!!!"),
    headers: corsHeaders,
  }
}
