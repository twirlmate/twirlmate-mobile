import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { CoachesList } from '@/components/CoachesList';
import { buildTwirlmateMobileApiUrl } from '@/utils/twirlmate';

export default function CoachesByRoleScreen() {
  const { role } = useLocalSearchParams();
  
  const getRoleTitle = (roleValue: string) => {
    const roleMap: { [key: string]: string } = {
      'coach': 'Coaches',
      'judge': 'Judges',
      'event_organizer': 'Event Organizers'
    };
    return roleMap[roleValue as string] || 'Coaches';
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: getRoleTitle(role as string),
          headerBackTitle: 'Back',
        }} 
      />
      <CoachesList
        title={getRoleTitle(role as string)}
        apiEndpoint={buildTwirlmateMobileApiUrl('/accounts/by-role/', { role: role as string })}
        emptyMessage={`No ${getRoleTitle(role as string).toLowerCase()} found.`}
      />
    </>
  );
}
