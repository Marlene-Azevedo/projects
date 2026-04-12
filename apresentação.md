# 🚀 Apresentação: Estrutura de Automação nBanks
**Candidato:** QA Automation Engineer  
**Stack:** Playwright + Cucumber (BDD) + TypeScript  
**Duração Estimada:** 30 Minutos

---

## 🧠 1. Pensamento Estratégico (The Why)
O foco foi criar uma solução **Production Ready** que não apenas testa, mas documenta o produto.

* **Rastreabilidade:** Cada cenário está mapeado para um Critério de Aceitação (AC) das User Stories.
* **Resiliência:** Implementação de mecanismos de *Retry* para lidar com instabilidade de APIs bancárias (Requisito US1).
* **Escalabilidade:** Separação total via **Page Object Model (POM)**.

---

## 📂 2. Arquitetura do Projeto
A estrutura garante que a lógica de negócio (Gherkin) seja independente da implementação técnica (Playwright).

### [📁 tests/](./tests/)
* **[📁 features/](./tests/features/):** **Documentação Viva.** Linguagem Gherkin legível por stakeholders.
    * `agregacao_contas.feature`: Foco em performance e resiliência.
    * `pesquisa_produtos.feature`: Foco em filtros complexos e UX.
* **[📁 steps/](./tests/steps/):** **A Ponte.** Tradução da linguagem natural para código TypeScript.
    * Gestão de estado entre passos e suporte a *Scenario Outlines*.
* **[📁 pages/](./tests/pages/):** **POM.** Camada de interação com o browser.
    * Encapsulamento de seletores e métodos reutilizáveis.

### [📁 Infraestrutura & CI/CD](./)
* **[`.github/workflows/runTests.yml`](./.github/workflows/runTests.yml):** Pipeline de Integração Contínua. Feedback automático em cada commit.
* **[`cucumber.js`](./cucumber.js):** Configuração central de relatórios e registo de módulos (`ts-node`).
* **[📁 reports/](./reports/):** Evidência de execução em formato HTML para auditoria técnica.

---

## 🛠️ 3. Destaques das User Stories

### ✅ US1: Agregação de Contas
* **Cenário Crítico:** Latência < 5s.
* **Unhappy Path:** Mecanismo de **3 Retries** antes de comunicar falha, garantindo que o sistema tenta recuperar-se de micro-timeouts bancários.

### ✅ US2: Pesquisa Inteligente
* **Cenário Crítico:** Latência < 2s com filtros múltiplos.
* **Edge Case:** Persistência de filtros após navegação, validando a integridade da sessão do utilizador.

---

## 📈 4. Execução e Demonstração
Utilização estratégica de **Tags** para controlo de execução:

* `npx cucumber-js --tags "@critical"`: Smoke Test para deploys rápidos.
* `npx cucumber-js --tags "@performance"`: Validação específica de KPIs de tempo de resposta.

---

## 🏁 5. Conclusão
1.  **Modularidade:** Código fácil de manter e expandir.
2.  **Qualidade:** Cobertura de Happy Path, Unhappy Path e Edge Cases.
3.  **Valor de Negócio:** Testes que qualquer membro da equipa nBanks consegue compreender.