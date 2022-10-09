"use strict"

const products = [
  {
    description: "5.4-inch (13.7 cm diagonal) Super Retina XDR display",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 2400,
    title: "Iphone 13 mini",
  },
  {
    description: "6.1-inch (15.5 cm diagonal) Super Retina XDR display",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 1500,
    title: "Iphone 12",
  },
  {
    description: "6.1-inch (15.5 cm diagonal) Super Retina XDR display",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 2200,
    title: "Iphone 13",
  },
  {
    description:
      "6.1-inch (15.5 cm diagonal) Super Retina XDR display with ProMotion",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 1800,
    title: "Iphone 13 Pro",
  },
  {
    description: "6.1-inch Super Retina XDR display with ProMotion",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 2700,
    title: "Iphone 14 Pro",
  },
  {
    description: "6.1-inch Super Retina XDR display",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 2500,
    title: "Iphone 14",
  },
]

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
