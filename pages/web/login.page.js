const BasePage = require('./base.page');
const InventoryPage = require('./inventory.page');

class LoginPage extends BasePage {
    get username() {
        return $('#user-name');
    }

    get password() {
        return $('#password');
    }

    get loginButton() {
        return $('#login-button');
    }

    get errorMessage() {
        return $("[data-test='error']");
    }

    async loginAs(user, pass) {
        await this.submitLogin(user, pass);
        return new InventoryPage();
    }

    async submitLogin(user, pass) {
        await this.username.setValue(user);
        await this.password.setValue(pass);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return this.errorMessage.getText();
    }
}

module.exports = new LoginPage();
