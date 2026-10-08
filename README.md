# steam-playwright

End-to-end tests written in JavaScript with [Playwright](https://playwright.dev).

## Setup

```bash
npm install
npx playwright install
```

## Running tests

| Command | Description |
| --- | --- |
| `npm test` | Run all tests headless in Chromium, Firefox and WebKit |
| `npm run test:chromium` | Run in Chromium only |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:slowmo` | Run in a visible Chromium, one test at a time, with a 3s delay per action (change with `SLOW_MO`) |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Run with the Playwright Inspector |
| `npm run report` | Open the last HTML report |
| `npm run codegen` | Record a new test with Codegen |

Set `BASE_URL` to point tests at another environment:

```bash
BASE_URL=https://example.com npm test
```

## Structure

```
pages/   Page objects (locators + actions per page)
tests/   Test specs (*.spec.js)
playwright.config.js
```

## Test cases

`tests/store.spec.js` → **Steam main scenarios** (each "action → check" is a `test.step`):

1. Open Steam → Steam is open
2. Go to Community tab → Community is open
3. Click 'Sign in' → Sign in form is displayed
4. Go to About tab → About page is open
5. Check playing now and online digits (format, > 0, playing now ≤ online)

Additional suites cover store search and the About page feature tiles.

Page objects: `SteamPage` (shared header and navigation), `StorePage`,
`CommunityPage`, `SignInPage`, `AboutPage`.
