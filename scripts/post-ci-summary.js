const fs = require('fs');

/**
 * Reads Playwright's JSON reporter output and appends a short pass/fail
 * summary to the GitHub Actions run summary, so results are visible without
 * downloading the HTML report artifact.
 */
function postSummary() {
  const data = JSON.parse(fs.readFileSync('test-results/results.json', 'utf-8'));
  const { expected, unexpected, skipped, flaky } = data.stats;

  const statusLine =
    unexpected > 0
      ? '❌ See the uploaded playwright-report artifact for failure details.'
      : '✅ All executed tests passed.';

  const summary = [
    '## Playwright Test Summary',
    '',
    '| Passed | Failed | Skipped | Flaky |',
    '|---|---|---|---|',
    `| ${expected} | ${unexpected} | ${skipped} | ${flaky} |`,
    '',
    statusLine,
  ].join('\n');

  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
}

postSummary();
