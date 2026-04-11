import { Page, Locator, expect } from '@playwright/test';

export class AggregationPage {
  readonly page: Page;
  readonly syncButton: Locator;
  readonly statusMessage: Locator;
  

  constructor(page: Page) {
    this.page = page;
    // Uso de data-testid para estabilidade (Best Practices) 
    this.syncButton = page.locator('[data-testid="btn-sync-accounts"]');
    this.statusMessage = page.locator('.sync-status-indicator');
  }

  async goToAgregationPage() {
    await this.page.goto('https://nbanks/agregacao');
  }

  async triggerSync() {
    await this.syncButton.click();
  }

  async validateSyncLatency() {
    const startTime = Date.now(); //Data inicio
    await this.statusMessage.waitFor({ state: 'visible', timeout: 5000 });
    const endTime = Date.now(); //Data fim
    const duration = (endTime - startTime) / 1000; //Diferença dos tempos, em segundos
    expect(duration).toBeLessThan(5); 
  }
}