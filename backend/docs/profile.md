
# Perfil API

La API de perfil permite gestionar la foto de perfil y la imagen de portada del usuario, así como obtener detalles del perfil del usuario.

## setImageProfile

Esta mutación permite establecer la foto de perfil del usuario.

```graphql
mutation setImageProfile($data: SetProfileImageInput) {
  setProfileImage(data: $data) {
    code
    message
    success
    user {
      profileImage {
        id
        fileName
        hashName
        url
      }
    }
  }
}
```

**Variables de Ejemplo:**

```json
{
  "data": {
    "file": "nuevo_perfil.jpg"
  }
}
```

## SetCoverImage

Esta mutación permite establecer la imagen de portada del perfil del usuario.

```graphql
mutation SetCoverImage($mediaId: ID!) {
  setCoverImage(data: { mediaId: $mediaId }) {
    code
    message
    success
    user {
      coverImage {
        id
        hashName
        fileName
        url
      }
    }
  }
}
```

**Variables de Ejemplo:**

```json
{
  "mediaId": "123456"
}
```

## Profile

Esta consulta permite obtener los detalles del perfil del usuario, incluyendo libros, publicaciones, seguidores, y las imágenes de perfil y portada.

```graphql
query Profile {
  profile {
    firstName
    lastName
    email
    books {
      id
      name
      author {
        id
        firstName
        lastName
        bio
      }
    }
    posts {
      id
      title
      content
      createdAt
    }
    followers {
      id
      firstName
      lastName
    }
    coverImage {
      fileName
      hashName
      mimeType
      url
    }
    profileImage {
      fileName
      url
    }
  }
}
```

## Ejemplo de Respuesta

```json
{
  "data": {
    "profile": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "books": [
        {
          "id": "1",
          "name": "GraphQL for Beginners",
          "author": {
            "id": "a1",
            "firstName": "Alice",
            "lastName": "Smith",
            "bio": "Author and GraphQL enthusiast"
          }
        }
      ],
      "posts": [
        {
          "id": "p1",
          "title": "Understanding GraphQL",
          "content": "GraphQL is a query language for APIs...",
          "createdAt": "2024-01-01T00:00:00Z"
        }
      ],
      "followers": [
        {
          "id": "f1",
          "firstName": "Jane",
          "lastName": "Doe"
        }
      ],
      "coverImage": {
        "fileName": "cover.jpg",
        "hashName": "cover123",
        "mimeType": "image/jpeg",
        "url": "https://example.com/cover.jpg"
      },
      "profileImage": {
        "fileName": "profile.jpg",
        "url": "https://example.com/profile.jpg"
      }
    }
  }
}
```
