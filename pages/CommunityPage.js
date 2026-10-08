export class CommunityPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.url = 'https://steamcommunity.com/';
    this.searchInput = page.locator('#appHubsSearchText');
    this.content = page.locator('#AppHubContent');
    this.cards = page.locator('#AppHubCards');
  }
}
