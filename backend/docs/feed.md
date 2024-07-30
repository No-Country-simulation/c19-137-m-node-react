# Feed API

La API de Feed permite a los usuarios consultar el feed de publicaciones y reseñas seguidas.

Para consultar el feed de un usuario, se debe especificar el ID del usuario en la consulta `feed`.

**Consulta:**

```graphql
query Feed($useId: ID!) {
    feed(userId: $useId) {
        ... on Post {
            id,
            title,
            content,
            media {
                id,
                url,
                type,
                filename,
                mimetype,
            }
        }
        ... on Review { 
            id,
            title,
            content,
            rating,
            media {
                id,
                url,
                type,
                filename,
                mimetype,
            }
        },
        followedBy {
            id,
            name,
            email,
            avatar {
                id,
                url,
                type,
                filename,
                mimetype,
            }
        }
    }
}

```

**Variables de Ejemplo:**

```json
{
  "userId": "1"
}
```
