export const testIds = {
  errorState: 'error-state',
  errorRetryButton: 'error-state-retry',
  eventCard: (id: number | string) => `event-card-${id}`,
  coachCard: (id: number | string) => `coach-card-${id}`,
  groupCard: (id: number | string) => `group-card-${id}`,
  groupsScreen: 'groups-screen',
  groupsExploreTab: 'groups-tab-explore',
  groupsStatesTab: 'groups-tab-states',
  groupStateCard: (stateCode: string) => `group-state-card-${stateCode.toLowerCase()}`,
} as const;
