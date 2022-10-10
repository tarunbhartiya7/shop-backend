const { getProductsList, getProductsById } = require("../products")
const { products } = require("../products/stubData")

describe("Unit test for Products handler", function () {
  it("verifies if getProductsList returns all products", async () => {
    const result = await getProductsList()
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(JSON.stringify(products))
  })

  it("verifies if product is matching", async () => {
    const product = {
      description: "6.1-inch (15.5 cm diagonal) Super Retina XDR display",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      price: 1500,
      title: "Iphone 12",
    }
    const event = {
      pathParameters: {
        productId: product.id,
      },
    }

    const result = await getProductsById(event)
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(JSON.stringify(product))
  })

  it("validate if product is not found", async () => {
    const event = {
      pathParameters: {
        productId: "1",
      },
    }

    const result = await getProductsById(event)
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(
      JSON.stringify({
        message: "Product not found",
      })
    )
  })
})
