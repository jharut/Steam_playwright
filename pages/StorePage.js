import { expect } from '@playwright/test';

export class StorePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole('combobox', { name: 'Search the store' });
    this.searchResults = page.locator('#search_resultsRows > a');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(term) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
    await expect(this.page).toHaveURL(/\/search\/?\?.*term=/);
  }
}
