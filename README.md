Playwright + Testable Examples
==============================

This repository contains several examples to help you run Playwright and utilize Testable as a remote browser grid.

### Steps to Run

1. Set your API key: `export TESTABLE_KEY=xxx`. API keys can be generated by logging into Testable and going to Org Management => API Keys.
2. Run `npm install` to install any dependencies
3. Choose the example you want to run. For example: `node basic.js` to run the basic example.

### Examples

Examples are provided both for connecting a Playwright Test framework test suite, via CDP (Chrome DevTools Protocol), and via a Playwright websocket.

**Playwright Test**:

Run `npx playwright install` and then `npx playwright test`. It will run the `tests/example.spec.ts` spec according to `playwright.config.ts` against browser(s) launched on a Testable test runner in AWS N Virginia.

**CDP Examples**:

* `basic.cdp.js`: A basic example that loads a page and takes a screenshot
* `all-options.cdp.js`: Includes all possible parameters that you can pass Testable when initializing the session.
* `testable-commands.cdp.js`: Includes an example for each custom command that Testable accepts around setting pass/fail, logging, metrics, and assertions.

**Playwright WebSocket Examples**:

* `basic.js`: A basic example that loads a page and takes a screenshot
* `all-options.js`: Includes all possible parameters that you can pass Testable when initializing the session.
* `testable-commands.js`: Includes an example for each custom command that Testable accepts around setting pass/fail, logging, metrics, and assertions.