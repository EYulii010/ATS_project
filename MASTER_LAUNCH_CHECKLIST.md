# 🚀 Lista Maestra de Lanzamiento (Zero to Production)

Este documento es tu lista de verificación personal. Marca cada casilla (cambiando `[ ]` por `[x]`) conforme vayas completando los pasos para llevar tu ATS al mundo real.

## Fase 1: Consolidación (En tu PC)
- [ ] Asegúrate de estar en tu rama actual (donde los tests E2E y el servidor pasaron exitosamente).
- [ ] Ejecuta `git add .` y `git commit -m "feat: Ecosistema ATS listo para Producción VPS"`.
- [ ] Cambia de rama a `main` con `git checkout main`.
- [ ] Mezcla tu rama actual con `git merge tu-rama-actual`.
- [ ] Sube todo a la nube con `git push origin main`.

## Fase 2: Compras e Infraestructura Externa
- [ ] **Comprar Dominio:** Adquiere tu dominio (Ej: `tu-ats.com`) en tu proveedor favorito (GoDaddy, Namecheap, Google Domains).
- [ ] **Comprar Servidor (VPS):** Entra a DigitalOcean, AWS o Contabo y alquila un VPS basado en **Ubuntu 24.04** (Mínimo 2GB de RAM).
- [ ] **Anotar IP Pública:** Cuando el VPS esté creado, copia la "IP Address" pública que te da el proveedor.
- [ ] **Configurar DNS Backend:** En tu proveedor de dominio, crea un registro DNS de tipo `A`, llamado `api`, y pégale la IP pública de tu VPS.
- [ ] **Configurar DNS Frontend (Opcional por ahora):** Crea un registro secundario llamado `app` apuntando vacío por ahora, o espérate a Vercel.

## Fase 3: Aprovisionar el "Backend Server"
*(Sigue las instrucciones técnicas exactas de `VPS_DEPLOYMENT_GUIDE.md` a la par de esto)*

- [ ] Abre tu terminal y entra por SSH al VPS. (`ssh root@ip_del_vps`)
- [ ] Instala `Docker` y `Docker Compose` en el VPS.
- [ ] Instala o usa una DB de Postgres externa e ingresa las credenciales de host seguro.
- [ ] Clona tu reporsitorio desde GitHub en el VPS.
- [ ] Crea tu archivo `.env` utilizando de molde el `.env.prod.example`. Inyecta todos tus secretos finales.
- [ ] Ajusta el email de Traefik para SSL en `docker-compose.prod.yml`.
- [ ] Corre el comando atómico: `docker-compose -f docker-compose.prod.yml up --build -d`.
- [ ] Espera un minuto y abre tu navegador en `https://api.tu-ats.com/api/v1/talents/estado`. Deberás ver el candadito verde de SSL (HTTPS).

## Fase 4: Frontend al Estrellato
- [ ] El desarrollador Frontend termina de conectar las pantallas de React/Next.js con el subdominio en local usando CORS correctos.
- [ ] Actualiza las variables de entorno del Frontend para que las URIs busquen a `https://api.tu-ats.com` en vez de a localhost.
- [ ] Sube el repositorio del Frontend a Vercel.
- [ ] Asocia el dominio personalizado en Vercel para que responda bajo `app.tu-ats.com`.
- [ ] ¡Registra a tu primera Empresa/Tenant desde el navegador usando HTTPS real!
