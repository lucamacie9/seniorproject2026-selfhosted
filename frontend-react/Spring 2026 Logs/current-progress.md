# Current Progress – Transfer Credit Match React Frontend

Log of changes and progress for teammates. Intended to be committed and pushed with the repo as development continues.

**Location:** This log lives under `frontend-react/Spring 2026 Logs/` so all frontend deliverables (code + docs) are in one place when pushing to origin.

---

## 2026-04-01

### Programs and Match Page Update 
Programs and Match Page implementation - Giselle Rodriguez 

**Programs page**
- Redesigned the `/programs` page with updated layout and structure
- Placeholder Roosevelt program cards (Program 1, Program 2, Program 3) for demo and layout purposes
- Search functionality for filtering visible programs
- Location filter options (All, Chicago, Schaumburg, Online)
- Expandable **View Course Details** behavior for each program card to display placeholder course descriptions
-  **Start Matching** button on each card to route users to the `/match` page

### Match Page Update
- Updated the `/match` page layout to match Programs page styling 
- Search and dropdown selection for both **From Course** and **To Course** fields
- Placeholder course options (Course 1-6) for demo/testing purposes
- Mock matching behavior to display **Full Match**, **Partial Match**, or **No Match** results
- **Save Transfer Plan** functionality
- **Saved Transfer Plans** section so users can view saved selections after saving

---
## 2026-03-26

### Institutions Page Update (Contributor Note)
- **Institutions page implementation credited to team member Yinka Yussuf.**
- Added the institution/program selector experience on `/institutions`, including:
  - Current institution selection
  - Target institution selection
  - Target program filtering based on selected target institution
  - Confirm action and summary display
- Integration behavior uses backend endpoints for institutions and programs.
## 2026-03-18

### Login & Registration Pages Update + Validation

Login Page Implementation - Darius Gillard

Registration Page Implementation - Giselle Rodriguez

**Login Page**
- Implemented login form with email and password inputs
- Validation to show generic error messaging ("Invalid email or password")

**Registration Page** 
- Implemented create account form with required input field
- Password requirement messaging (minimum length)

**Validation**
- Required fields
- Email format
- Paswword requirements (minimum length - 6)
- Passwords must match 

  
## 2026-03-09

### Site skeleton

- **Layout:** Single layout route with `AppLayout` wrapping all pages (placeholder `<nav>`, `<Outlet />`, `<footer>`). No real Navbar or Footer components yet.
- **Routes:** All page routes in place: `/` (Landing), `/login`, `/register`, `/dashboard`, `/match`, `/institutions`, `/programs`, `/about`. Each route renders a placeholder page component (e.g. `<h1>LandingPage</h1>`).
- **Stack:** Vite, React 18, TypeScript, React Router 7. Entry in `main.tsx` with `BrowserRouter`; route definitions in `App.tsx`.
- **Folders:** `src/pages/`, `src/components/layout/`, `src/components/shared/` (and placeholders for `services/`, `types/`). Skeleton is the base for Sprint 2 (real Navbar/Footer) and later sprints.

---

## 2026-02-15

### About page and Spring 2026 Logs

- **About page added.** `about.html` now has a React counterpart: `AboutPage` at route `/about`. Placeholder content only (Sprint 2 scope).
- **Spring 2026 Logs directory created.** Holds documentation for the frontend rewrite:
  - **page-mappings.md** – Legacy HTML → React page/route mapping (one-to-one for all legacy pages).
  - **current-progress.md** – This file; dated changelog for frontend progress.
- **No push.** Changes are local only; ready for commit when the team is ready.

### Current sprint position

- **Sprint 1:** ✅ Complete (project setup, routing).
- **Sprint 2:** In progress (global layout + navigation; Navbar/Footer not yet implemented).
- **Sprint 3–7:** Not started.

---

### Scope and push strategy (same day)

- **Spring 2026 Logs** and all frontend docs moved inside `frontend-react/`. Only `frontend-react/` (including its docs and logs) is committed and pushed; nothing outside that folder is in scope for the frontend team.
- **docs-local/** at repo root is for personal notes and Cursor agent use only; it is not pushed.

### First push to origin

- **frontend-react pushed to `dev`.** Initial commit (`frontend: add React app with routing and Spring 2026 Logs`) added the full React app: Vite + React 18 + TypeScript, React Router with all page routes (Landing, Login, Register, Dashboard, Match, Institutions, Programs, About), AppLayout placeholder, and Spring 2026 Logs (page-mappings.md, current-progress.md).
- **Push scope confirmed.** Only `frontend-react/` is committed and pushed. Architecture, sprint plan, legacy mapping, and team-collaboration docs live in `docs-local/` (not pushed); only Spring 2026 Logs are pushed with the app.

*— Frontend lead (lucamacie9), 2026-02-15*

---

*Add new entries above this line with the format: `## YYYY-MM-DD` then `### Brief title` and bullet points.*
