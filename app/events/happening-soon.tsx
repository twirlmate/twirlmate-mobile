import React from 'react';
import { Stack } from 'expo-router';
import { EventsList } from '@/components/EventsList';
import { buildTwirlmateMobileApiUrl } from '@/utils/twirlmate';

export default function HappeningSoonScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Happening Soon',
          headerBackTitle: 'Events',
        }} 
      />
      <EventsList
        title="Happening Soon"
        apiEndpoint={buildTwirlmateMobileApiUrl('/events/happening-soon/')}
        emptyMessage="No upcoming events found."
      />
    </>
  );
}
