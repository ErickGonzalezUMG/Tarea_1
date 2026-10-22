# TecnoStore - Tarea 6 (Estrategias de despliegue con Docker)

Manual técnico e implementación de tres estrategias de despliegue con Docker, tomando como base el backend de TecnoStore (Tareas 4 y 5): **Recreate**, **Blue-Green** y **Canary**.

## Estudiante

| Nombre completo | Carné | Responsabilidades |
|---|---|---|
| Erick Enrique González Canel | 9490-20-2571 | Todo el trabajo: Dockerfile, imágenes versionadas, implementación y pruebas de las tres estrategias, y manual técnico |

## Enlaces

- Repositorio: https://github.com/ErickGonzalezUMG/Tarea_1
- Rama: Tarea6
- Informe técnico: `docs/Manual_Tecnico_Tarea6_Docker.docx`

## Contenido

```text
Tarea6/
├── backend/                  # API: código, Dockerfile y .dockerignore
├── blue-green/               # docker-compose.yml y nginx.conf (estrategia 2)
├── canary/                   # docker-compose.yml y nginx.conf (estrategia 3)
├── docs/                     # Manual técnico (informe)
├── .env.docker.example       # nombres de variables, sin valores secretos
└── README.md
```

La estrategia Recreate se ejecuta con comandos `docker run` (ver más abajo) y no necesita archivos adicionales.

## Requisitos

- Docker (Docker Desktop en Windows o macOS, con WSL 2 en Windows; en Linux, Docker Engine con el plugin Compose)
- Git

No hace falta instalar Node.js ni MongoDB: se ejecutan dentro de contenedores.

## Preparación

1. Clonar el repositorio y entrar a la carpeta:

```bash
git clone -b Tarea6 https://github.com/ErickGonzalezUMG/Tarea_1.git Tarea6
cd Tarea6
```

2. Crear el archivo de variables a partir del ejemplo y escribir una clave propia en `JWT_SECRET` (no se sube al repositorio):

```bash
# Windows
copy .env.docker.example .env.docker
# Linux / macOS
cp .env.docker.example .env.docker
```

3. Construir las dos versiones de la imagen:

```bash
docker build -t tecnostore-api:1.0.0 --build-arg VERSION=1.0.0 backend
docker build -t tecnostore-api:2.0.0 --build-arg VERSION=2.0.0 backend
```

La versión se identifica con el endpoint `GET /version`.

**Ejecutar un escenario a la vez**, porque comparten puertos.

## Estrategia 1: Recreate

Se detiene la versión actual y se crea la nueva. Hay un corte breve (aprox. 2 s en las pruebas).

```bash
docker network create tecnostore-net
docker run -d --name mongo --network tecnostore-net -v tecnostore-datos:/data/db mongo:7
docker run -d --name api --network tecnostore-net --env-file .env.docker -p 3000:3001 tecnostore-api:1.0.0
curl http://localhost:3000/version
```

Actualizar a la versión 2.0.0:

```bash
docker stop api
docker rm api
docker run -d --name api --network tecnostore-net --env-file .env.docker -p 3000:3001 tecnostore-api:2.0.0
```

Limpieza: `docker stop api mongo`, `docker rm api mongo`.

## Estrategia 2: Blue-Green

Dos entornos (Blue `1.0.0` y Green `2.0.0`) en ejecución y Nginx apuntando a uno. El cambio de versión es editar `blue-green/nginx.conf` (destino `api-blue` o `api-green` y la cabecera `X-Entorno`) y recargar Nginx.

```bash
cd blue-green
docker compose up -d
curl -i http://localhost:8080/version
# editar nginx.conf y luego:
docker compose exec nginx nginx -s reload
curl -i http://localhost:8080/version
docker compose down
```

## Estrategia 3: Canary

Nginx reparte el tráfico por peso: 9 partes para la versión estable (`1.0.0`) y 1 para el canario (`2.0.0`). Para promover, se deja solo `api-canary` en `canary/nginx.conf` y se recarga Nginx.

```bash
cd canary
docker compose up -d
for i in $(seq 1 100); do curl -s http://localhost:8080/version; echo; done | sort | uniq -c
docker compose exec nginx nginx -s reload   # después de editar nginx.conf
docker compose down
```

En PowerShell, la distribución se cuenta con:

```powershell
$v = 1..100 | ForEach-Object { curl.exe -s http://localhost:8080/version }
$v | Group-Object
```

## Seguridad

- No hay contraseñas, tokens ni cadenas de conexión en los Dockerfile, en los archivos de Compose ni en el repositorio.
- `.env` y `.env.docker` están excluidos con `.gitignore` y `.dockerignore`; solo se sube `.env.docker.example`, con los nombres de las variables.
- La base de datos de las pruebas es un contenedor local de MongoDB.