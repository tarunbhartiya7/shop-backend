const { products } = require("./stubData")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
}

module.exports.getProductsList = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(products),
    headers: corsHeaders,
  }

  return response
}

module.exports.getProductsById = async (event) => {
  const { productId } = event.pathParameters

  const product = products.find((item) => item.id === productId)

  if (!product) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Product not found",
      }),
      headers: corsHeaders,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
    headers: corsHeaders,
  }
}
