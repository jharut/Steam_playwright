/** Shared Steam header: logo and the tabs/links used to move between pages. */
export class SteamPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.globalHeader = page.locator('#global_header');
    this.logo = page.locator('#logo_holder');
    this.communityLink = page
      .locator('a[href="https://steamcommunity.com/"]')
      .filter({ visible: true })
      .first();
    this.signInLink = page.locator('#global_action_menu a[href*="/login/"]');
    this.aboutLink = page
      .locator('a.menuitem[href^="https://store.steampowered.com/about/"]')
      .filter({ visible: true })
      .first();
  }

  async openHome() {
    await this.page.goto('/');
  }

  async openCommunity() {
    await this.communityLink.click();
  }

  async openSignIn() {
    await this.signInLink.click();
  }

  async openAbout() {
    await this.aboutLink.click();
  }
}
