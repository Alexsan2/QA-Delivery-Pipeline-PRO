const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require("../pages/ProductsPage");
const CheckoutPage = require("../pages/CheckoutPage");

async function executarNoPipeline() {
    console.log("🕵️‍♂️ [INFO] Iniciando teste no ambiente Linux...");
    
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

        console.log("🔗 Acessando SauceDemo...");
        await login.open();
        
        console.log("🔑 Tentando Login...");
        await login.login("standard_user", "secret_sauce");
        
        await products.isOnProductsPage();
        console.log("✅ Logado com sucesso!");

        await products.addItemByIndex(0);
        await checkout.goToCart();
        await checkout.startCheckout();
        await checkout.fillInformation("Alex", "Sandro", "72210000");
        await checkout.finishOrder();
        
        const msg = await checkout.getSuccessMessage();
        console.log("🏁 MENSAGEM FINAL: " + msg);
        
    } catch (e) { 
        console.error("💥 ERRO NO TESTE: " + e.message);
        process.exit(1); 
    } finally { 
        await driver.quit(); 
        console.log("🏁 Navegador encerrado.");
    }
}
executarNoPipeline();
