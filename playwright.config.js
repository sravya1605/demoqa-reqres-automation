require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

/**
 * Central Playwright configuration.
 * All environment-specific values (base URLs, timeouts) are read from
 * process.env via config/env.js at the point of use — nothing here is
 * hardcoded per-environment.
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  // Test report requested by the assignment: Playwright's built-in HTML
  // reporter already produces a shareable, screenshot-embedded report,
  // so no third-party reporting library is introduced.
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    actionTimeout: Number(process.env.DEFAULT_TIMEOUT) || 15000,
    navigationTimeout: Number(process.env.NAVIGATION_TIMEOUT) || 30000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Cross-browser support: run all projects locally, or target one with
  // `--project=chromium` (used as the default single-browser CI run).
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
