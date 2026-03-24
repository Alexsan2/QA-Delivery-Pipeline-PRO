# 🚀 QA Delivery Pipeline PRO - SauceDemo Automation

Este projeto demonstra uma estrutura profissional de automação de testes E2E (End-to-End) utilizando **Node.js** e **Selenium WebDriver**. O foco principal é a aplicação do padrão **Page Object Model (POM)** para garantir um código limpo, organizado e de fácil manutenção.

---

## 🛠️ Tecnologias Utilizadas

* **Linguagem:** JavaScript (Node.js)
* **Framework:** [Selenium WebDriver](https://www.selenium.dev/)
* **Padrão de Projeto:** Page Object Model (POM)
* **Navegador:** Google Chrome (Execução em modo Headless)

---

## 📂 Estrutura do Projeto

A organização segue as melhores práticas de mercado, separando a lógica dos seletores da lógica dos testes:

```text
/
├── pages/              # Camada de Page Objects (Mapeamento de elementos)
│   ├── LoginPage.js    # Ações da tela de Login
│   ├── ProductsPage.js # Interação com a vitrine de produtos
│   └── CheckoutPage.js # Fluxo de checkout e finalização
├── tests/              # Camada de Scripts de Teste
│   └── checkout-test.js # Teste E2E de fluxo completo
└── README.md           # Documentação do projeto

