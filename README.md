# Proyecto Bob's Corn 🌽

## Descripción

Este proyecto es una aplicación para gestionar la compra y venta de maíz. Incluye un límite de tasa de compra y una interfaz de usuario para que los clientes puedan comprar maíz fácilmente.

## Requisitos

- Node.js
- npm
- PostgreSQL

## Instalación

Sigue estos pasos para configurar y ejecutar la aplicación:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/nitovill/Bob-s-corn.git
2. En directorio del backend:

  ```bash
  cd Back
3. Instala las dependencias:

  ```bash
  npm install
4. Configura la base de datos:

Renombra el archivo .env.example a .env:

Abre el archivo .env y actualiza DATABASE_URL con tu usuario y contraseña de PostgreSQL:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb?schema=public"
5. Ejecuta las migraciones de la base de datos con Prisma:

  ```bash
  npx prisma migrate dev --name init

6. Inicia el servidor de desarrollo:

  ```bash
  npm run dev

7. Cambia al directorio del frontend:

  ```bash
  cd ../my-app
8. Instala las dependencias:

  ```bash
  npm install
9. Inicia el servidor de desarrollo del frontend:

  ```bash
  npm run dev
