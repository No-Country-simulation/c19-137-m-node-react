## ❇️ Instrucciones

### 🔧 Instalación

1. 📂 Clona el repositorio.
2. 📦 Instala las dependencias con `pnpm install`.
3. 📝 Crea un archivo `.env` en la raíz del proyecto usando `.env.example` como guía.
4. 🚀 Ejecuta el servidor con `pnpm start:dev`.
5. 🌐 Accede a `http://localhost:3000` en tu navegador.
6. 🎉 ¡Listo!

### 🗄️ Base de Datos

Puedes usar cualquier base de datos que desees. Solo necesitas configurar las credenciales en el archivo `.env`.

### 📚 Documentación

#### 🔒 Como aplicar los roles en los campos de GraphQL

Para usar RBAC **(Role-Based Access Control)** en tu modulo de  NestJS, coloca `@Roles(Role.[NOMBRE_DEL_ROLE])` antes del endpoint deseado.

#### Roles Disponibles

- **📖 LECTOR:** `"user"`
- **🛡️ MODERADOR:** `"admin"`
- **🏢 EDITORIAL:** `"editorial"`

**Nota:** El texto en mayúsculas es el nombre de la variable en el enum. El texto entre comillas es cómo debe guardarse el texto en la base de datos.

#### Ejemplo de Implementación

Para permitir que solo los moderadores accedan a un endpoint, puedes usar:

```typescript
@Roles(Role.MODERADOR)
@UseGuards(AuthGuard, RolesGuard)
@Query(() => [Post])
findModeratorData() {
  // Tu lógica aquí
}
```

### 📝 Notas

- **🔐 Autenticación:** Para acceder a los endpoints, necesitas un token de autenticación. Puedes obtenerlo en la mutación `signIn` del esquema GraphQL.
- **🔑 Autorización:** Para acceder a los endpoints, necesitas un rol específico. Puedes ver los roles disponibles en la documentación.
- **📦 Dependencias:** Este proyecto usa `pnpm` como gestor de paquetes. Si prefieres usar `npm` o `yarn`, puedes cambiarlo en el archivo `package.json`.
- **📂 Estructura de Carpetas:** La estructura de carpetas está basada en el patrón de diseño `Domain-Driven Design (DDD)`.
- **📝 Documentación:** La documentación de este proyecto está escrita en Markdown y se encuentra en la raíz del proyecto.
- **GraphQL Playground:** Puedes acceder a la interfaz de GraphQL Playground en `http://localhost:3000/graphql` y en `http://localhost:3000/graphiql` para ver la documentación y probar los endpoints.
- Al momento de crear un nuevo módulo o componente, recuerda agregarlo al archivo `app.module.ts` para que sea reconocido por la aplicación.

### 🏃 Ejecutando con Docker

```sh
docker run -it --rm \
  -e DATABASE_HOST=localhost \
  -e DATABASE_USER=myuser \
  -e DATABASE_PASSWORD=mypassword \
  -e DATABASE_NAME=mydatabase \
  -e DATABASE_PORT=5432 \
  -e JWT_SECRET=myjwtsecret \
  -e JWT_EXPIRATION_TIME=3600s \
  socialmediabooksnocountry/c19-137-m-node-react-backend


```


### Explicación de Variables de Entorno

| Variable                | Descripción                                                                           |
|-------------------------|---------------------------------------------------------------------------------------|
| `URL`                   | Dirección base del servidor, por defecto `http://localhost:4000`.                      |
| `PORT`                  | Puerto en el que el servidor escucha, por defecto `4000`.                             |
| `FRONTEND_URL`          | Dirección del frontend, por defecto `http://localhost:3000`.                          |
| `MAIL_HOST`             | Host del servidor de correo, por ejemplo `sandbox.smtp.mailtrap.io`.                  |
| `MAIL_USER`             | Nombre de usuario para el servidor de correo.                                         |
| `MAIL_PASSWORD`         | Contraseña para el servidor de correo.                                                |
| `MAIL_FROM`             | Dirección de correo del remitente, por ejemplo `noreply@example.com`.                 |
| `MAIL_TRANSPORT`        | Configuración de transporte del correo, utilizando el usuario y contraseña.           |
| `DATABASE_HOST`         | Dirección del host de la base de datos.                                               |
| `DATABASE_USER`         | Nombre de usuario para acceder a la base de datos.                                    |
| `DATABASE_PASSWORD`     | Contraseña del usuario de la base de datos.                                           |
| `DATABASE_NAME`         | Nombre de la base de datos a la que se desea conectar.                                 |
| `DATABASE_PORT`         | Puerto en el que la base de datos escucha conexiones, por defecto `5432` para PostgreSQL. |
| `DATABASE_URL`          | URL completa de conexión a la base de datos.                                          |
| `JWT_SECRET`            | Secreto utilizado para firmar y verificar tokens JWT.                                  |
| `JWT_EXPIRATION_TIME`   | Tiempo de expiración de los tokens JWT, por ejemplo, `3600s` para 1 hora.              |

### 🌐 Colección de Postman

Puedes acceder a la colección de Postman en el siguiente enlace:

[Postman Collection](https://planetary-resonance-814490.postman.co/workspace/c19-137-m-node-react-Team~31f6c30b-dc4f-4d2b-ba4e-ef44a55e6839/collection/669680d63c1203dec98e6929?action=share&creator=14969501)




# Documentación de la API

## URL Base
`https://c19-137-m-node-react-backend.onrender.com/graphql`

### Login
Esta mutación permite a un usuario iniciar sesión en el sistema.

**GraphQL Endpoint:**
```
{{url}}/graphql
```

**Mutación:**
```graphql
mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
        code
        message
        success
        token
        expire_at
    }
}
```

**Variables de Ejemplo:**
```json
{
  "email": "yeimar112003@gmail.com",
  "password": "12345678"
}
```

### Registro
Esta mutación permite a un nuevo usuario registrarse en el sistema.

**GraphQL Endpoint:**
```
{{url}}/graphql
```

**Mutación:**
```graphql
mutation SignUp($data: CreateUserInput!) {
    signUp(data: $data) {
        code
        success
        message
        token
    }
}
```

**Variables de Ejemplo:**
```json
{
  "data": {
    "email": "orlandocardenas0107@gmail.com",
    "first_name": "Orlando",
    "last_name": "Cardenas",
    "nickname": "orlando",
    "password": "12345678",
    "password_confirmation": "12345678"
  }
}
```

### Olvide mi contraseña
Esta mutación permite a un usuario solicitar un correo de recuperación de contraseña.

**GraphQL Endpoint:**
```
{{url}}/graphql
```

**Mutación:**
```graphql
mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
        code
        success
        message
    }
}
```

**Variables de Ejemplo:**
```json
{
  "email": "yeimar112003@gmail.com"
}
```

### Cambiar contraseña
Esta mutación permite a un usuario restablecer su contraseña usando un token recibido por correo electrónico.

**GraphQL Endpoint:**
```
{{url}}/graphql
```

**Mutación:**
```graphql
mutation ResetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
        code,
        message,
        success
    }
}
```

**Variables de Ejemplo:**
```json
{
  "data": {
    "confirmNewPassword": "123456",
    "newPassword": "123456",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InllaW1hcjExMjAwM0BnbWFpbC5jb20iLCJzdWIiOiI3ZmUwYzg0MS1hMzQ0LTQxYzYtYjI3Yi04OTMzMTk2Mjk1ZGQiLCJpYXQiOjE3MjA5OTA4NjQsImV4cCI6MTcyMDk5NDQ2NH0.YTgw8I8Q8_Eldv8lqE_lzH5j-rHnaKwOHuQ4_8Ff81s"
  }
}
```
