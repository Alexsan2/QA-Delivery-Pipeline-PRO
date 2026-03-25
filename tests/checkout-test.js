const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require("../pages/ProductsPage");
const CheckoutPage = require("../pages/CheckoutPage");

async function executarHeadless() {
    console.log("🕵️‍♂️ [INÍCIO] Teste E2E no GitHub Actions...");
    
    let options = new chrome.Options();
    options.addArguments("--headless=new"); 
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--disable-gpu");
    
    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    
    try {
        const login = new LoginPage(driver);
        const products = new ProductsPage(driver);
        const checkout = new CheckoutPage(driver);

        await login.open();
        await login.login("standard_user", "secret_sauce");
        console.log("✅ Login realizado.");
        
        await products.isOnProductsPage();
        await products.addItemByIndex(0);
        console.log("✅ Item adicionado.");
        
        await checkout.goToCart();
        await checkout.startCheckout();
        await checkout.fillInformation("Alex", "Sandro", "72210000");
        await checkout.finishOrder();
        
        const msg = await checkout.getSuccessMessage();
        console.log("🏁 RESULTADO FINAL: " + msg);
        
    } catch (e) { 
        console.error("💥 ERRO NO PIPELINE: " + e.message);
        process.exit(1); 
    } finally { 
        await driver.quit(); 
    }
}
executarHeadless();
