import { Given, When, Then, Before } from '@cucumber/cucumber';
import { LoginPagina } from '../pages/login_pagina';
import { AggregationPage } from '../pages/agregacao_pagina';

let loginPage: LoginPagina;
let aggregationPage: AggregationPage;

Before(async function () {
  // Inicializamos ambas as páginas usando a mesma 'this.page'
  loginPage = new LoginPagina(this.page);
  aggregationPage = new AggregationPage(this.page);
});

Given('que o utilizador efetuou login com sucesso na plataforma', async function () {
  await loginPage.login('utilizador_exemplo', 'pass123');
});

Given('que o utilizador está na página de gestão financeira', async function () {
  await aggregationPage.goToAgregationPage();
});

When('solicita a sincronização com a entidade {string}', async function (entidade: string) {
    await aggregationPage.triggerSync();
});

Then('os dados devem ser atualizados em menos de 5 segundos', async function () {
    await aggregationPage.validateSyncLatency();
});