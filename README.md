# VitaLink — Frontend Foundation

Primera entrega incremental del frontend de VitaLink.

## Objetivo

Este paquete contiene únicamente la base funcional de la aplicación: Vue 3, Vite, PrimeVue, Pinia, Vue Router, Vue I18n, navegación por roles, layout responsive y estilos base.

Las funcionalidades de negocio se incorporarán en incrementos posteriores para mantener cambios pequeños y trazables.

## Requisitos

- Node.js `>=22.12.0`
- npm

## Ejecutar

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://127.0.0.1:5173`.

## Validar build

```bash
npm run build
```

## API local

El servidor mock se conserva como infraestructura para futuros incrementos:

```bash
npm run server
```

## Arquitectura de esta entrega

```text
src/
├── elder-care/
│   └── presentation/routes.js
├── locales/
├── shared/
│   └── presentation/
│       ├── components/
│       └── views/
├── app.vue
├── feature-styles.css
├── i18n.js
├── main.js
├── router.js
└── style.css
```

## Orden incremental sugerido

1. Foundation: estructura, navegación, idioma y layout.
2. Autenticación: inicio de sesión y selección de tipo de usuario.
3. Funcionalidad profesional.
4. Funcionalidad familiar/cuidador.
5. Funcionalidad del adulto mayor.
6. Alertas, coordinación, monitoreo y datos reales.

Cada incremento debe mantener la aplicación ejecutable y agregar una capacidad concreta.
