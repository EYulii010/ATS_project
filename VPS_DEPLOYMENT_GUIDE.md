# 🚀 Guía Maestra de Despliegue en VPS (Ubuntu 22.04 / 24.04)

Este documento contiene las instrucciones literales de comando a comando para encender tu clúster de producción con Docker Swarm / Compose en un Servidor Privado Virtual (DigitalOcean, AWS EC2, Contabo, etc).

## 0. Requisitos de Infraestructura
- Un servidor Ubuntu con al menos **2 RAM / 2 vCPU**.
- Dominio DNS apuntando al servidor (Ej: Registro `A` de `api.tu-ats.com` hacia la IP `198.51.x.x`).
- Instancia externa de PostgreSQL administrada activa (Ej: RDS, Supabase, Neon) para salvaguardar tu base de datos si el VPS es destruido.

---

## 1. Instalación Inicial en el Servidor (SSH)
Entra a tu servidor como Root e instala Docker:

```bash
# Actualizar el sistema e instalar Docker Oficial
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

---

## 2. Preparar el Entorno del Aplicativo
Clona el repositorio utilizando Deploy Keys o HTTPS (si es público):

```bash
git clone https://github.com/TUREPO/ATS_project.git /opt/ats_project
cd /opt/ats_project
```

Crea tu archivo `.env` basado en el `.env.prod.example`:
```bash
cp .env.prod.example .env
nano .env # (Edita y coloca TODAS tus LLAVES y URIs reales de RDS Postgres)
```

---

## 3. Preparando Traefik (HTTPS Automático)
Traefik requiere un archivo `.json` vacío pero con permisos súper estrictos para escribir los certificados SSL mágicamente desde Let's Encrypt.

```bash
mkdir -p letsencrypt
touch letsencrypt/acme.json
chmod 600 letsencrypt/acme.json
```

Abre `docker-compose.prod.yml` y edita la línea del email de Traefik para Let's Encrypt:
```yml
# Descomenta y cambia esto en tu docker-compose.prod.yml
- "--certificatesresolvers.myresolver.acme.email=admin@tu-ats.com"
```

---

## 4. Encendiendo el Clúster de Producción

Ejecuta el siguiente comando para levantar tu SaaS al aire libre:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

**Verificar Salud:**
Revisa que el *Proxy* capturó los dominios y está emitiendo SSL:
```bash
docker-compose -f docker-compose.prod.yml logs -f reverse-proxy
```

¡Listo! A partir de aquí tus candidatos y reclutadores interactuarán bajo `https://api.tu-ats.com`.
