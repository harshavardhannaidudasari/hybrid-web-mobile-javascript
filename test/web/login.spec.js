const { expect } = require('chai');
const loginPage = require('../../pages/web/login.page');

describe('SauceDemo login', () => {
    beforeEach(async () => {
        await loginPage.open('/');
    });

    it('logs a standard user in to the inventory page', async () => {
        const inventory = await loginPage.loginAs('standard_user', 'secret_sauce');

        expect(await inventory.getPageTitle()).to.equal('Products');
        expect(await inventory.getItemCount()).to.be.greaterThan(0);
    });

    it('shows an error for a locked out user', async () => {
        await loginPage.submitLogin('locked_out_user', 'secret_sauce');

        expect(await loginPage.getErrorMessage()).to.include('locked out');
    });
});
