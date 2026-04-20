# Talent Service 🎯

Este es el microservicio central de reclutamiento (ATS). Se encarga de procesar las postulaciones de candidatos y llevarlos a través del Pipeline, interactuando orgánicamente con el **Job Service** (para enlazar la vacante) y el **AI Service** (para la extracción semántica de datos del CV).

El microservicio está aislado arquitectónicamente, permitiendo que la subida de currículums masiva escale de forma independiente.

## 🚀 Puntos de Acceso Principales (Endpoints)

| Método | Endpoint | Middleware | Contexto de Uso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/talents/public/apply` | Público (`/public/`) | Endpoint masivo para que los candidatos suban su CV de manera anónima. Requiere `jobToken` UUID válido y texto crudo del CV. |
| `POST` | `/api/v1/talents/upload` | Middleware Auth/Tenant | Endpoint para que los reclutadores (internos) procesen currículos manuales (`jobId` + `JWT`). |
| `PATCH` | `/api/v1/talents/applications/:id/status` | Middleware Auth/Tenant | Modifica el estado del Candidato en el Pipeline (Ej: de 'Postulado' a 'Entrevista'). |

---

## 🏗 Integraciones y Puentes
Talent Service hace llamadas internas a dos microservicios complementarios:
1. **[Gateway Interno] AI Bridge:** Cuando un CV llega en texto crudo, se le pide al `ai-service` que construya un JSON esquematizado.
2. **[Gateway Interno] Job Bridge:** Antes de que un candidato aplique, Talent valida el UUID de la oferta preguntándole directo al `job-service`.

## 📦 Modelos Persistidos (Postgres)
- **CandidateProfile:** Datos nativos y de contacto.
- **WorkExperience & Education:** Entidades Uno-A-Muchos relacionadas al candidato.
- **Application:** La tabla asociativa final que encapsula la dupla `Candidato <-> Vacante`.

## 🔒 Variables de Entorno Propias

```env
# URL Privada del servicio de IA en Docker
AI_API_URL=http://applik_ai:3000/api/v1 
# URL Privada del servicio de Empleos en Docker
JOB_API_URL=http://applik_job:3003/api/v1
```
