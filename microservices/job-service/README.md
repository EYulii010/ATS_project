# Job Service 💼

El motor administrativo del ciclo de vida de los empleos y los equipos organizacionales. Controla la estructura fundamental antes de que un Candidato sea capaz de postularse.

## 🚀 Puntos de Acceso Principales (Endpoints)

Todas las rutas requieren Middleware de autenticación (Excepción: Las rutas `/public/`).

| Método | Endpoint | Contexto de Uso |
| :--- | :--- | :--- |
| `POST` | `/api/v1/jobs/departments` | Crea un departamento organizacional de la empresa. |
| `POST` | `/api/v1/jobs` | Genera una nueva Vacante en estado "Borrador" (`draft`). |
| `PATCH` | `/api/v1/jobs/:id` | Modifica una Vacante, por ejemplo para publicarla (`published`). |
| `GET` | `/api/v1/jobs/public/:token` | **Endpoint Público:** Valida y devuelve metadata de una vacante sin necesidad de JWT al usando un public UUID.  (Usado por el módulo Talent-Service). |

---

## 🔄 Flujo de Estados de Vacante
Cuando una vacante nace, su estado es **`draft`**. Mientras sea borrador, la vacante oculta su `public_token` y rechaza conexiones del Talent Service. Para activar la cascada de reclutamiento, debe enviarse la orden de transición a estado **`published`**.
