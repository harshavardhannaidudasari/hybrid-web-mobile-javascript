const { config: shared } = require('./wdio.shared.conf.js');
const env = require('./config/env.js');

exports.config = {
    ...shared,
    specs: ['./test/web/**/*.spec.js'],
    baseUrl: env.web.baseUrl,
    maxInstances: 2,
    capabilities: [
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: process.env.HEADLESS === 'true' ? ['--headless=new', '--window-size=1400,1000'] : [],
            },
        },
    ],
};
