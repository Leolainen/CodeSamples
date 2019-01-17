mutations:

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

**Above returns:**

```
{
  "data": {
    "signUp": {
      "id": "5c409ad59f0c7f77fa327be9",
      "email": "email@test.com",
      "username": "test",
      "createdAt": "1547737813470"
    }
  }
}
```
