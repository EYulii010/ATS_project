# Auth Service 🔐

El Guardián Principal del Ecosistema. Este microservicio controla el ingreso a toda el ATS y se encarga de forzar el modelo fundamental de B2B **Multi-Tenancy** (Múltiples empresas).

## 🚀 Puntos de Acceso Principales (Endpoints)

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Registra una nueva empresa. Valida el número de identificación tributaria y engendra el primer super admin "Tenant". |
| `POST` | `/api/v1/auth/login` | Inicia sesión del administrador y emite un JWT que será utilizado por todos los otros microservicios. |

---

## 🔒 Estructura del JWT
El token JWT firmado por el `auth-service` y enviado en el *Header* viaja a todos los otros servicios, conteniendo:
```json
{
  "user_id": 1,
  "role": "admin",
  "company_id": 15,
  "active_subscription": true
}
```

## 🧊 Variables de Entorno y Seguridad
- **`JWT_SECRET`**: Clave criptográfica para estampar tokens. Debe ser colosal en Producción.
- **`AUTH_DB_PEPPER`**: Sistema de cifrado de contraseñas de bcrypt para inyectar "pepper" como un factor de aislamiento criptográfico avanzado.
