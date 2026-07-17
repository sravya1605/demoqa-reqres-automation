require('dotenv').config();

/**
 * Centralized, typed access to configuration.
 * Every other module reads config through this file instead of touching
 * process.env directly, so there is exactly one place that knows about
 * environment variable names and default values.
 */
function requireEnv(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const env = {
  ui: {
    baseUrl: requireEnv('UI_BASE_URL', 'https://demoqa.com'),
    username: requireEnv('DEMOQA_USERNAME'),
    password: requireEnv('DEMOQA_PASSWORD'),
  },
  api: {
    baseUrl: requireEnv('API_BASE_URL', 'https://reqres.in'),
    apiKey: requireEnv('REQRES_API_KEY'),
  },
};

module.exports = env;
