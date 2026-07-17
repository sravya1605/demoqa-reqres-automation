const fs = require('fs');
const { test, expect } = require('../../fixtures/fixtures');
const { writeBookDetails } = require('../../utils/csvWriter');
const env = require('../../config/env');

const BOOK_TITLE = 'Learning JavaScript Design Patterns';

test.describe('demoqa Book Store', () => {
  test('logs in, searches for a book, exports its details, and logs out', async ({
    loginPage,
    bookStorePage,
  }) => {
    // Arrange
    let bookDetails;

    // Act + Assert, broken into reportable steps
    await test.step('Login', async () => {
      await loginPage.goto();
      await loginPage.login(env.ui.username, env.ui.password);
    });

    await test.step('Validate Profile', async () => {
      await expect(loginPage.usernameDisplay, 'username should be shown after login').toHaveText(
        env.ui.username,
      );
      await expect(
        loginPage.logoutButton,
        'logout button should be visible after login',
      ).toBeVisible();
    });

    await test.step('Navigate to Book Store', async () => {
      await bookStorePage.open();
    });

    await test.step('Search Book', async () => {
      await bookStorePage.searchBook(BOOK_TITLE);
    });

    await test.step('Validate Search Result', async () => {
      await expect(
        bookStorePage.getMatchingRows(BOOK_TITLE),
        'search should return exactly one matching book',
      ).toHaveCount(1);

      bookDetails = await bookStorePage.getBookDetails(BOOK_TITLE);

      expect(bookDetails.title, 'returned row title should match the search term').toBe(BOOK_TITLE);
      expect(bookDetails.author, 'author cell should not be empty').not.toBe('');
      expect(bookDetails.publisher, 'publisher cell should not be empty').not.toBe('');
    });

    await test.step('Export CSV', () => {
      const filePath = writeBookDetails(bookDetails);

      expect(fs.existsSync(filePath), 'CSV file should be written to disk').toBe(true);

      const csvContent = fs.readFileSync(filePath, 'utf-8');
      expect(csvContent, 'CSV content should include the searched book title').toContain(
        BOOK_TITLE,
      );
    });

    await test.step('Logout', async () => {
      await bookStorePage.logout();
      await expect(
        bookStorePage.page,
        'user should be redirected back to the login page after logout',
      ).toHaveURL(/.*login/);
    });
  });
});
