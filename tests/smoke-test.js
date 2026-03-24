const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function smokeTest() {
    // Configuração para rodar no GitHub (Headless = sem abrir janela visual)
    let options = new chrome.Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        console.log("🚀 Iniciando Smoke Test na Pipeline...");
        await driver.get('https://www.google.com');
        let title = await driver.getTitle();
        console.log("✅ Conectado com sucesso! Título da página:", title);
    } finally {
        await driver.quit();
    }
}

smokeTest();