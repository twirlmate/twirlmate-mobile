import { spawn } from 'node:child_process';

import { startMockServer } from './mock-server.mjs';

const WEB_PORT = Number(process.env.QUALITY_HARNESS_WEB_PORT ?? 19006);
const FIXTURE_PORT = Number(process.env.QUALITY_HARNESS_FIXTURE_PORT ?? 4010);
const READY_TIMEOUT_MS = 120000;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function waitFor(url, timeoutMs) {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until the server is ready.
    }

    await delay(1000);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

const mockServer = await startMockServer();

const expoChild = spawn(
  process.platform === 'win32' ? 'npx.cmd' : 'npx',
  ['expo', 'start', '--web', '--port', String(WEB_PORT), '--clear'],
  {
    env: {
      ...process.env,
      CI: '1',
      EXPO_PUBLIC_TWIRLMATE_API_ORIGIN: `http://127.0.0.1:${FIXTURE_PORT}`,
      EXPO_PUBLIC_TWIRLMATE_WEB_ORIGIN: `http://127.0.0.1:${FIXTURE_PORT}`,
    },
    stdio: 'inherit',
  }
);

expoChild.on('exit', async (code) => {
  await mockServer.close();
  process.exit(code ?? 0);
});

const terminate = async () => {
  expoChild.kill('SIGTERM');
  await mockServer.close();
};

process.on('SIGINT', () => void terminate());
process.on('SIGTERM', () => void terminate());

await waitFor(`http://127.0.0.1:${FIXTURE_PORT}/__quality/health`, READY_TIMEOUT_MS);
await waitFor(`http://127.0.0.1:${WEB_PORT}`, READY_TIMEOUT_MS);

await new Promise(() => {});
