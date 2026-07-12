import React from 'react';
import { Stack } from 'expo-router';
import { EventsList } from '@/components/EventsList';
import { buildTwirlmateMobileApiUrl } from '@/utils/twirlmate';

export default function RecentlyAddedScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Recently Added',
          headerBackTitle: 'Events',
        }} 
      />
      <EventsList
        title="Recently Added"
        apiEndpoint={buildTwirlmateMobileApiUrl('/events/recently-added/')}
        emptyMessage="No recently added events found."
      />
    </>
  );
}
