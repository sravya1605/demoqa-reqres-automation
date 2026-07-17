const { BasePage } = require('./BasePage');

class BookStorePage extends BasePage {
  constructor(page) {
    super(page);
    this.bookStoreNavLink = page.getByRole('button', { name: 'Go To Book Store' });
    this.searchBox = page.locator('#searchBox');
    this.resultRows = page.locator('.rt-tbody .rt-tr-group');
  }

  /** Navigates to the Book Store from the logged-in profile menu. */
  async open() {
    await this.bookStoreNavLink.click();
  }

  async searchBook(title) {
    await this.searchBox.fill(title);
  }

  /** Rows whose text matches the given title - shared by result-count checks and detail extraction. */
  getMatchingRows(title) {
    return this.resultRows.filter({ hasText: title });
  }

  /**
   * Returns { title, author, publisher } for the first result row matching the
   * given title. The demoqa results table has no accessible roles/labels, so
   * cells are read by column position (Title, Author, Publisher) within the
   * matched row - this is the actual DOM contract of the react-table widget,
   * not an arbitrary guess.
   */
  async getBookDetails(title) {
    const row = this.getMatchingRows(title).first();
    const cells = row.locator('.rt-td');
    // Table columns are: Image, Title, Author, Publisher, Action - confirmed
    // against the live demoqa Book Store table.

    return {
      title: await cells.nth(1).innerText(),
      author: await cells.nth(2).innerText(),
      publisher: await cells.nth(3).innerText(),
    };
  }
}

module.exports = { BookStorePage };
