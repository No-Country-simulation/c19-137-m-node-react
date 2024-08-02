# Usuarios API

La API de usuarios describe las operaciones que se pueden realizar sobre los usuarios.


## followUser

Esta mutación permite seguir a un usuario.

```graphql
mutation followUser($followUserId: ID!){
    followUser(followUserId: $followUserId) {
        id
        nickName
        email
        profileImage {
            id
            fileName
            hashName
            url
        }
    }
}
```


**Variables de Ejemplo:**

```json
{
    "followUserId": "5f5e2b3b7f3b9b001f2b3b9b"
}
```

## unfollowUser

Esta mutación permite dejar de seguir a un usuario.

```graphql
mutation unfollowUser($followUserId: ID!){
    unfollowUser(followUserId: $followUserId) {
        id
        nickName
        email
        profileImage {
            id
            fileName
            hashName
            url
        }
    }
}
```
