import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { EventDateListItem } from '@/types/api';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import {
  formatEventCardDate,
  getEventCardRegistrationStatus,
} from '@/utils/eventFormatting';
import { getTwirlmateImageUrl } from '@/utils/twirlmate';

interface EventCardProps {
  event: EventDateListItem;
  onPress: () => void;
  style?: any;
}

export function EventCard({ event, onPress, style }: EventCardProps) {
  const colorScheme = useColorScheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }, style]}
      onPress={onPress}
    >
      <Image 
        source={{ uri: getTwirlmateImageUrl(event.event.image) }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.date, { color: Colors[colorScheme ?? 'light'].text }]} numberOfLines={1}>
          {formatEventCardDate(event.start)}
        </Text>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]} numberOfLines={2}>
          {event.event.name}
        </Text>
        <Text style={[styles.location, { color: Colors[colorScheme ?? 'light'].text }]} numberOfLines={1}>
          {event.event.location}
        </Text>
        <Text style={[styles.registrationStatus, { color: Colors[colorScheme ?? 'light'].icon }]} numberOfLines={1}>
          {getEventCardRegistrationStatus(event)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 12
  },
  content: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    marginBottom: 4,
    lineHeight: 20,
  },
  location: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    opacity: 0.8,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    opacity: 0.8,
    marginBottom: 4,
  },
  registrationStatus: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    opacity: 0.7,
  },
});
