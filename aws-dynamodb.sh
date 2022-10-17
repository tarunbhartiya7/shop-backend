# PRODUCTS

aws dynamodb put-item \
    --table-name products \
    --item '{
        "id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"},
        "description": {"S": "5.4-inch (13.7 cm diagonal) Super Retina XDR display"} ,
        "title": {"S": "Yphone 13 mini"},
        "price": {"N": "2400"}
      }'

aws dynamodb put-item \
    --table-name products \
    --item '{
        "id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"},
        "description": {"S": "6.1-inch (15.5 cm diagonal) Super Retina XDR display"} ,
        "title": {"S": "Yphone 12"},
        "price": {"N": "1500"}
      }'

aws dynamodb put-item \
    --table-name products \
    --item '{
        "id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"},
        "description": {"S": "6.1-inch (15.5 cm diagonal) Super Retina XDR display"} ,
        "title": {"S": "Yphone 13"},
        "price": {"N": "2200"}
      }'

aws dynamodb put-item \
    --table-name products \
    --item '{
        "id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"},
        "description": {"S": "6.1-inch (15.5 cm diagonal) Super Retina XDR display with ProMotion"} ,
        "title": {"S": "Yphone 13 Pro"},
        "price": {"N": "1800"}
      }'

aws dynamodb put-item \
    --table-name products \
    --item '{
        "id": {"S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2"},
        "description": {"S": "6.1-inch Super Retina XDR display with ProMotion"} ,
        "title": {"S": "Yphone 14 Pro"},
        "price": {"N": "2700"}
      }'

aws dynamodb put-item \
    --table-name products \
    --item '{
        "id": {"S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1"},
        "description": {"S": "6.1-inch Super Retina XDR display"} ,
        "title": {"S": "Yphone 14"},
        "price": {"N": "2500"}
      }'

# STOCKS

aws dynamodb put-item \
    --table-name stocks \
    --item '{
        "product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80aa"},
        "count": {"N": "2"}
      }'

aws dynamodb put-item \
    --table-name stocks \
    --item '{
        "product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a1"},
        "count": {"N": "0"}
      }'

aws dynamodb put-item \
    --table-name stocks \
    --item '{
        "product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73c48a80a3"},
        "count": {"N": "2"}
      }'

aws dynamodb put-item \
    --table-name stocks \
    --item '{
        "product_id": {"S": "7567ec4b-b10c-48c5-9345-fc73348a80a1"},
        "count": {"N": "2"}
      }'

aws dynamodb put-item \
    --table-name stocks \
    --item '{
        "product_id": {"S": "7567ec4b-b10c-48c5-9445-fc73c48a80a2"},
        "count": {"N": "0"}
      }'

aws dynamodb put-item \
    --table-name stocks \
    --item '{
        "product_id": {"S": "7567ec4b-b10c-45c5-9345-fc73c48a80a1"},
        "count": {"N": "2"}
      }'

