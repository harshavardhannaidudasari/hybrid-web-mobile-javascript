// Settings common to both the web and mobile runs. Each platform config
// spreads this object and only adds/overrides `capabilities`, keeping the
// two profiles from drifting apart on everything else.
exports.config = {
    runner: 'local',
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },
    reporters: ['spec'],
    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
};
