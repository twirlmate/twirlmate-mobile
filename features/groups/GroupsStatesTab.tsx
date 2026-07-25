import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, type Href } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { testIds } from '@/constants/testIds';
import { useColorScheme } from '@/hooks/useColorScheme';
import { getTwirlmateStateImageUrl } from '@/utils/twirlmate';

import { GROUP_REGIONS } from './groupStates';

export function GroupsStatesTab() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  const renderStateItem = ({ item }: { item: { value: string; label: string } }) => (
    <TouchableOpacity
      testID={testIds.groupStateCard(item.value)}
      style={[styles.stateCard, { backgroundColor: palette.backgroundSecondary }]}
      onPress={() => router.push(`/groups/by-state/${item.value}` as Href)}
    >
      <Image
        source={{ uri: getTwirlmateStateImageUrl(item.value) }}
        style={styles.stateImage}
        resizeMode="contain"
      />
      <Text style={[styles.stateLabel, { color: palette.text }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.statesContent} showsVerticalScrollIndicator={false}>
      {GROUP_REGIONS.map((region) => (
        <View style={styles.section} key={region.title}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: palette.text }]}>{region.title}</Text>
          </View>
          <FlatList
            horizontal
            data={[...region.states]}
            renderItem={renderStateItem}
            keyExtractor={(item) => item.value}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalStatesList}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statesContent: {
    paddingBottom: 40,
    paddingTop: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 20,
  },
  horizontalStatesList: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  stateCard: {
    alignItems: 'center',
    borderRadius: 16,
    height: 160,
    justifyContent: 'space-between',
    marginRight: 16,
    padding: 16,
    width: 160,
  },
  stateImage: {
    height: 96,
    width: 96,
  },
  stateLabel: {
    fontFamily: Fonts.medium,
    fontSize: 15,
    textAlign: 'center',
  },
});
