import { Given, When, Then, Before } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login_pagina';
import { AggregationPage } from '../pages/agregacao_pagina';

let loginPage: LoginPage;
let aggregationPage: AggregationPage;

Before(async function () {
  loginPage = new LoginPage(this.page);
  aggregationPage = new AggregationPage(this.page);
});

Given('que o utilizador efetuou login com sucesso na plataforma', async function () {
  await loginPage.login('utilizador', 'password');
});

Given('que o utilizador está na página de gestão financeira', async function () {
  await aggregationPage.goToAgregationPage();
});

When('solicita a sincronização com a entidade {string}', async function (entidade: string) {
  // O parâmetro {string} captura o valor da coluna <entidade> do Scenario Outline
  await aggregationPage.triggerSync();
});

Then('os dados devem ser atualizados em menos de 5 segundos', async function () {
  await aggregationPage.validateSyncLatency();
});