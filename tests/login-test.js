const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

async function executarTesteCompleto() {
    console.log("🚀 [INÍCIO] Teste: Login + Adicionar 2 Itens ao Carrinho");

    let options = new chrome.Options();
    options.addArguments('--remote-allow-origins=*');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        const login = new LoginPage(driver);
        const products = new ProductsPage(driver);

        // 1. Realizar Login
        await login.open();
        await login.login('standard_user', 'secret_sauce');
        console.log("✅ Login realizado com sucesso!");

        // 2. Verificar se entrou na página de produtos
        await products.isOnProductsPage();

        // 3. Adicionar o primeiro item (índice 0)
        await products.addItemByIndex(0);
        console.log("🛒 Primeiro item adicionado.");

        // 4. Adicionar o segundo item (índice 1)
        await products.addItemByIndex(1);
        console.log("🛒 Segundo item adicionado.");

        // 5. Validar se o carrinho marcou "2"
        const qtd = await products.getCartCount();
        
        if (qtd === "2") {
            console.log("🏆 SUCESSO: O carrinho contém " + qtd + " itens!");
        } else {
            console.log("❌ FALHA: O carrinho deveria ter 2 itens, mas tem: " + qtd);
        }

        // Aguarda um pouco para você ver o resultado no Chrome
        await driver.sleep(5000);

    } catch (err) {
        console.error("💥 ERRO DURANTE A EXECUÇÃO:", err.message);
    } finally {
        await driver.quit();
        console.log("🏁 Teste finalizado.");
    }
}

executarTesteCompleto();