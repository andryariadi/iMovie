# Brand App API Docs

## Models

### - User

```js
- id : uuid
- email : (validation: required => unique => email formate)
- password : (validation: required => length min 5 charachter)
- role : string
```

### - Wishlist

```js
- UserId : uuid
- title : string (validation: required)
- description : string (validation: required)
- price : integer (validation: required => min price(bebas))
- imgUrl: string (validation: required)
```

## Enpoints

### List avaliable endpoint

- GET /register
- GET /login
- GET /google-login

- GET /movies
- GET /movies/id
- GET /wishlist
- POST /wishlist
- PUT /wishlist/:id
- POST /mymovies
- POST /payment

## POST /register

### Description

- Create a user default admin

### Request:

- Body

```js
{
    "email": String,
    "passwaord": String,
}
```

### Response (201: Created)

- Body

```js
   "id": integer,
    "email": String,
```

### Response (400: Bad Request)

- Body

```js
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email must be unique"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Minimum password 5 charachters"
}
```

## POST /login

### Description

- Post a login user

### Request:

- Body

```js
{
    "email": String,
    "passwaord": String,
}
```

### Response (200: OK)

- Body

```js
   "access_token": stirng,
```

### Response (400: Bad Request)

- Body

```js
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

### Response (401 - Unauthorized)

- Body

```js
{
  "message": "Invalid email/password"
}
```

## POST /google-login

### Description

- Post login google a user default role staff

### Request:

- Headers

```js
{
  "credential": Stirng
}
```

### Response (200 - OK)

- Body

```js
{
    "access_token": String,
    "username": String,
    "email": String,
    "passwaord": String,
    "phoneNumber": String,
    "address": String,
}
```

## GET /movies

### Description

- Get all the movies data

### Response (200 - OK)

- Body

```js
{
    "statusCode": 200,
    "data": [
        {
          "id": Integer,
          "title": String,
          "description": String,
          "imgUrl": String,
          "price": Integer,
        }
    ]
}
```

## GET /movies/:id

### Description

- Get detail movie data

### Response (200 - OK)

- Body

```js
{
    "statusCode": 200,
    "data": [
        {
          "id": Integer,
          "title": String,
          "description": String,
          "imgUrl": String,
          "price": Integer,
        }
    ]
}
```

### Response (404 - Bad Request)

- Body

```js
{
    "statusCode": 404,
    "error": {
     "message": " Movie id ${id} not found"
    }
}
```

## POST /wishlist

### Description

- Create a new wishlist data

### Request

- Headers

```js
{
   "access_token": String
}
```

- Body

```js
{
   "id": Integer,
    "title": String,
    "description": String,
    "imgUrl": String,
    "price": Integer,
}
```

### Response (201 - Created)

- Body

```js
{
    "statusCode": 201,
    "message": "Wishlist created successfully"
    "data": {
    "id": Integer,
    "UserId": Integer,
    "title": String,
    "description": String,
    "imgUrl": String,
    "price": Integer,
    }
}
```

### Response (400 - Bad Request)

- Body

```js
{
    "statusCode": 400,
    "error": {
     "message": String
    }
}
```

## GET /wishlist

### Description

- Get all the wishlist data

### Request

- Headers

```js
{
   "access_token": String
}
```

### Response (200 - OK)

- Body

```js
{
    "statusCode": 200,
    "data": [
        {
           "id": Integer,
           "UserId": Integer,
           "title": String,
           "description": String,
           "imgUrl": String,
           "price": Integer,
        }
    ]
}
```

## PUT /wishlist/:id

### Description

- update status in data wishlist

### Request

- Headers

```js
{
   "access_token": String
}
```

- Params

```js
{
   "id": Integer
}
```

- Body

```js
{
    "status": String,
}
```

### Response (201 - Created)

- Body

```js
{
    "statusCode": 201,
    "message": "wishlist with id updated"
    "data": {
      "id": Integer,
      "status": String,
    }
}
```

## GET /mymovies

### Description

- Get all the mymovies data

### Request

- Headers

```js
{
   "access_token": String
}
```

### Response (200 - OK)

- Body

```js
{
    "statusCode": 200,
    "data": [
        {
           "id": Integer,
           "UserId": Integer,
           "title": String,
           "description": String,
           "imgUrl": String,
           "price": Integer,
        }
    ]
}
```

### Response (400 - Bad Request)

- Body

```js
{
    "statusCode": 400,
    "error": {
     "message": String
    }
}
```

## Global Error

### Response (401 - Unauthorized)

- Body

```js
{
    "statusCode": 401,
    "error": {
     "message": "Invalid token"
}
}
```

### Response (500 - Internal Server Error)

- Body

```js
{
    "statusCode": 500,
    "error": {
     "message": "Internal Server Error"
    }
}
```
