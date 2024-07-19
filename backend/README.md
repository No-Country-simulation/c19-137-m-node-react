## Funcionamiento RBAC (Role-based Access Control)

Para usar, colocar `@roles(Role.[NOMBRE DEL ROLE])` antes de el endpoint deseado.

Roles disponibles:

`LECTOR = "user",
MODERADOR = "admin",
EDITORIAL = "editorial"`
Texto en mayusculas es el nombre de la variable en el enum.
Texto en comillas es como debe ir el texto en la base de datos

Ejemplo de implementacion:
`@Roles(Role.MODERADOR)`