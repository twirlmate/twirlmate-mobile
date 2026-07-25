import { buildTwirlmateMobileApiUrl } from '../../utils/twirlmate.ts';

export type GroupDiscoveryFilters = {
  name: string;
  state: string;
};

export function normalizeGroupDiscoveryFilters(filters: Partial<GroupDiscoveryFilters>): GroupDiscoveryFilters {
  return {
    name: filters.name?.trim() ?? '',
    state: filters.state?.trim().toUpperCase() ?? '',
  };
}

export function buildGroupsApiEndpoint(filters: Partial<GroupDiscoveryFilters> = {}) {
  const normalizedFilters = normalizeGroupDiscoveryFilters(filters);

  return buildTwirlmateMobileApiUrl('/groups/', {
    name: normalizedFilters.name || undefined,
    state: normalizedFilters.state || undefined,
  });
}
