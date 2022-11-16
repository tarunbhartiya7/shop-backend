module.exports.basicAuthorizer = async (event) => {
  console.log("event", JSON.stringify(event))

  try {
    const { headers, methodArn } = event
    if (!headers.Authorization) {
      return generateAuthResponse("user", "Deny", methodArn)
    }
    const authorizationToken = headers.Authorization
    const encodedCreds = authorizationToken.split(" ")[1]
    const buffer = Buffer.from(encodedCreds, "base64")
    const plainCreds = buffer.toString("utf-8").split(":")
    const username = plainCreds[0]
    const password = plainCreds[1]
    const storedUserPassword = process.env[username]

    console.log("plainCreds", plainCreds)
    console.log("storedUserPassword", storedUserPassword)
    console.log("password", password)

    if (!password || storedUserPassword !== password) {
      return generateAuthResponse("user", "Deny", methodArn)
    }

    return generateAuthResponse("user", "Allow", methodArn)
  } catch (error) {
    throw new Error(error.message)
  }
}

function generateAuthResponse(principalId, effect, methodArn) {
  const policyDocument = generatePolicyDocument(effect, methodArn)

  return {
    principalId,
    policyDocument,
  }
}

function generatePolicyDocument(effect, methodArn) {
  if (!effect || !methodArn) return null

  const policyDocument = {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: methodArn,
      },
    ],
  }

  return policyDocument
}
