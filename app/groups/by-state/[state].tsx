import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

import { GroupsList } from '@/components/GroupsList';
import { buildTwirlmateMobileApiUrl } from '@/utils/twirlmate';

const US_STATES: { [key: string]: string } = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
  DC: 'District of Columbia',
};

export default function GroupsByStateScreen() {
  const { state } = useLocalSearchParams();

  const getStateTitle = (stateValue: string) => US_STATES[stateValue] || stateValue;

  return (
    <>
      <Stack.Screen
        options={{
          title: getStateTitle(state as string),
          headerBackTitle: 'Back',
        }}
      />
      <GroupsList
        title={`${getStateTitle(state as string)} Groups`}
        apiEndpoint={buildTwirlmateMobileApiUrl('/groups/by-state/', { state: state as string })}
        emptyMessage={`No groups found in ${getStateTitle(state as string)}.`}
      />
    </>
  );
}
