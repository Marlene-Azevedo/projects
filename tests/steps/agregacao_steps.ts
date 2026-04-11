import { Given, When, Then, Before } from '@cucumber/cucumber';
import { AggregationPage } from '../pages/agregacao_pagina';

// Declaramos a variável fora dos steps
let aggregationPage: AggregationPage;

// O Hook 'Before' corre antes de cada cenário
Before(async function () {
    // Instanciamos a página uma única vez por cenário usando o 'this.page' do Playwright
    aggregationPage = new AggregationPage(this.page);
});

Given('que o utilizador empresarial está na página de gestão financeira', async function () {
    await aggregationPage.goToAgregationPage();
});

When('solicita a sincronização com a entidade {string}', async function (entidade: string) {
    await aggregationPage.triggerSync();
});

Then('os dados devem ser atualizados em menos de 5 segundos', async function () {
    await aggregationPage.validateSyncLatency();
});