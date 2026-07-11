import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image, SafeAreaView } from 'react-native';
import { router, type Href } from 'expo-router';

import { GroupsList } from '@/components/GroupsList';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';

const US_REGIONS = [
  {
    title: 'Northeast',
    states: [
      { value: 'CT', label: 'Connecticut' },
      { value: 'ME', label: 'Maine' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NY', label: 'New York' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'VT', label: 'Vermont' },
      { value: 'DC', label: 'District of Columbia' },
    ],
  },
  {
    title: 'Southeast',
    states: [
      { value: 'AL', label: 'Alabama' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'DE', label: 'Delaware' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WV', label: 'West Virginia' },
    ],
  },
  {
    title: 'Midwest',
    states: [
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'WI', label: 'Wisconsin' },
    ],
  },
  {
    title: 'Central',
    states: [
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'MO', label: 'Missouri' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'SD', label: 'South Dakota' },
    ],
  },
  {
    title: 'Southwest',
    states: [
      { value: 'AZ', label: 'Arizona' },
      { value: 'CO', label: 'Colorado' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
    ],
  },
  {
    title: 'West',
    states: [
      { value: 'AK', label: 'Alaska' },
      { value: 'CA', label: 'California' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'MT', label: 'Montana' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'WA', label: 'Washington' },
      { value: 'WY', label: 'Wyoming' },
    ],
  },
] as const;

type TabType = 'explore' | 'states';

export default function GroupsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  const renderTabBar = () => (
    <View style={[styles.tabBar, { borderBottomColor: palette.inputBorder }]}>
      <TouchableOpacity
        style={[
          styles.tab,
          { borderBottomColor: activeTab === 'explore' ? palette.tint : 'transparent' },
        ]}
        onPress={() => setActiveTab('explore')}
      >
        <Text style={[styles.tabText, { color: activeTab === 'explore' ? palette.tint : palette.icon }]}>
          Explore
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          { borderBottomColor: activeTab === 'states' ? palette.tint : 'transparent' },
        ]}
        onPress={() => setActiveTab('states')}
      >
        <Text style={[styles.tabText, { color: activeTab === 'states' ? palette.tint : palette.icon }]}>
          States
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderStateItem = ({ item }: { item: { value: string; label: string } }) => (
    <TouchableOpacity
      style={[styles.stateCard, { backgroundColor: palette.backgroundSecondary }]}
      onPress={() => router.push(`/groups/by-state/${item.value}` as Href)}
    >
      <Image
        source={{ uri: `https://www.twirlmate.com/static/pages/images/states/${item.value}-transparent.png` }}
        style={styles.stateImage}
        resizeMode="contain"
      />
      <Text style={[styles.stateLabel, { color: palette.text }]}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderStatesTab = () => (
    <ScrollView contentContainerStyle={styles.statesContent} showsVerticalScrollIndicator={false}>
      {US_REGIONS.map((region) => (
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
      {renderTabBar()}
      {activeTab === 'explore' ? (
        <GroupsList
          title="Groups"
          apiEndpoint="https://twirlmate.com/api/v1/mobile/groups/"
          emptyMessage="No groups found right now."
        />
      ) : (
        renderStatesTab()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  statesContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.semiBold,
  },
  horizontalStatesList: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  stateCard: {
    width: 160,
    height: 160,
    padding: 16,
    marginRight: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateImage: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  stateLabel: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    textAlign: 'center',
  },
});
