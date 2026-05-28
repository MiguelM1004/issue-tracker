#!/bin/bash
# ────────────────────────────────────────────────────────────────
# GUÍA DE COMANDOS GIT — GITFLOW para IssueTrack
# Ejecuta estos comandos en orden para cumplir con los lineamientos
# ────────────────────────────────────────────────────────────────

echo "=== INICIO DEL PROYECTO CON GITFLOW ==="

# 1. Inicializar repositorio
git init
git add README.md
git commit -m "docs: initial project setup and README"

# 2. Crear rama main y develop
git branch -M main
git checkout -b develop

# ── FEATURE: Login View ──────────────────────────────────────────
git checkout -b feature/login-view

# Agregar archivos de login
git add src/pages/LoginPage.jsx src/context/AuthContext.jsx src/components/ProtectedRoute.jsx
git commit -m "feat: add login page with role selection"
git commit -m "feat: implement auth context with localStorage persistence"
git commit -m "feat: add protected route guard for authenticated pages"

# Merge a develop
git checkout develop
git merge feature/login-view --no-ff -m "merge: feature/login-view into develop"

# ── FEATURE: CRUD Issues ─────────────────────────────────────────
git checkout -b feature/crud-issues

git add src/services/issueService.js
git commit -m "feat: add axios http service layer for issues API"

git add src/hooks/useIssues.js
git commit -m "feat: add useIssues custom hook with async error handling"

git add src/utils/issueHelpers.js
git commit -m "feat: add issue helpers, constants and formatters"

git add src/components/IssueModal.jsx
git commit -m "feat: add issue create/edit modal with form validation"

git add src/pages/DashboardPage.jsx
git commit -m "feat: add dashboard page with full CRUD operations"
git commit -m "feat: add sweetalert2 delete confirmation dialog"

# Merge a develop
git checkout develop
git merge feature/crud-issues --no-ff -m "merge: feature/crud-issues into develop"

# ── FEATURE: UI Components ───────────────────────────────────────
git checkout -b feature/ui-components

git add src/components/Navbar.jsx src/components/StatsBar.jsx
git commit -m "feat: add navbar with session info and logout"
git commit -m "feat: add stats bar with issue counters"

git add src/components/IssueCard.jsx src/components/Badges.jsx
git commit -m "feat: add issue card component with action buttons"
git commit -m "feat: add status and priority badge components"

git add src/components/Filters.jsx src/components/EmptyState.jsx src/components/Spinner.jsx
git commit -m "feat: add search and filter components"
git commit -m "feat: add spinner loader and empty state components"

# Merge a develop
git checkout develop
git merge feature/ui-components --no-ff -m "merge: feature/ui-components into develop"

# ── FEATURE: UI Improvements ─────────────────────────────────────
git checkout -b feature/ui-improvements

git add src/index.css tailwind.config.js
git commit -m "style: add global CSS design system and tailwind config"
git commit -m "style: add glow effects, animations and scanline overlay"

git add src/pages/NotFoundPage.jsx
git commit -m "feat: add 404 not found page"

git add .env.example .gitignore
git commit -m "chore: add gitignore and env example file"

# Merge a develop
git checkout develop
git merge feature/ui-improvements --no-ff -m "merge: feature/ui-improvements into develop"

# ── FINAL: Merge develop → main ──────────────────────────────────
git checkout main
git merge develop --no-ff -m "release: v1.0.0 — issue tracker complete"
git tag -a v1.0.0 -m "Version 1.0.0 — Prueba técnica completa"

echo ""
echo "=== REPOSITORIO LISTO ==="
echo "Ahora ejecuta: git remote add origin https://github.com/TU_USUARIO/issue-tracker.git"
echo "Luego: git push -u origin main && git push origin develop"
