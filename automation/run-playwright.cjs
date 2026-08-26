const { spawnSync } = require('node:child_process');

const playwrightCli = require.resolve('@playwright/test/cli');
const runTimestamp = new Date().toISOString();
const playwrightArgs = ['test', ...process.argv.slice(2)];

const result = spawnSync(process.execPath, [playwrightCli, ...playwrightArgs], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PLAYWRIGHT_RUN_TIMESTAMP: runTimestamp,
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
