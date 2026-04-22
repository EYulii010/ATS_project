# 🚀 Guía para el Equipo de Frontend — Applik ATS

> **Para:** Desarrollador(a) Frontend  
> **Estado del Backend:** ✅ Desplegado y operativo en producción  
> **URL Base:** `https://api.applik-ni.com`

---

## 1. Configuración del Entorno Local

Crea un archivo `.env.local` en la raíz de tu proyecto frontend:

```env
NEXT_PUBLIC_API_URL=https://api.applik-ni.com
```

> **Nota:** Si quieres apuntar al backend local durante desarrollo, cambia a `http://localhost:3001` (auth), `http://localhost:3003` (jobs), `http://localhost:3002` (talents). Pero lo recomendado es apuntar siempre a producción.

---

## 2. Cuenta de Prueba ya creada en DB de Producción

```
Email:     admin@applik.com
Password:  Password123!
Empresa:   Applik Corp (Tenant ID: 1)
Rol:       admin
```

---

## 3. Mapa de Endpoints del API

### 🔐 Auth Service — `BASE_URL/api/v1/auth`

#### Registrar Organización (Solo primera vez)
```http
POST /api/v1/auth/organizations/register
Content-Type: application/json

{
  "businessName": "Nombre Empresa",
  "RUC": "J0000000000001",
  "adminEmail": "admin@empresa.com",
  "password": "Password123!",
  "first_name": "Admin",
  "last_name": "Principal",
  "law_787_accepted": true
}
```
**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "tenant_id": 1,
    "admin_id": 1,
    "token": "eyJhbGci..."
  }
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@applik.com",
  "password": "Password123!"
}
```
**Respuesta exitosa:** Devuelve `token` JWT. **Guárdalo en localStorage o una cookie segura.**

#### Obtener datos del usuario logueado
```http
GET /api/v1/auth/me
Authorization: Bearer <token>
```

#### Invitar nuevo reclutador
```http
POST /api/v1/auth/invitations/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "reclutador@empresa.com",
  "role": "recruiter"
}
```

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

---

### 💼 Job Service — `BASE_URL/api/v1/jobs`

#### Listar vacantes de la empresa
```http
GET /api/v1/jobs
Authorization: Bearer <token>
```

#### Crear vacante
```http
POST /api/v1/jobs
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Desarrollador Backend Node.js",
  "description": "Descripción del puesto...",
  "department_id": 1,
  "salary_min": 1500.00,
  "salary_max": 2500.00,
  "currency": "USD"
}
```
**Respuesta:** Incluye `public_token` (UUID) para el link público de postulación.

#### Publicar / Despublicar vacante
```http
PATCH /api/v1/jobs/:id
Authorization: Bearer <token>
Content-Type: application/json

{ "status": "published" }   // o "draft" para despublicar
```

#### Crear departamento
```http
POST /api/v1/jobs/departments
Authorization: Bearer <token>
Content-Type: application/json

{ "name": "Ingeniería Backend" }
```

---

### 👤 Talent Service — `BASE_URL/api/v1/talents`

#### Postulación pública de candidato (sin autenticación)
```http
POST /api/v1/talents/public/apply
Content-Type: application/json

{
  "rawCvText": "Texto del CV del candidato...",
  "jobToken": "uuid-del-public-token-de-la-vacante",
  "law787Accepted": true
}
```
> Este endpoint NO requiere JWT. Es el formulario público de postulación.

#### Actualizar estado del candidato en el pipeline
```http
PATCH /api/v1/talents/applications/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "newStatus": "entrevista"
}
```
**Estados válidos:** `postulado` | `revisando` | `entrevista` | `rechazado` | `contratado`

---

## 4. Ejemplo de llamada con fetch (React)

```javascript
// utils/api.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { token, ... }
};

export const getJobs = async (token) => {
  const res = await fetch(`${BASE_URL}/api/v1/jobs`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
};
```

---

## 5. Despliegue en Cloudflare Pages (React + Vite)

> ✅ **Recomendado:** Como el dominio ya está en Cloudflare, el subdominio `app.applik-ni.com` se configura automáticamente con 1 clic. ¡Sin DNS manual!

### Configuración de variables de entorno en Vite
Crea el archivo `.env.production` en la raíz del proyecto frontend:
```env
VITE_API_URL=https://api.applik-ni.com
```

Y en tu código React, úsala así:
```javascript
const BASE_URL = import.meta.env.VITE_API_URL;
```

### Paso 1: Conectar en Cloudflare Pages
1. Ve a [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages → Create a project**
2. Selecciona **Connect to Git** → conecta GitHub
3. Elige el repositorio `EYulii010/ATS_project`

### Paso 2: Configurar el Build
| Campo | Valor |
|-------|-------|
| Framework preset | **Vite** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `frontend` *(si está en subcarpeta)* |

### Paso 3: Variables de Entorno
En la sección **Environment Variables (production)**:
```
VITE_API_URL = https://api.applik-ni.com
```

### Paso 4: Deploy y Dominio
1. Dale clic a **Save and Deploy** 🚀
2. Una vez desplegado, ve a **Custom Domains → Set up a custom domain**
3. Escribe: `app.applik-ni.com`
4. Cloudflare lo detecta automáticamente (ya tienes el dominio ahí) y crea el registro DNS solo. ✅

### Resultado Final
- 🟠 **Frontend:** `https://app.applik-ni.com` → Cloudflare Pages (auto-deploy)
- 🔵 **Backend:** `https://api.applik-ni.com` → VPS DigitalOcean (Traefik + Docker)

### Flujo del día a día (sin tocar servidores)
```bash
# Editas código → haces push → Cloudflare Pages despliega solo en ~30 segundos
git add .
git commit -m "Feature: nueva pantalla de login"
git push origin main
# ✅ Listo. Sin Docker, sin SSH, sin servidores.
```

---

## 6. CORS

El backend ya está configurado con CORS abierto (`origin: '*'`). No tendrás problemas de cross-origin desde `app.applik-ni.com` hacia `api.applik-ni.com`.

---

## 7. Contacto Backend

Cualquier duda sobre los endpoints o datos de prueba, coordina con el equipo de backend. El ambiente de producción está completamente operativo y la base de datos ya tiene datos semilla.

**Última actualización:** Abril 2026
