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
  postSample(
    title:"testing graphql 4",
    codeSample:"<h1>Testing graphql refactor 4</h1>",
    description: "description here",
    languages: ["JavaScript", "HTML"],
    frameworks: ["React"])
    {
      id,
      userId,
      username,
      title,
      codeSample,
      description,
      frameworks {
        framework
      },
      languages {
        language
      },
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
    codeSample,
    description,
    likes,
    edited,
    frameworks {
      framework
    },
    languages {
      language
    },
  }
}
```

> fetch a sample by its ID

```
query {
  sampleById(id:"5c68d1fa3c4eb00296893a8e") {
    id,
    userId,
    username,
    title,
    codeSample,
    frameworks {
      framework
    },
    languages {
      language
    },
  }
}
```

> fetch an array of samples that match the query arguments
> Available arguments at the moment are:
>
> - username
> - userid
> - title

```
query {
  samples(username: "testuser") {
    id,
    userId,
    likes,
    username,
    title,
    codeSample,
    frameworks {
      framework
    },
    languages {
      language
    },
  }
}
```

> Like a codeSample

```
mutation {
  like(id:"5c56c4d9c2563e00f069b91f") {
    id,
    userId,
    username,
    title,
    codeSample,
    likes
  }
}
```

> Update a codeSample

```
mutation {
  update(id: "5c56b82c5d8f66005a5a2702", title:"second edited sample" ) {
    id,
    userId,
    username,
    title,
    likes,
    codeSample,
  }
}
```

> Get all frameworks

```
query {
  allFrameworks {
    codeSampleId,
    framework
  }
}
```

> Add a framework

```
mutation {
  addFramework(codeSampleId: "5c56b82c5d8f66005a5a2702", framework: "react") {
    codeSampleId,
    framework
  }
}
```

> Get all languages

```
query {
  allLanguages {
    codeSampleId,
    language
  }
}
```

> Add a language

```
mutation {
  addLanguage(codeSampleId: "5c56b82c5d8f66005a5a2702", language: "JavaScript") {
    codeSampleId,
    language
  }
}
```

> all comments

```
query {
  allComments{
    id,
    codeSampleId,
    comment,
    username,
    likes,
    edited,
    date
  }
}
```

> post new comment

```
mutation {
  postComment(userId: "5c41f7e4e0ef9daa700688fb",
    codeSampleId: "5c56b82c5d8f66005a5a2702",
    comment: "this is a comment") {
      id,
      userId,
      username,
      codeSampleId,
      likes,
      comment,
      edited,
      date
  }
}
```

> fetch all comments

```
query {
  allComments {
    id,
    userId,
    username,
    codeSampleId,
    likes,
    comment,
    edited,
    date
  }
}
```

> fetch comment either by userId or codeSampleId

```
query {
  comments(codeSampleId: "5c56b82c5d8f66005a5a2702") {
      id,
      userId,
      username,
      codeSampleId,
      likes,
      comment,
      edited,
      date
  }
}
```

> update comment

```
mutation {
  updateComment(id: "5c63cb5acbdbbd0281e4beb1", comment: "updated comment") {
    id,
      userId,
      username,
      codeSampleId,
      likes,
      comment,
      edited,
      date
  }
}
```

> like a comment

```
mutation {
  likeComment(id: "5c63cb5acbdbbd0281e4beb1") {
    id,
      userId,
      username,
      codeSampleId,
      likes,
      comment,
      edited,
      date
  }
}
```

> delete comment

```
mutation {
  deleteComment(id: "5c63cb5acbdbbd0281e4beb1") {
    id,
      userId,
      username,
      codeSampleId,
      likes,
      comment,
      edited,
      date
  }
}
```
