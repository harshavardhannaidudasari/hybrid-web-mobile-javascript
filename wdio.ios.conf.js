const { config: shared } = require('./wdio.shared.conf.js');
const env = require('./config/env.js');

const hubUrl = new URL(env.browserstack.hubUrl);

exports.config = {
    ...shared,
    specs: ['./test/mobile/iosSample.spec.js'],
    maxInstances: 1,
    protocol: hubUrl.protocol.replace(':', ''),
    hostname: hubUrl.hostname,
    port: Number(hubUrl.port) || (hubUrl.protocol === 'https:' ? 443 : 80),
    path: hubUrl.pathname,
    // BrowserStack App Automate is a remote hub, not a local Appium server -
    // unlike wdio.mobile.conf.js there's no `services: ['appium']` here.
    capabilities: [
        {
            platformName: 'iOS',
            'appium:deviceName': env.ios.deviceName,
            'appium:platformVersion': env.ios.platformVersion,
            'appium:app': env.browserstack.appId,
            'bstack:options': {
                userName: env.browserstack.username,
                accessKey: env.browserstack.accessKey,
                projectName: 'Hybrid Web+Mobile JavaScript',
                buildName: 'iOS BrowserStack',
                sessionName: 'iOS BStackSampleApp smoke test',
                debug: true,
            },
        },
    ],
};
