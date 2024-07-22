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

- **🔐 Autenticación:** Para acceder a los endpoints, necesitas un token de autenticación. Puedes obtenerlo en la mutacion  `signIn` del esquema GraphQL.
- **🔑 Autorización:** Para acceder a los endpoints, necesitas un rol específico. Puedes ver los roles disponibles en la documentación.
- **📦 Dependencias:** Este proyecto usa `pnpm` como gestor de paquetes. Si prefieres usar `npm` o `yarn`, puedes cambiarlo en el archivo `package.json`.
- **📂 Estructura de Carpetas:** La estructura de carpetas está basada en el patrón de diseño `Domain-Driven Design (DDD)`.
- **📝 Documentación:** La documentación de este proyecto está escrita en Markdown y se encuentra en la raíz del proyecto.
- ** GraphQL Playground:** Puedes acceder a la interfaz de GraphQL Playground en `http://localhost:3000/graphql`  y en  `http://localhost:3000/graphiql` para ver la documentación y probar los endpoints.
- ** Al momento de crear un nuevo modulo o componente, recuerda agregarlo al archivo `app.module.ts` para que sea reconocido por la aplicación.
