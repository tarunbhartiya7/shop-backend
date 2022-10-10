const { products } = require("./stubData")

module.exports.getProductsList = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(products),
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
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  }
}
