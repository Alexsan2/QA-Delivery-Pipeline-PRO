const { By, until } = require("selenium-webdriver");
class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.cartButton = By.className("shopping_cart_link");
        this.checkoutBtn = By.id("checkout");
        this.firstNameField = By.id("first-name");
        this.lastNameField = By.id("last-name");
        this.zipCodeField = By.id("postal-code");
        this.continueBtn = By.id("continue");
        this.finishBtn = By.id("finish");
        this.completeHeader = By.className("complete-header");
    }
    async goToCart() {
        const cart = await this.driver.wait(until.elementLocated(this.cartButton), 10000);
        await cart.click();
    }
    async startCheckout() {
        const btn = await this.driver.wait(until.elementLocated(this.checkoutBtn), 10000);
        await btn.click();
    }
    async fillInformation(firstName, lastName, zip) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeField).sendKeys(zip);
        await this.driver.findElement(this.continueBtn).click();
    }
    async finishOrder() {
        const btn = await this.driver.wait(until.elementLocated(this.finishBtn), 10000);
        await btn.click();
    }
    async getSuccessMessage() {
        const element = await this.driver.wait(until.elementLocated(this.completeHeader), 10000);
        return await element.getText();
    }
}
module.exports = CheckoutPage;
