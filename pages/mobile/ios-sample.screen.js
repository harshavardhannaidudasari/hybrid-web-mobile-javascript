const BaseScreen = require('./base.screen');

/**
 * BrowserStack's public "BStackSampleApp" iOS demo app - used as a
 * connectivity/smoke test against App Automate. See:
 * https://github.com/browserstack/app-automate-samples (ios/examples/run-first-test).
 */
class IosSampleScreen extends BaseScreen {
    get textButton() {
        return $('~Text Button');
    }

    get textInput() {
        return $('~Text Input');
    }

    get textOutput() {
        return $('~Text Output');
    }

    async revealInput() {
        await this.textButton.click();
        return this;
    }

    async submitText(value) {
        await this.textInput.click();
        await this.textInput.addValue(`${value}\n`);
        return this;
    }

    async getOutputText() {
        await this.textOutput.waitForDisplayed({ timeout: 30000 });
        return this.textOutput.getText();
    }
}

module.exports = new IosSampleScreen();
