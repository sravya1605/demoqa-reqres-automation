const js = require('@eslint/js');
const globals = require('globals');
const playwright = require('eslint-plugin-playwright');
const prettierConfig = require('eslint-config-prettier');

/**
 * Flat ESLint configuration (ESLint 9+ style).
 * Kept intentionally small: the built-in recommended rule sets from
 * ESLint and eslint-plugin-playwright cover what a 1-2 year experience
 * QA automation engineer's project needs, without hand-rolled rule
 * tuning that would be over-engineering for this scope.
 */
module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off',
      eqeqeq: 'error',
      'prefer-const': 'error',
      'require-await': 'error',
    },
  },
  {
    files: ['tests/**/*.js'],
    ...playwright.configs['flat/recommended'],
  },
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'output/**',
      'playwright/.auth/**',
    ],
  },
  prettierConfig,
];
