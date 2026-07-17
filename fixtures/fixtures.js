const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { BookStorePage } = require('../pages/BookStorePage');

/**
 * Extends Playwright's base test with page objects pre-wired to the test's
 * own `page` instance, so spec files never construct page objects directly.
 */
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  bookStorePage: async ({ page }, use) => {
    await use(new BookStorePage(page));
  },
});

const expect = base.expect;

module.exports = { test, expect };
