# IssueTrack — Sistema de Gestión de Incidencias

![IssueTrack Banner](https://via.placeholder.com/800x200/0d1117/06b6d4?text=ISSUETRACK+%E2%80%94+Issue+Tracker)

> Aplicación SPA para el registro, seguimiento y gestión de incidencias de software, desarrollada como prueba técnica para el cargo de Desarrollador Frontend Junior (React).

---

## 🚀 Demo en producción

🔗 **[Ver aplicación desplegada](https://issuetrack-demo.vercel.app)**  
*(Reemplaza este enlace con tu URL de Vercel/Netlify)*

---

## 🛠 Tecnologías utilizadas

| Herramienta | Versión | Uso |
|---|---|---|
| React | 18.3 | UI declarativa y gestión de estado |
| Vite | 5.x | Bundler y entorno de desarrollo |
| React Router DOM | 6.x | Enrutamiento SPA |
| Axios | 1.7 | Peticiones HTTP |
| SweetAlert2 | 11.x | Alertas y confirmaciones |
| Tailwind CSS | 3.4 | Estilos utilitarios |
| MockAPI | — | API REST simulada |
| Git + GitHub | — | Control de versiones (GitFlow) |

---

## 📁 Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── Badges.jsx        — Badges de estado y prioridad
│   ├── EmptyState.jsx    — Estado vacío
│   ├── Filters.jsx       — Barra de búsqueda y filtros
│   ├── IssueCard.jsx     — Tarjeta individual de incidencia
│   ├── IssueModal.jsx    — Modal para crear / editar
│   ├── Navbar.jsx        — Barra de navegación superior
│   ├── ProtectedRoute.jsx — Guardia de rutas autenticadas
│   ├── Spinner.jsx       — Indicador de carga
│   └── StatsBar.jsx      — Tarjetas de métricas
├── context/
│   └── AuthContext.jsx   — Contexto de autenticación (LocalStorage)
├── hooks/
│   └── useIssues.js      — Hook personalizado para CRUD de incidencias
├── pages/
│   ├── DashboardPage.jsx — Vista principal con listado y filtros
│   ├── LoginPage.jsx     — Vista de autenticación simulada
│   └── NotFoundPage.jsx  — Página 404
├── services/
│   └── issueService.js   — Capa de servicios HTTP (Axios)
└── utils/
    └── issueHelpers.js   — Helpers, constantes y formateadores
```

---

## ⚙️ Instalación y ejecución local

### Prerrequisitos
- Node.js v18 o superior
- npm v9 o superior

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/issue-tracker.git
cd issue-tracker

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local y agrega tu URL de MockAPI

# 4. Iniciar servidor de desarrollo
npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`

### Configurar MockAPI

1. Ir a [mockapi.io](https://mockapi.io) y crear una cuenta gratuita
2. Crear un nuevo proyecto
3. Agregar un recurso llamado `issues` con el esquema:
   ```json
   {
     "id": "string",
     "titulo": "string",
     "descripcion": "string",
     "estado": "Pendiente | En Progreso | Resuelto",
     "prioridad": "Baja | Media | Alta",
     "createdAt": "timestamp"
   }
   ```
4. Copiar la URL base al archivo `.env.local`

---

## 🔐 Autenticación

La autenticación es **simulada** mediante `localStorage`:
- Ingresa con cualquier nombre y selecciona un rol
- Los datos se persisten en `localStorage` (clave: `issuetrack_session`)
- Al cerrar sesión, los datos se eliminan y se redirige al Login
- Cualquier intento de acceder a `/dashboard` sin sesión redirige automáticamente a `/login`

---

## 🧩 Funcionalidades implementadas

### Factor 1 — Requerimientos base ✅
- [x] Ruta `/login` con mock de autenticación
- [x] Persistencia de sesión en `localStorage`
- [x] Redirección automática si no hay sesión activa
- [x] Botón de cierre de sesión con confirmación
- [x] `GET` — Listado de incidencias con tarjetas
- [x] `POST` — Creación de incidencia desde modal
- [x] `PUT` — Edición de incidencia existente
- [x] `DELETE` — Eliminación con confirmación por SweetAlert2

### Factor 2 — Criterios de excelencia ✅
- [x] Arquitectura modular (`components`, `pages`, `services`, `hooks`, `utils`, `context`)
- [x] Custom Hook `useIssues` para encapsular la lógica de datos
- [x] `try/catch` en todas las peticiones HTTP
- [x] Spinners/loaders durante peticiones asíncronas
- [x] Alertas de error con SweetAlert2 ante fallos de API
- [x] Diseño responsivo (mobile-first) con Tailwind CSS
- [x] Búsqueda y filtrado en tiempo real por estado y prioridad
- [x] Panel de estadísticas con conteo por estado
- [x] Código limpio, sin `console.log` residuales

---

## 🌿 Flujo de Git (GitFlow)

```
main
└── develop
    ├── feature/login-view
    ├── feature/auth-context
    ├── feature/crud-issues
    ├── feature/ui-components
    └── feature/ui-improvements
```

Los commits siguen la convención **Conventional Commits**:
- `feat:` — nuevas funcionalidades
- `fix:` — corrección de bugs
- `style:` — cambios de estilos o formato
- `refactor:` — refactorizaciones sin cambio funcional
- `docs:` — documentación

---

## 📜 Licencia

MIT © 2026 — Desarrollado como prueba técnica.
