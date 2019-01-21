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
_localhost.com:4000/graphql by default_

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

> fetch the currently signed in user

```
query {
  me {
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

> Sign in to an existing user account

```
mutation {
  signIn(password:"testpassword1", email:"testemail@email.com") {
    id, username, email
  }
}
```

> Sign out of a user account

```
mutation {
  signOut
}
```

> Post a new code sample

```
mutation {
  post(title:"First sample", language:["html", "react"], framework:[], codeSample:"<h1>hello world</h1>") {
    id,
    userId,
    username,
    title,
    language,
    framework,
    codeSample,
  }
}
```

> fetch all code samples

```
query {
  allSamples {
    id,
    userId,
    username,
    title,
    language,
    framework,
    codeSample,
  }
}
```

> fetch a sample by its ID

```
query {
  sampleById(id:"5c4348d5d57fc1bd32ed10f4") {
    id,
    userId,
    username,
    title,
    language,
    framework,
    codeSample,
  }
}
```

> fetch an array of samples that match the query arguments
> Available arguments at the moment are:
>
> - username
> - userid
> - title
>
> plans for future arguments are:
>
> - language
> - framework

```
query {
  samples(username: "testuser") {
    id,
    userId,
    username,
    title,
    language,
    framework,
    codeSample,
  }
}
```
