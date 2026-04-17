import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Manual
    this.usernameInput = page.locator('[data-testid="username"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    //Com recurso ao Codegen
    this.loginButton = page.getByRole('button', { name: 'login' });
  }

  async goToLoginPage(){
    await this.page.goto('https://nbanks.com/login');
  }

  async login(user: string, pass: string) {
    this.goToLoginPage();
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}