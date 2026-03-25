const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require("../pages/ProductsPage");
const CheckoutPage = require("../pages/CheckoutPage");

async function executarHeadless() {
    console.log("🕵️‍♂️ [INÍCIO] Teste no Pipeline...");
    let options = new chrome.Options();
    options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage", "--window-size=1920,1080", "--remote-allow-origins=*");
    
    const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    try {
        const login = new LoginPage(driver);
        const products = new ProductsPage(driver);
        const checkout = new CheckoutPage(driver);

        await login.open();
        await login.login("standard_user", "secret_sauce");
        await products.isOnProductsPage();
        await products.addItemByIndex(0);
        await checkout.goToCart();
        await checkout.startCheckout();
        await checkout.fillInformation("Alex", "Sandro", "72210000");
        await checkout.finishOrder();
        
        const msg = await checkout.getSuccessMessage();
        console.log("🏁 MENSAGEM: " + msg);
    } catch (e) { 
        console.error("💥 ERRO DETALHADO: " + e.message);
        process.exit(1); // Avisa o GitHub que o teste falhou se der erro
    } finally { 
        await driver.quit(); 
    }
}
executarHeadless();
