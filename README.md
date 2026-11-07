# VitaLink — Sprint 2 Frontend

Academic application built with Vue 3, JavaScript, PrimeVue Material, Pinia, Vue Router, Vue I18n, Axios, and JSON Server. Data is retrieved from a local REST service.

## Requirements

- Node.js 22.12 or later.
- npm.
- Two terminals: one for JSON Server and one for Vite.

## Installation

```sh
npm install
```

## Running

First terminal, from the project root, to start the Vue application:

```sh
npm run dev
```

Second terminal, from the project root, to start the local REST API:

```sh
cd server
sh start.sh
```

The API is available at `http://localhost:3000`.

If port 5173 is already in use:

```sh
npm run dev -- --port 5174
```

The API address is configured in `.env.development` and `.env.production`. Visible routes use hash history so they work on static hosting.

## Connecting to the development backend

1. Open the app at `http://localhost:5173/#/` (for example, `http://localhost:5173/#/professional/patients`). Do not use `127.0.0.1`: the Azure backend only allows `localhost`.
2. To use the Azure backend, copy `.env.development.local.example` to `.env.development.local`. That file is not committed to the repository.
3. Run `npm run dev` in a terminal.
4. For patients and records, run `sh start.sh` inside `server/` in another terminal (JSON Server on port 3000).

## Build

```sh
npm run build
npm run preview
```

## Sprint 2 scope

TS-02, US-07, US-08, US-09, US-10, US-13, US-21, US-23, US-28, US-33, and TS-05.

Includes the professional panel, alerts, assigned patients, patient detail, history, care team, family panel, case follow-up, preferences, English and Spanish, responsive design, and the older adult initial route.

## Local server

`server/db.json` contains the `patients`, `alerts`, `records`, and `interventions` resources. `server/routes.json` exposes the resources under `/api/v1`. The application consumes them over HTTP using Axios.

Empty and error states are shown from the corresponding views when the service does not return usable information.

## Limits

- Role selection is not authentication.
- JSON Server works as a local REST service and does not implement authorization.
- There are no diagnostics, live monitoring, messaging, real civil registration, or notification delivery.
- Preferences are stored in the browser.
- No public deployment was performed.
- No Git commands were run and the report was not modified.

See `CHANGELOG.md` for the history and `docs/SPRINT-2-COVERAGE.md` for functional coverage.
