const { config: shared } = require('./wdio.shared.conf.js');
const env = require('./config/env.js');

exports.config = {
    ...shared,
    specs: ['./test/mobile/**/*.spec.js'],
    maxInstances: 1,
    hostname: new URL(env.mobile.appiumServerUrl).hostname,
    port: Number(new URL(env.mobile.appiumServerUrl).port),
    path: '/',
    services: ['appium'],
    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': env.android.deviceName,
            'appium:appPackage': env.android.appPackage,
            'appium:appActivity': env.android.appActivity,
            'appium:noReset': true,
            'appium:newCommandTimeout': 120,
        },
    ],
};
