# Autenticación API

La API de autenticación permite a los usuarios registrarse, iniciar sesión, solicitar un correo de recuperación de
contraseña y restablecer su contraseña.

Al realizar la autenticacion, con el campo `SignIn` se obtiene un token que se debe enviar en el header de las
peticiones para poder acceder a las rutas protegidas.

### Login

Esta mutación permite a un usuario iniciar sesión en el sistema.

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
    "email": "yeimar-67868ss68868@gmail.com",
    "firstName": "YEIMAR",
    "lastName": "LEMUS",
    "nickName": "usneimar",
    "password": "12345678",
    "passwordConfirmation": "12345678"
  }
}
```

### Olvide mi contraseña

Esta mutación permite a un usuario solicitar un correo de recuperación de contraseña.

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