const fs = require('fs');

/**
 * Reads Playwright's JSON reporter output and appends a short pass/fail
 * summary to the GitHub Actions run summary, so results are visible without
 * downloading the HTML report artifact. If results.json is missing (e.g. a
 * setup step failed before any test could run), this posts a clear one-line
 * explanation instead of crashing with a raw stack trace.
 */
function postSummary() {
  const summaryPath = process.env.GITHUB_STEP_SUMMARY;

  if (!fs.existsSync('test-results/results.json')) {
    fs.appendFileSync(
      summaryPath,
      '## Playwright Test Summary\n\n⚠️ No test results were produced - a step before `npm test` likely failed.\n',
    );
    return;
  }

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

  fs.appendFileSync(summaryPath, summary);
}

postSummary();
