const BaseScreen = require('./base.screen');

/** Android Settings app search screen - no custom APK required. */
class SettingsScreen extends BaseScreen {
    get searchIcon() {
        return $('android=new UiSelector().resourceId("com.android.settings:id/search_action_bar")');
    }

    // Tapping the search bar hands off to the separate Settings Suggestions
    // (search) app, whose edit text lives under its own package id.
    get searchBox() {
        return $('android=new UiSelector().resourceId("com.google.android.settings.intelligence:id/open_search_view_edit_text")');
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
