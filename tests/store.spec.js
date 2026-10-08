import { test, expect } from '@playwright/test';
import { StorePage } from '../pages/StorePage.js';
import { SteamPage } from '../pages/SteamPage.js';
import { CommunityPage } from '../pages/CommunityPage.js';
import { SignInPage } from '../pages/SignInPage.js';
import { AboutPage } from '../pages/AboutPage.js';

test.describe('Steam main scenarios', () => {
  /** @type {SteamPage} */
  let steam;

  test.beforeEach(async ({ page }) => {
    steam = new SteamPage(page);
  });

  test('1. Open Steam -> Steam is open', async ({ page }) => {
    const store = new StorePage(page);

    await test.step('Open Steam', async () => {
      await steam.openHome();
    });

    await test.step('Check that Steam is open', async () => {
      await expect(page).toHaveURL(/store\.steampowered\.com/);
      await expect(page).toHaveTitle(/Steam/);
      await expect(steam.globalHeader).toBeVisible();
      await expect(steam.logo).toBeVisible();
      await expect(store.searchInput).toBeVisible();
    });
  });

  test('2. Go to Community tab -> Community is open', async ({ page }) => {
    const community = new CommunityPage(page);
    await steam.openHome();

    await test.step('Go to Community tab', async () => {
      await expect(steam.communityLink).toBeVisible();
      await steam.openCommunity();
    });

    await test.step('Check that Community is open', async () => {
      await expect(page).toHaveURL(community.url);
      await expect(page).toHaveTitle('Steam Community');
      await expect(community.searchInput).toBeVisible();
      await expect(community.content).toBeVisible();
    });
  });

  test('3. Click Sign in -> Sign in form is displayed', async ({ page }) => {
    const signIn = new SignInPage(page);
    await steam.openHome();

    await test.step("Find 'Sign in' button and click", async () => {
      await expect(steam.signInLink).toBeVisible();
      await steam.openSignIn();
    });

    await test.step('Check that Sign in form is displayed', async () => {
      await expect(page).toHaveURL(/store\.steampowered\.com\/login\//);
      await expect(signIn.heading).toBeVisible();
      await expect(signIn.accountNameInput).toBeVisible();
      await expect(signIn.passwordInput).toBeVisible();
      await expect(signIn.submitButton).toBeVisible();
    });
  });

  test('4. Go to About tab -> About page is open', async ({ page }) => {
    const about = new AboutPage(page);
    await steam.openHome();

    await test.step('Go to About tab', async () => {
      await expect(steam.aboutLink).toBeVisible();
      await steam.openAbout();
    });

    await test.step('Check that About page is open', async () => {
      await expect(page).toHaveURL('https://store.steampowered.com/about/');
      await expect(page).toHaveTitle('Steam, The Ultimate Online Game Platform');
      await expect(about.header).toBeVisible();
      await expect(about.greeting).toBeVisible();
    });
  });

  test('5. Check playing now and online digits', async ({ page }) => {
    const about = new AboutPage(page);
    await about.goto();

    await test.step('Stats are displayed with their labels', async () => {
      await expect(about.onlineStat).toBeVisible();
      await expect(about.playingNowStat).toBeVisible();
      await expect(about.statLabel(about.onlineStat)).toHaveText('online');
      await expect(about.statLabel(about.playingNowStat)).toHaveText('playing now');
    });

    await test.step('Digits are formatted numbers, e.g. 38,329,222', async () => {
      const thousands = /^\d{1,3}(,\d{3})*$/;
      expect(await about.statDigits(about.onlineStat)).toMatch(thousands);
      expect(await about.statDigits(about.playingNowStat)).toMatch(thousands);
    });

    await test.step('Counts are greater than zero and playing now <= online', async () => {
      const online = await about.statCount(about.onlineStat);
      const playingNow = await about.statCount(about.playingNowStat);

      expect(online).toBeGreaterThan(0);
      expect(playingNow).toBeGreaterThan(0);
      expect(playingNow).toBeLessThanOrEqual(online);
    });
  });
});

test.describe('Steam store', () => {
  test('search returns results', async ({ page }) => {
    const store = new StorePage(page);
    await store.goto();
    await store.search('Portal 2');

    await expect(store.searchResults.first()).toBeVisible();
    await expect(store.searchResults.filter({ hasText: 'Portal 2' }).first()).toBeVisible();
  });
});

test.describe('Steam about page', () => {
  /** @type {AboutPage} */
  let about;

  test.beforeEach(async ({ page }) => {
    about = new AboutPage(page);
    await about.goto();
  });

  test('features section lists every Steam feature', async () => {
    await expect(about.featuresTitle).toHaveText('Features');
    await expect(about.featuresSubtitle).toBeVisible();
    await expect(about.featuresGrid).toBeVisible();

    const expectedTitles = {
      steamChat: 'Steam Chat',
      gameHubs: 'Game Hubs',
      broadcasts: 'Steam Broadcast',
      workshop: 'Steam Workshop',
      mobile: 'Available on Mobile',
      earlyAccess: 'Early Access to Games',
      languages: 'Multilingual',
      payment: 'Purchases Made Easy',
      controllers: 'Controller Support',
    };
    for (const [key, title] of Object.entries(expectedTitles)) {
      await expect(about.featureTitle(about.features[key])).toHaveText(title);
    }

    await expect(about.moreFeaturesTitle).toHaveText('And so much more...');
    await expect(about.moreFeaturesText).toBeVisible();
  });
});
