const { By } = require("selenium-webdriver");
class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "https://www.saucedemo.com/";
        this.usernameField = By.id("user-name");
        this.passwordField = By.id("password");
        this.loginButton = By.id("login-button");
    }
    async open() { await this.driver.get(this.url); }
    async login(user, pass) {
        await this.driver.findElement(this.usernameField).sendKeys(user);
        await this.driver.findElement(this.passwordField).sendKeys(pass);
        await this.driver.findElement(this.loginButton).click();
    }
}
module.exports = LoginPage;
