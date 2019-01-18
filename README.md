## packages explained

> - **apollo-server-express**: used to create easier graphQL schemas with "typeDefs"
> - **bcryptjs**: for hashing passwords
> - **esm**: allows for "import" and "export" syntax in NodeJS
> - **express**: To run a server
> - **express-session**: For handling sessions
> - **graphql**: For fetching data from mongoDB. Mostly used because I want to practice using graphql.
> - **joi**: for validating user requests on the backend.
> - **mongoose**: used to connect to the mongoDB server hosted on mLabs.com

## example queries

Below are some examples that may be used in the graphql playground
_localhost.com:5000/graphql by default_

### query:

> fetch all users

```
  query {
    users {
      username,
      email
    }
  }
```

> fetch a user by id

```
query {
  user(id:"5c40ba7c940e867eb50687ff") {
    username,
    email,
    createdAt,
    score
  }
}
```

### mutations:

> Create a new user

```
mutation {
  signUp(email: "email@test.com", username: "test", password: "secret") {
    id,
    email,
    username,
    createdAt
  }
}
```
