const BasePage = require('./base.page');

class InventoryPage extends BasePage {
    get pageTitle() {
        return $('.title');
    }

    get inventoryItems() {
        return $$('.inventory_item');
    }

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async getItemCount() {
        return (await this.inventoryItems).length;
    }
}

module.exports = InventoryPage;
