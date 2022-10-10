## Serverless commands

```
serverless create --template aws-nodejs --path shop-react --name shop-react
serverless invoke local --function hello
serverless invoke local --help
serverless deploy
serverless remove
serverless invoke --function hello
serverless invoke --function hello --log
```

### Task 3

Task 3

Frontend:

Updated URLs for populating product list page and uploaded latest build on S3
Cloudfront URL: https://d3f9e6qw8hvide.cloudfront.net/
Backend:

endpoints:
GET - https://9ymgkwpwti.execute-api.us-east-1.amazonaws.com/dev/products
GET - https://9ymgkwpwti.execute-api.us-east-1.amazonaws.com/dev/products/{productId}

functions:
getProductsList: shop-backend-dev-getProductsList
getProductsById: shop-backend-dev-getProductsById
