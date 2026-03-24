const { By, until } = require("selenium-webdriver");
class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.inventoryList = By.className("inventory_list");
        this.addToCartButtons = By.css(".btn_inventory");
        this.cartBadge = By.className("shopping_cart_badge");
    }
    async isOnProductsPage() {
        await this.driver.wait(until.elementLocated(this.inventoryList), 10000);
        return true;
    }
    async addItemByIndex(index) {
        const buttons = await this.driver.findElements(this.addToCartButtons);
        if (buttons.length > index) await buttons[index].click();
    }
    async getCartCount() {
        try {
            const badge = await this.driver.findElement(this.cartBadge);
            return await badge.getText();
        } catch (e) { return "0"; }
    }
}
module.exports = ProductsPage;
