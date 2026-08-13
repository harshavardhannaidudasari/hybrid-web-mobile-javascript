const { expect } = require('chai');
const settingsScreen = require('../../pages/mobile/settings.screen');

describe('Android Settings search', () => {
    it('returns at least one result for "Wi-Fi"', async () => {
        await settingsScreen.openSearch();
        await settingsScreen.searchFor('Wi-Fi');

        const results = await settingsScreen.getResults();
        expect(results.length).to.be.greaterThan(0);
    });
});
