# Hybrid Web + Mobile Automation Framework (JavaScript)

A single [WebdriverIO](https://webdriver.io) framework driving **both**
browser and native mobile tests. WebdriverIO speaks the WebDriver/WebDriver
BiDi protocol either way — the only thing that changes between web and
mobile is the `capabilities` block, so this project keeps one shared config
(`wdio.shared.conf.js`) and two thin platform configs that add capabilities
on top of it. That's what makes this genuinely "hybrid" rather than two
separate tools.

## Stack

| Concern       | Tool                              |
|---------------|-------------------------------------|
| Driver/runner | WebdriverIO 9 (`@wdio/cli`, local runner) |
| Mobile        | `@wdio/appium-service` + `appium-uiautomator2-driver` |
| Test runner   | Mocha (BDD interface)               |
| Assertions    | Chai                                |

## Project layout

```
config/env.js                 # base URL, Appium URL, Android capabilities
wdio.shared.conf.js           # settings common to both platforms
wdio.web.conf.js              # + chrome capabilities, baseUrl
wdio.mobile.conf.js           # + Android capabilities, appium service
pages/web/                    # BasePage, LoginPage, InventoryPage
pages/mobile/                 # BaseScreen, SettingsScreen
test/web/login.spec.js        # saucedemo.com
test/mobile/settingsSearch.spec.js  # Android Settings app (no APK needed)
```

## Prerequisites

- Node.js 18+
- Chrome (for web tests)
- For mobile tests: Android emulator/device with `uiautomator2` driver
  (`npx appium driver install uiautomator2`) — the `appium` service starts
  the server for you, no need to run it separately

## Setup

```bash
npm install
```

## Running tests

```bash
# Web
npm run test:web

# Web, headless
HEADLESS=true npm run test:web

# Mobile (starts Appium automatically via the appium service)
npm run test:mobile
```

## CI

`.github/workflows/ci.yml` runs the web suite headlessly on every push/PR.
Mobile tests require a real device/emulator, so they're left for local or
device-farm execution (`npm run test:mobile`).
