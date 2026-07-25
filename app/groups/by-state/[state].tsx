import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

import { GroupsList } from '@/components/GroupsList';
import { getGroupStateTitle } from '@/features/groups/groupStates';
import { buildTwirlmateMobileApiUrl } from '@/utils/twirlmate';

export default function GroupsByStateScreen() {
  const { state } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: getGroupStateTitle(state as string),
          headerBackTitle: 'Back',
        }}
      />
      <GroupsList
        title={`${getGroupStateTitle(state as string)} Groups`}
        apiEndpoint={buildTwirlmateMobileApiUrl('/groups/by-state/', { state: state as string })}
        emptyMessage={`No groups found in ${getGroupStateTitle(state as string)}.`}
      />
    </>
  );
}
