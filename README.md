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
config/env.js                 # base URL, Appium URL, Android/iOS/BrowserStack config
wdio.shared.conf.js           # settings common to both platforms
wdio.web.conf.js              # + chrome capabilities, baseUrl
wdio.mobile.conf.js           # + Android capabilities, appium service
wdio.ios.conf.js              # + iOS capabilities, BrowserStack App Automate hub
pages/web/                    # BasePage, LoginPage, InventoryPage
pages/mobile/                 # BaseScreen, SettingsScreen, IosSampleScreen
test/web/login.spec.js        # saucedemo.com
test/mobile/settingsSearch.spec.js  # Android Settings app (no APK needed)
test/mobile/iosSample.spec.js       # iOS BStackSampleApp on BrowserStack App Automate
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

# Mobile, iOS (runs remotely on BrowserStack App Automate)
npm run test:mobile:ios
```

## iOS (BrowserStack App Automate)

Local iOS simulation isn't possible on this (Windows) machine, so the iOS
mobile test runs against [BrowserStack App Automate](https://www.browserstack.com/app-automate)
instead of a local simulator/Appium server. It drives BrowserStack's own
public demo app, **BStackSampleApp**, with the same page-object/Mocha/Chai
pattern as the Android test.

### Prerequisites

- A BrowserStack account with App Automate access (username + access key,
  found on your [Account Settings](https://www.browserstack.com/accounts/settings) page)
- The BStackSampleApp `.ipa` uploaded to your BrowserStack app storage
  (one-time step - see below)

### One-time: upload the sample app

BrowserStack hosts a public `.ipa` for this exact app; upload it to your own
App Automate storage to get an app id:

```bash
curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "url=https://www.browserstack.com/app-automate/sample-apps/ios/BStackSampleApp.ipa"
```

This returns `{"app_url":"bs://<hash>"}` - that `bs://...` value is your
`BROWSERSTACK_APP_ID`.

### Required environment variables

| Variable                  | Purpose                                      | Default                                       |
|----------------------------|-----------------------------------------------|------------------------------------------------|
| `BROWSERSTACK_USERNAME`    | BrowserStack account username                 | *(required, no default)*                        |
| `BROWSERSTACK_ACCESS_KEY`  | BrowserStack account access key               | *(required, no default)*                        |
| `BROWSERSTACK_APP_ID`      | `bs://...` id from the upload step above      | *(required, no default)*                        |
| `BROWSERSTACK_HUB_URL`     | App Automate WebDriver hub URL                | `https://hub-cloud.browserstack.com/wd/hub`     |
| `IOS_DEVICE_NAME`          | BrowserStack iOS device to run on             | `iPhone 14`                                     |
| `IOS_PLATFORM_VERSION`     | iOS version on that device                    | `17`                                            |

### Running just the iOS test

```bash
BROWSERSTACK_USERNAME=... BROWSERSTACK_ACCESS_KEY=... BROWSERSTACK_APP_ID=bs://... \
  npm run test:mobile:ios
```

which is equivalent to `wdio run ./wdio.ios.conf.js`.

## CI

`.github/workflows/ci.yml` runs the web suite headlessly on every push/PR.
Mobile tests require a real device/emulator, so they're left for local or
device-farm execution (`npm run test:mobile`).
