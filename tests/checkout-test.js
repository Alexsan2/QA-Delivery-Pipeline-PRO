const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const LoginPage = require("../pages/LoginPage");
const ProductsPage = require("../pages/ProductsPage");
const CheckoutPage = require("../pages/CheckoutPage");

async function executarHeadless() {
    console.log("🕵️‍♂️ [INÍCIO] Teste no Pipeline Linux...");
    
    let options = new chrome.Options();
    options.addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage", "--disable-gpu", "--window-size=1920,1080", "--remote-allow-origins=*");
    
    const driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    
    try {
        const login = new LoginPage(driver);
        const products = new ProductsPage(driver);
        const checkout = new CheckoutPage(driver);

        console.log("🔗 Abrindo site...");
        await login.open();
        
        console.log("🔑 Fazendo login...");
        await login.login("standard_user", "secret_sauce");
        
        console.log("🛒 Adicionando itens...");
        await products.isOnProductsPage();
        await products.addItemByIndex(0);
        
        console.log("📋 Iniciando Checkout...");
        await checkout.goToCart();
        await checkout.startCheckout();
        await checkout.fillInformation("Alex", "Sandro", "72210000");
        
        console.log("🏁 Finalizando...");
        await checkout.finishOrder();
        
        const msg = await checkout.getSuccessMessage();
        console.log("✅ RESULTADO: " + msg);
        
        if (!msg.includes("Thank you")) {
            throw new Error("Mensagem de sucesso não encontrada!");
        }
        
    } catch (e) { 
        console.error("💥 ERRO NO PIPELINE: " + e.message);
        process.exit(1); 
    } finally { 
        await driver.quit(); 
    }
}
executarHeadless();
