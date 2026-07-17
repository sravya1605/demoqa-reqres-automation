const env = require('../config/env');

class BasePage {
  constructor(page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.usernameDisplay = page.locator('#userName-value');
  }

  async goto(path) {
    await this.page.goto(`${env.ui.baseUrl}${path}`);
  }

  /** Logout is available from both the profile page and the Book Store page. */
  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { BasePage };
