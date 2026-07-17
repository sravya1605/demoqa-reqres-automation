# Contributing

## Prerequisites

- Node.js 20+ (22 recommended - matches the CI pipeline)
- npm 9+

## Setup

```bash
git clone <repo-url>
cd demoqa-reqres-automation
npm install
npx playwright install --with-deps
cp .env.example .env
```

Fill in `.env` with:

- `DEMOQA_USERNAME` / `DEMOQA_PASSWORD` — credentials for a user you create
  manually at https://demoqa.com (registration is intentionally not
  automated; see README for details).
- `REQRES_API_KEY` — a free key from https://app.reqres.in, required by
  reqres.in's `/api/users` endpoints (see README for details).

## Running tests

```bash
npm test              # all tests, all browsers
npm run test:ui       # UI (Book Store) tests only
npm run test:api      # API (reqres.in) tests only
npm run test:chromium # single browser
npm run test:headed   # watch the browser while it runs
npm run report        # open the last HTML report
```

## Code quality

Before committing, run:

```bash
npm run lint       # check for lint errors
npm run lint:fix   # auto-fix what can be fixed
npm run format     # apply Prettier formatting
```

Both ESLint and Prettier are configured to agree with each other
(`eslint-config-prettier` disables any ESLint formatting rule that would
conflict with Prettier), so running both should never fight.

## Project conventions

- All configuration (URLs, credentials, timeouts) comes from `.env` via
  `config/env.js` — never hardcode values in page objects, API clients, or
  tests.
- Page objects live in `pages/`, API logic in `api/`, shared helpers in
  `utils/`. Each file should have a single, clear responsibility.
- Use `async`/`await` consistently — avoid mixing in raw `.then()` chains.
- Add JSDoc comments on exported classes/methods only; skip comments that
  just restate the code.
- Prefer one clear negative-path test per suite over none — e.g.
  `tests/api/users.spec.js` covers a non-existent user id alongside the
  main create/fetch/update flow. Keep each test independent (no shared
  state between test() blocks).
