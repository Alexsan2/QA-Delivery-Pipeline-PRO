const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require("../pages/ProductsPage");
const CheckoutPage = require("../pages/CheckoutPage");

async function executarHeadless() {
    console.log("🕵️‍♂️ [INÍCIO] Teste E2E em Pipeline Linux...");
    
    let options = new chrome.Options();
    options.addArguments("--headless=new"); // Modo headless moderno
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    
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
        console.log("✅ Login OK");
        
        await products.isOnProductsPage();
        await products.addItemByIndex(0);
        console.log("✅ Item no carrinho");
        
        await checkout.goToCart();
        await checkout.startCheckout();
        await checkout.fillInformation("Alex", "Sandro", "72210000");
        await checkout.finishOrder();
        
        const msg = await checkout.getSuccessMessage();
        console.log("🏁 RESULTADO: " + msg);
        
    } catch (e) { 
        console.error("💥 ERRO NO TESTE: " + e.message);
        process.exit(1); 
    } finally { 
        await driver.quit(); 
    }
}
executarHeadless();
