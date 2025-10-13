<p align="center">
<img src="https://upload.wikimedia.org/wikipedia/commons/7/75/Playwright_Logo.svg" alt="Playwright logo" width=370>
<h3 align="center">Playwright Typescript Boilerplate</h3>

## Tests architecture

For automation tests architecture we use Page Object Pattern. All necessary files are placed in `tests` directory, which primarily includes:

- `tests` directory with test cases,
- `constants` directory with enums and static values used across tests,
- `utils` helpful functions and tools to support test execution,
- `schemas` with objects for asserting response body,

## Tests

To install Playwright and it's browsers

```bash
npm install
npx playwright install
```

To run all tests

```bash
npm run test
```

To run smoke tests:

```bash
npm run test:smoke
```

## Test Reports

The project uses different reporters based on the environment:

- `local development` : `list` reporter for console output
- `CI/CD`: `html` reporter for detailed HTML reports
- `trace collection`: Automatically captures traces on test failures for debugging

Generated trace files with all test execution steps can be uploaded to [Trave Viewer Page](https://trace.playwright.dev/) for detailed debugging and analysis of test failures.
