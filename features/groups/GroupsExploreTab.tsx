import React from 'react';

import { GroupsList } from '@/components/GroupsList';
import { buildGroupsApiEndpoint } from './groupFilters';

export function GroupsExploreTab() {
  return (
    <GroupsList
      title="Groups"
      apiEndpoint={buildGroupsApiEndpoint()}
      emptyMessage="No groups found right now."
    />
  );
}
