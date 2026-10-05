# VitaLink — Frontend del Sprint 2

Aplicación académica desarrollada con Vue 3, JavaScript, PrimeVue Material, Pinia, Vue Router, Vue I18n, Axios y JSON Server. La información se obtiene desde un servicio REST local.

## Requisitos

- Node.js 22.12 o superior.
- npm.
- Dos terminales: una para JSON Server y otra para Vite.

## Instalación

```sh
npm install
```

## Ejecución

Primera terminal, desde la raíz del proyecto, para iniciar la aplicación Vue:

```sh
npm run dev
```

Segunda terminal, desde la raíz del proyecto, para iniciar la API REST local:

```sh
cd server
sh start.sh
```

La API queda disponible en `http://localhost:3000`.

Si el puerto 5173 está ocupado:

```sh
npm run dev -- --port 5174
```

La dirección de la API se configura en `.env.development` y `.env.production`. Las rutas visibles usan hash history para funcionar en hosting estático.

## Compilación

```sh
npm run build
npm run preview
```

## Alcance del Sprint 2

TS-02, US-07, US-08, US-09, US-10, US-13, US-21, US-23, US-28, US-33 y TS-05.

Incluye panel profesional, alertas, pacientes asignados, detalle, historial, responsables, panel familiar, seguimiento de casos, preferencias, inglés y español, diseño responsive y la ruta inicial del adulto mayor.

## Servidor local

`server/db.json` contiene los recursos `patients`, `alerts`, `records` e `interventions`. `server/routes.json` expone los recursos bajo `/api/v1`. La aplicación los consume por HTTP mediante Axios.

Los estados vacíos y de error se presentan desde las vistas correspondientes cuando el servicio no entrega información utilizable.

## Límites

- La selección de rol no es autenticación.
- JSON Server funciona como servicio REST local y no implementa autorización.
- No hay diagnósticos, monitoreo en vivo, mensajería, registro clínico real ni envío de notificaciones.
- Las preferencias se guardan en el navegador.
- No se realizó despliegue público.
- No se ejecutaron comandos Git ni se modificó el informe.

Consulta `CHANGELOG.md` para el historial y `docs/SPRINT-2-COVERAGE.md` para la cobertura funcional.
