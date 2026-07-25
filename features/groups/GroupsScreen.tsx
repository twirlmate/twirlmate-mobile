import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { testIds } from '@/constants/testIds';
import { useColorScheme } from '@/hooks/useColorScheme';

import { GroupsExploreTab } from './GroupsExploreTab';
import type { GroupDiscoveryFilters } from './groupFilters';
import { GroupsSearchTab } from './GroupsSearchTab';
import { GroupsStatesTab } from './GroupsStatesTab';

type TabType = 'explore' | 'search' | 'states';

function createEmptyFilters(): GroupDiscoveryFilters {
  return { name: '', state: '' };
}

export default function GroupsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [searchAppliedFilters, setSearchAppliedFilters] = useState<GroupDiscoveryFilters>(createEmptyFilters);
  const [searchDraftFilters, setSearchDraftFilters] = useState<GroupDiscoveryFilters>(createEmptyFilters);
  const [showSearchFilterModal, setShowSearchFilterModal] = useState(false);
  const [showSearchStatePicker, setShowSearchStatePicker] = useState(false);
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  const renderTabBar = () => (
    <View style={[styles.tabBar, { borderBottomColor: palette.inputBorder }]}>
      <TouchableOpacity
        testID={testIds.groupsExploreTab}
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
        testID={testIds.groupsSearchTab}
        style={[
          styles.tab,
          { borderBottomColor: activeTab === 'search' ? palette.tint : 'transparent' },
        ]}
        onPress={() => setActiveTab('search')}
      >
        <Text style={[styles.tabText, { color: activeTab === 'search' ? palette.tint : palette.icon }]}>
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        testID={testIds.groupsStatesTab}
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

  return (
    <SafeAreaView testID={testIds.groupsScreen} style={[styles.container, { backgroundColor: palette.background }]}>
      {renderTabBar()}
      {activeTab === 'explore' ? <GroupsExploreTab /> : null}
      {activeTab === 'search' ? (
        <GroupsSearchTab
          appliedFilters={searchAppliedFilters}
          draftFilters={searchDraftFilters}
          setAppliedFilters={setSearchAppliedFilters}
          setDraftFilters={setSearchDraftFilters}
          showFilterModal={showSearchFilterModal}
          setShowFilterModal={setShowSearchFilterModal}
          showStatePicker={showSearchStatePicker}
          setShowStatePicker={setShowSearchStatePicker}
        />
      ) : null}
      {activeTab === 'states' ? <GroupsStatesTab /> : null}
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
});
