const BaseScreen = require('./base.screen');

/** Android Settings app search screen - no custom APK required. */
class SettingsScreen extends BaseScreen {
    get searchIcon() {
        return $('~Search settings');
    }

    get searchBox() {
        return $('android=new UiSelector().resourceId("android:id/search_src_text")');
    }

    get resultTitles() {
        return $$('android=new UiSelector().resourceId("android:id/title")');
    }

    async openSearch() {
        await this.searchIcon.click();
        return this;
    }

    async searchFor(query) {
        await this.searchBox.setValue(query);
        return this;
    }

    async getResults() {
        return this.resultTitles;
    }
}

module.exports = new SettingsScreen();
