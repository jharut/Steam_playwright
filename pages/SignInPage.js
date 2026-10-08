export class SignInPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Sign in', exact: true });
    this.accountNameInput = page.getByRole('textbox', {
      name: 'Sign in with account name',
    });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.submitButton = page.getByRole('button', { name: 'Sign in', exact: true });
  }
}
