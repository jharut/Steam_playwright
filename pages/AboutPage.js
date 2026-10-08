export class AboutPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    this.header = page.locator('#about_header');
    this.greeting = page.locator('#about_greeting');
    this.onlineStat = this.greeting
      .locator('.online_stat')
      .filter({ has: page.locator('.gamers_online') });
    this.playingNowStat = this.greeting
      .locator('.online_stat')
      .filter({ has: page.locator('.gamers_in_game') });
    this.installSteamLink = this.greeting.locator('.about_install_steam_link');

    this.gamesSection = page.locator('#about_games_cta');
    this.gamesLeftColumnLinks = page.locator('#games_col_left a');
    this.gamesRightColumnLinks = page.locator('#games_col_right a');

    this.featuresTitle = page.locator('#about_steam_feature_title');
    this.featuresSubtitle = page.locator('#about_steam_feature_subtitle');
    this.featuresGrid = page.locator('#about_steam_features_grid');
    this.features = {
      steamChat: page.locator('#about_feature_steamchat'),
      gameHubs: page.locator('#about_feature_gamehubs'),
      broadcasts: page.locator('#about_feature_steambroadcasts'),
      workshop: page.locator('#about_feature_steamworkshop'),
      mobile: page.locator('#about_feature_steammobile'),
      earlyAccess: page.locator('#about_feature_earlyaccess'),
      languages: page.locator('#about_feature_languages'),
      payment: page.locator('#about_feature_payment'),
      controllers: page.locator('#about_feature_controllers'),
    };
    this.moreFeaturesTitle = page.locator('#about_features_more_title');
    this.moreFeaturesText = page.locator('#about_features_more_text');

    this.ctaCommunity = page.locator('#about_cta_community');
    this.ctaHardware = page.locator('#about_cta_hardware');
    this.ctaSteamworks = page.locator('#about_cta_steamworks');
  }

  async goto() {
    await this.page.goto('/about/');
  }

  /** @param {import('@playwright/test').Locator} stat */
  statLabel(stat) {
    return stat.locator('.online_stat_label');
  }

  /**
   * Returns the digits shown in a stat, e.g. "38,329,222".
   * @param {import('@playwright/test').Locator} stat
   */
  async statDigits(stat) {
    const label = await this.statLabel(stat).innerText();
    const text = await stat.innerText();
    return text.replace(label, '').trim();
  }

  /** @param {import('@playwright/test').Locator} stat */
  async statCount(stat) {
    return Number((await this.statDigits(stat)).replace(/,/g, ''));
  }

  /** @param {import('@playwright/test').Locator} card */
  ctaTitle(card) {
    return card.locator('.cta_title');
  }

  /** @param {import('@playwright/test').Locator} card */
  ctaButton(card) {
    return card.locator('.cta_btn a');
  }

  /** @param {import('@playwright/test').Locator} feature */
  featureTitle(feature) {
    return feature.locator('.feature_title');
  }
}
