# Medios API

La API de medios permite subir archivos multimedia al sistema, con la opción de convertirlos a base64.



### UploadMedia
Esta mutación permite subir un archivo de medios al sistema, con la opción de convertirlo a base64.

```graphql
mutation UploadMedia($file: Upload!, $convertToBase64: Boolean) {
    uploadMedia(file: $file, convertToBase64: $convertToBase64) {
        code,
        message,
        success,
        media {
            hashName
            fileName
            mimeType
            base64
            type
            url
            createdAt
            updatedAt,
            base64
        }
    }
}
```

**Variables de Ejemplo:**
```json
{
  "file": "archivo_de_ejemplo.jpg",
  "convertToBase64": true
}
```