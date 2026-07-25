import http from 'node:http';

import { getEventDetail, getGroupDetail, getPersonDetail, scenarios } from './fixture-data.mjs';

const FIXTURE_PORT = Number(process.env.QUALITY_HARNESS_FIXTURE_PORT ?? 4010);
const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,OPTIONS',
  'access-control-allow-headers': '*',
};

function createSvg(label) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
  <rect width="640" height="640" fill="#e7efee"/>
  <rect x="24" y="24" width="592" height="592" rx="28" fill="#038179" opacity="0.18"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="36" fill="#103434">${label}</text>
</svg>`;
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    ...corsHeaders,
    'content-type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(body));
}

function resolveScenarioRoute(name, pathname, searchParams) {
  const scenario = scenarios[name] ?? scenarios['happy-path'];
  const route = scenario.routes[pathname];

  if (pathname === '/api/v1/mobile/accounts/by-role/' && route && typeof route === 'object' && 'default' in route) {
    return route[searchParams.get('role') ?? 'coach'] ?? route.default;
  }

  if (pathname === '/api/v1/mobile/groups/by-state/' && route && typeof route === 'object' && !Array.isArray(route) && !('results' in route)) {
    return route[searchParams.get('state') ?? ''] ?? { next: null, previous: null, count: 0, page_size: 0, start_index: 0, end_index: 0, results: [], number: 1 };
  }

  if (pathname === '/api/v1/mobile/groups/' && route && typeof route === 'object' && 'results' in route) {
    const nameFilter = (searchParams.get('name') ?? '').trim().toLowerCase();
    const stateFilter = (searchParams.get('state') ?? '').trim().toUpperCase();
    const filteredResults = route.results.filter((group) => {
      const matchesName = nameFilter.length === 0 || group.name.toLowerCase().includes(nameFilter);
      const matchesState = stateFilter.length === 0 || group.location.toUpperCase().endsWith(stateFilter);

      return matchesName && matchesState;
    });

    return {
      ...route,
      count: filteredResults.length,
      page_size: route.page_size,
      start_index: filteredResults.length > 0 ? 1 : 0,
      end_index: filteredResults.length,
      results: filteredResults,
    };
  }

  return route;
}

export function startMockServer() {
  let currentScenario = 'happy-path';

  const server = http.createServer((request, response) => {
    if (!request.url) {
      sendJson(response, 400, { detail: 'Missing request URL' });
      return;
    }

    const url = new URL(request.url, `http://127.0.0.1:${FIXTURE_PORT}`);

    if (request.method === 'OPTIONS') {
      response.writeHead(204, corsHeaders);
      response.end();
      return;
    }

    if (url.pathname === '/__quality/health') {
      sendJson(response, 200, { scenario: currentScenario });
      return;
    }

    if (url.pathname === '/__quality/scenario') {
      const nextScenario = url.searchParams.get('name');
      if (!nextScenario || !scenarios[nextScenario]) {
        sendJson(response, 400, {
          detail: 'Unknown scenario',
          available: Object.keys(scenarios),
        });
        return;
      }

      currentScenario = nextScenario;
      sendJson(response, 200, { scenario: currentScenario });
      return;
    }

    if (url.pathname.startsWith('/static/pages/images/states/') || url.pathname.startsWith('/media/')) {
      response.writeHead(200, {
        ...corsHeaders,
        'content-type': 'image/svg+xml; charset=utf-8',
      });
      response.end(createSvg(url.pathname.split('/').pop() ?? 'Twirlmate'));
      return;
    }

    if (url.pathname.startsWith('/api/v1/mobile/events/dates/')) {
      const id = url.pathname.split('/').filter(Boolean).pop();
      const detail = getEventDetail(id);
      sendJson(response, detail ? 200 : 404, detail ?? { detail: 'Not found' });
      return;
    }

    if (url.pathname.startsWith('/api/v1/mobile/accounts/') && url.pathname !== '/api/v1/mobile/accounts/' && !url.pathname.startsWith('/api/v1/mobile/accounts/by-')) {
      const id = url.pathname.split('/').filter(Boolean).pop();
      const detail = getPersonDetail(id);
      sendJson(response, detail ? 200 : 404, detail ?? { detail: 'Not found' });
      return;
    }

    if (url.pathname.startsWith('/api/v1/mobile/groups/') && url.pathname !== '/api/v1/mobile/groups/' && !url.pathname.startsWith('/api/v1/mobile/groups/by-state/')) {
      const id = url.pathname.split('/').filter(Boolean).pop();
      const detail = getGroupDetail(id);
      sendJson(response, detail ? 200 : 404, detail ?? { detail: 'Not found' });
      return;
    }

    const route = resolveScenarioRoute(currentScenario, url.pathname, url.searchParams);
    if (!route) {
      sendJson(response, 404, { detail: `No fixture route for ${url.pathname}` });
      return;
    }

    if (route && typeof route === 'object' && 'status' in route && 'body' in route) {
      sendJson(response, route.status, route.body);
      return;
    }

    sendJson(response, 200, route);
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(FIXTURE_PORT, '127.0.0.1', () => {
      resolve({
        close: () =>
          new Promise((resolveClose, rejectClose) => {
            server.close((error) => {
              if (error) {
                rejectClose(error);
                return;
              }

              resolveClose();
            });
          }),
      });
    });
  });
}
