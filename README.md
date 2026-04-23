# Sabre Fencing Drill Trainer

Sabre Fencing Drill Trainer is a browser-based training app for sabre fencers who want a fast, structured way to practice footwork, reactions, and command-based drills. It combines a focused athletic UI with spoken commands, adjustable drill settings, local session history, and a lightweight API for selected server-side features.

The project is built as a pnpm workspace monorepo with a React/Vite frontend and an Express backend. The training flow is designed to work well for solo practice sessions, from warm-up to active drills and final session review.

## Features

- Multiple training modes, including complete training, drill, warm-up, cool-down, coordination, and footwork focus
- Spoken commands during active sessions
- Adjustable timing, move selection, and audio settings
- Local session history stored in the browser
- English, German, and French language support
- Session summary with quick performance feedback

## Live Website

The production website is available here:

[https://your-live-url-here](https://your-live-url-here)

Replace the placeholder above with your actual deployment URL.

## Screenshots

### Home Page

![Home Page](docs/screenshots/home-page.png)

### Training Session Selection

![Training Session Selection](docs/screenshots/session-selection.png)

### Active Training

![Active Training](docs/screenshots/active-training.png)

### Session Summary

![Session Summary](docs/screenshots/session-summary.png)

## Repository Structure

```text
artifacts/
  api-server/        Express backend
  sabre-training/    React + Vite frontend
lib/
  api-client-react/  Generated React API client
  api-spec/          OpenAPI definition
  api-zod/           Generated Zod schemas
scripts/             Workspace utility scripts
```

## Run Locally

### Prerequisites

- Node.js 24
- pnpm 10 or newer

Install dependencies from the repository root:

```bash
pnpm install
```

### Linux

Start the backend in one terminal:

```bash
cd /path/to/FechtTrainer
export PORT=8080
export CONTACT_EMAIL="your@email.com"
export SMTP_HOST="your.smtp.host"
export SMTP_PORT="587"
export SMTP_USER="your-smtp-user"
export SMTP_PASS="your-smtp-password"
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run start
```

Start the frontend in a second terminal:

```bash
cd /path/to/FechtTrainer
export PORT=21212
export BASE_PATH=/
export API_PROXY_TARGET=http://localhost:8080
pnpm --filter @workspace/sabre-training run dev
```

The frontend will be available at:

[http://localhost:21212](http://localhost:21212)

### Windows (PowerShell)

Start the backend in one PowerShell window:

```powershell
Set-Location C:\path\to\FechtTrainer
$env:PORT="8080"
$env:CONTACT_EMAIL="your@email.com"
$env:SMTP_HOST="your.smtp.host"
$env:SMTP_PORT="587"
$env:SMTP_USER="your-smtp-user"
$env:SMTP_PASS="your-smtp-password"
pnpm --filter @workspace/api-server run build
pnpm --filter @workspace/api-server run start
```

Start the frontend in a second PowerShell window:

```powershell
Set-Location C:\path\to\FechtTrainer
$env:PORT="21212"
$env:BASE_PATH="/"
$env:API_PROXY_TARGET="http://localhost:8080"
pnpm --filter @workspace/sabre-training run dev
```

The frontend will be available at:

[http://localhost:21212](http://localhost:21212)

### Notes for Local Development

- For most UI work, the frontend alone is enough.
- The backend is mainly used for server-side API routes such as health checks and contact form handling.
- `API_PROXY_TARGET` is used only for local Vite development so the frontend can forward `/api` requests to your backend.
- In production, the frontend expects API routes under `/api` on the same origin.
- The contact form only works when the backend is running and valid SMTP credentials are configured.

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- Wouter
- Framer Motion
- Express
- OpenAPI + generated client/schema packages

## License

The source code in this repository is licensed under the MIT License. See [LICENSE](LICENSE).

All non-code content remains copyright of Janosch Adams and is not covered by the MIT License unless explicitly stated otherwise. This includes project text, screenshots, images, graphics, audio files, branding, and other media assets. See [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
