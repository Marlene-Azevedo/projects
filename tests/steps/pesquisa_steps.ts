import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login_pagina';
import { SearchPage } from '../pages/pesquisa_pagina';

let searchPage: SearchPage;



When('aplica os filtros de {string}, {string} e {string}', async function (categoria: string, taxa: string, comissao: string) {
  searchPage = new SearchPage(this.page);
  
  // Executa a seleção de múltiplos filtros
  await searchPage.applyFilters({ categoria, taxa, comissao });
});

Then('os resultados devem aparecer em menos de 2 segundos', async function () {
  // Validação do AC 1: Performance de pesquisa
  const startTime = Date.now();
  
  await searchPage.resultsContainer.waitFor({ state: 'visible' });
  
  const duration = (Date.now() - startTime) / 1000;
 
  if (duration > 2) {
    throw new Error(`A pesquisa demorou ${duration}s, excedendo o limite de 2s.`);
  }
});

Then('a lista deve exibir produtos que correspondam exatamente aos critérios', async function () {
  // Valida se os resultados visíveis batem com os filtros selecionados
  await searchPage.validateResultsMatchFilters();
});