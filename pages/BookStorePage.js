const { BasePage } = require('./BasePage');

class BookStorePage extends BasePage {
  constructor(page) {
    super(page);
    this.bookStoreNavLink = page.getByRole('button', { name: 'Go To Book Store' });
    this.searchBox = page.locator('#searchBox');
    this.resultRows = page.locator('table tbody tr');
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
   * given title. Cells are read by column position within the matched row
   * (Image, Title, Author, Publisher), matching the catalog table's actual
   * semantic HTML structure.
   */
  async getBookDetails(title) {
    const row = this.getMatchingRows(title).first();
    const cells = row.locator('td');
    // Confirmed against the live Book Store catalog page: Image, Title, Author, Publisher.

    return {
      title: await cells.nth(1).innerText(),
      author: await cells.nth(2).innerText(),
      publisher: await cells.nth(3).innerText(),
    };
  }
}

module.exports = { BookStorePage };
