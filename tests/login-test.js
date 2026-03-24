const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const LoginPage = require('../pages/LoginPage'); // Importando sua lógica real

async function rodarTesteReal() {
    console.log("🚀 [PASSO 1] Iniciando o motor do Chrome...");
    
    let options = new chrome.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-gpu');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        console.log("🖥️  [PASSO 2] Chrome aberto. Criando instância da página de login...");
        const login = new LoginPage(driver);
        
        console.log("🌐 [PASSO 3] Abrindo o site SauceDemo...");
        await login.open();
        
        console.log("✍️  [PASSO 4] Preenchendo Usuário e Senha...");
        await login.login('standard_user', 'secret_sauce');

        console.log("✅ [PASSO 5] LOGIN REALIZADO COM SUCESSO!");
        
        // Espera 5 segundos para você ver o login feito antes de fechar
        await driver.sleep(5000);

    } catch (err) {
        console.log("❌ OCORREU UM ERRO NO TESTE:");
        console.error(err);
    } finally {
        console.log("🏁 Finalizando o processo e fechando o navegador.");
        await driver.quit();
    }
}

console.log("🟢 Iniciando execução do teste de QA...");
rodarTesteReal().then(() => console.log("✨ Teste completo."));