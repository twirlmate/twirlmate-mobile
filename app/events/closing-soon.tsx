import React from 'react';
import { Stack } from 'expo-router';
import { EventsList } from '@/components/EventsList';
import { buildTwirlmateMobileApiUrl } from '@/utils/twirlmate';

export default function ClosingSoonScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Registration Closing Soon',
          headerBackTitle: 'Events',
        }} 
      />
      <EventsList
        title="Registration Closing Soon"
        apiEndpoint={buildTwirlmateMobileApiUrl('/events/closing-soon/')}
        emptyMessage="No events with registration closing soon."
      />
    </>
  );
}
