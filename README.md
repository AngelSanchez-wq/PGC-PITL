# PITL — Plataforma de Integración Territorial de Lenguazaque

Plataforma de interoperabilidad que conecta los sistemas de información de los
sectores **educativo** y de **gobernanza** del municipio de Lenguazaque,
Cundinamarca, facilitando el intercambio controlado de información y apoyando
la toma de decisiones territoriales.

## Equipo

- Carlos Andres Noriega Bayona
- Angel Stiven Sánchez Rodriguez

Proyecto de Gestión del Conocimiento (PGC) — Programa de Ingeniería de Sistemas
y Computación, Universidad de Cundinamarca, Seccional Ubaté.

## Stack tecnológico

| Componente    | Tecnología              |
| ------------- | ----------------------- |
| Frontend      | Angular                 |
| Backend       | Laravel (PHP)           |
| Base de datos | MySQL                   |
| Metodología   | Scrum (tablero en Jira) |

## Estructura del repositorio

\`\`\`
PITL/
├── backend/ # API REST en Laravel
├── frontend/ # Interfaz de usuario en Angular
└── docs/ # Diagramas, scripts SQL y documentación adicional
\`\`\`

## Instalación y ejecución local

### Backend (Laravel)

\`\`\`bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
\`\`\`

### Frontend (Angular)

\`\`\`bash
cd frontend
npm install
ng serve
\`\`\`

## Gestión del proyecto

El backlog, historias de usuario y sprints se gestionan en Jira: https://ucundinamarca-team-zkvpxp19.atlassian.net/jira/software/projects/PDITLP/boards/35?filter=&groupBy=none&atlOrigin=eyJpIjoiNWE3M2FmNWMzZmU1NDcyNDk2NDE3NTBjNzc2ZWQzN2IiLCJwIjoiaiJ9
