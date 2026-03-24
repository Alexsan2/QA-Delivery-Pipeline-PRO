const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.userInput = By.id('user-name');
        this.passInput = By.id('password');
        this.loginBtn  = By.id('login-button');
    }
    async open() { await this.driver.get('https://www.saucedemo.com/'); }
    async login(user, pass) {
        await this.type(this.userInput, user);
        await this.type(this.passInput, pass);
        await this.click(this.loginBtn);
    }
}
module.exports = LoginPage;