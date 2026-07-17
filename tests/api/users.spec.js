const { test, expect } = require('@playwright/test');
const { createUser, getUser, updateUser } = require('../../api/reqresApi');
const { randomUser } = require('../../utils/testData');

// reqres.in's demo /api/users endpoints echo submitted data but do not persist
// it. Fetching by a freshly created id would legitimately 404, so "fetch" is
// validated against a known seeded fixture user instead of the id just
// created. See https://reqres.in/llm.txt ("Demo endpoints echo data but do
// not persist - use /api/collections/* for real storage").
const SEEDED_USER_ID = 2;
const SEEDED_USER_EMAIL = 'janet.weaver@reqres.in';

test.describe('reqres.in user API', () => {
  test('creates, fetches, and updates a user', async ({ request }) => {
    // Arrange
    let createdUserId;

    // Act + Assert, broken into reportable steps
    await test.step('Create User', async () => {
      const payload = randomUser();
      const response = await createUser(request, payload);

      expect(response.status(), 'create should return 201 Created').toBe(201);

      const body = await response.json();
      expect(body.name, 'created user name should match the request payload').toBe(payload.name);
      expect(body.job, 'created user job should match the request payload').toBe(payload.job);
      expect(typeof body.id, 'created user id should be a string').toBe('string');
      expect(body.createdAt, 'response should include a createdAt timestamp').toBeTruthy();

      createdUserId = body.id;
    });

    await test.step('Fetch Existing User', async () => {
      const response = await getUser(request, SEEDED_USER_ID);

      expect(response.status(), 'fetching a seeded user should return 200 OK').toBe(200);

      const body = await response.json();
      expect(body.data.id, 'fetched user id should match the requested id').toBe(SEEDED_USER_ID);
      expect(body.data.email, 'fetched user email should match the known fixture').toBe(
        SEEDED_USER_EMAIL,
      );
      expect(typeof body.data.first_name, 'first_name should be a string').toBe('string');
      expect(typeof body.data.last_name, 'last_name should be a string').toBe('string');
    });

    await test.step('Update User', async () => {
      const updatedName = 'Updated QA Name';
      const response = await updateUser(request, createdUserId, { name: updatedName });

      expect(response.status(), 'update should return 200 OK').toBe(200);

      const body = await response.json();
      expect(body.name, 'updated user name should reflect the new value').toBe(updatedName);
      expect(body.updatedAt, 'response should include an updatedAt timestamp').toBeTruthy();
    });
  });

  test('returns 404 for a user id that does not exist', async ({ request }) => {
    // Negative path: reqres.in's fixture data only covers ids 1-12, so an id
    // well outside that range is guaranteed not to exist.
    const NON_EXISTENT_USER_ID = 9999;

    const response = await getUser(request, NON_EXISTENT_USER_ID);

    expect(response.status(), 'fetching a non-existent user should return 404').toBe(404);
  });
});
