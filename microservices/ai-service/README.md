# AI Service 🧠

El oráculo semántico del sistema. Micro-motor autónomo encargado enteramente de comunicarse con infraestructuras Large Language Models (LLM) —actualmente Google Gemini 2.5— para orquestar la conversión de Currículums en formato crudo hacia JSON esquematizado.

⚠️ **Desconectado del Internet Público**:
Este servicio vive oculto tras las defensas del Ecosistema Docker. Los usuarios externos no pueden atacar este servicio; recibe peticiones estrictamente desde la subred aislada del **Talent Service**.

## 🚀 Puntos de Acceso Principales (Endpoints)

| Método | Endpoint | Payload Interno (Desde Talent) | Acción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/cv/ingest-cv` | `{"cvText": "..."}` | Lanza una tarea intensiva al modelo fundacional y devuelve Estructura de Datos parseada eliminando *blabla* generativo. |

---

## 🛠 Parsing Agresivo
El microservicio es resiliente, es capaz de abstraer todo el relleno humano de los modelos de Gemini y encapsular puramente la sintaxis JSON desde el inicio `{` hasta el final `}` asegurando compatibilidad estricta con Backend de tipado fuerte.

### 🔑 Secretos Fundamentales
- `GEMINI_API_KEY`: Debe ser inyectada con un Token de Google AI / Vertex válido.
