const { until, By } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }
    async click(locator) {
        await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.findElement(locator).click();
    }
    async type(locator, text) {
        await this.driver.wait(until.elementLocated(locator), 10000);
        await this.driver.findElement(locator).sendKeys(text);
    }
}
module.exports = BasePage;