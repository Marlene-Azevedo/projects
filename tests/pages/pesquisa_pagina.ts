import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly categoryDropdown: Locator;
  readonly taxFilter: Locator;
  readonly commissionFilter: Locator;
  readonly resultsContainer: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    this.page = page;
    // Seletores baseados em boas práticas (IDs ou Data-TestIDs)
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.categoryDropdown = page.locator('select#category-filter');
    this.resultsContainer = page.locator('.results-grid');
    this.productCards = page.locator('.product-card');
  }

  /**
   * Navega para a página de pesquisa de produtos
   */
  async goToSearchPage() {
    await this.page.goto('https://nbanks.com/produtos/pesquisa');
  }

  /**
   * Aplica múltiplos filtros em simultâneo (AC 1)
   * @param filters Objeto com os critérios de filtragem
   */
  async applyFilters(filters: { categoria: string, taxa: string, comissao: string }) {
    // Seleciona a categoria no dropdown
    await this.categoryDropdown.selectOption({ label: filters.categoria });
    
    // Filtros dinâmicos baseados no texto (ex: Taxa de Juro)
    await this.page.getByText(filters.taxa).click();
    await this.page.getByText(filters.comissao).click();
    
    // No caso de existir um botão de aplicar, clicamos nele
    const applyBtn = this.page.locator('button:has-text("Aplicar Filtros")');
    if (await applyBtn.isVisible()) {
      await applyBtn.click();
    }
  }

  /**
   * Valida se os resultados visíveis condizem com os filtros (AC 1)
   */
  async validateResultsMatchFilters() {
    // Garante que pelo menos um produto aparece
    await expect(this.productCards.first()).toBeVisible();
    
    // Exemplo: Validar se o texto de um card contém a categoria esperada
    const firstCardText = await this.productCards.first().innerText();
    // Esta lógica pode ser expandida conforme a UI real
    return firstCardText;
  }

  /**
   * Método para validar o Retry Mechanism (AC 3)
   * Verifica se o indicador de loading aparece/desaparece X vezes
   */
  async validateRetryAttempts(expectedAttempts: number) {
    const loader = this.page.locator('.search-spinner');
    for (let i = 0; i < expectedAttempts; i++) {
      await expect(loader).toBeVisible({ timeout: 5000 });
      await expect(loader).toBeHidden({ timeout: 5000 });
    }
  }
}