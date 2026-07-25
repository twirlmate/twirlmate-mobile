import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { GroupsList } from '@/components/GroupsList';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { testIds } from '@/constants/testIds';
import { useColorScheme } from '@/hooks/useColorScheme';

import {
  buildGroupsApiEndpoint,
  normalizeGroupDiscoveryFilters,
  type GroupDiscoveryFilters,
} from './groupFilters';
import { getGroupStateTitle } from './groupStates';
import { GroupsSearchFiltersModal } from './GroupsSearchFiltersModal';

function createEmptyFilters(): GroupDiscoveryFilters {
  return { name: '', state: '' };
}

export function GroupsSearchTab() {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const [appliedFilters, setAppliedFilters] = useState<GroupDiscoveryFilters>(createEmptyFilters);
  const [draftFilters, setDraftFilters] = useState<GroupDiscoveryFilters>(createEmptyFilters);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);

  const hasAppliedFilters = appliedFilters.name.length > 0 || appliedFilters.state.length > 0;
  const apiEndpoint = useMemo(() => buildGroupsApiEndpoint(appliedFilters), [appliedFilters]);

  const activeFilterSummary = [
    appliedFilters.name ? `"${appliedFilters.name}"` : null,
    appliedFilters.state ? getGroupStateTitle(appliedFilters.state) : null,
  ]
    .filter(Boolean)
    .join(' • ');

  const openFilters = () => {
    setDraftFilters(appliedFilters);
    setShowStatePicker(false);
    setShowFilterModal(true);
  };

  const applyFilters = () => {
    setAppliedFilters(normalizeGroupDiscoveryFilters(draftFilters));
    setShowStatePicker(false);
    setShowFilterModal(false);
  };

  const clearDraftFilters = () => {
    setDraftFilters(createEmptyFilters());
  };

  const clearAppliedFilters = () => {
    const cleared = createEmptyFilters();
    setAppliedFilters(cleared);
    setDraftFilters(cleared);
    setShowStatePicker(false);
  };

  const headerContent = hasAppliedFilters ? (
    <View style={styles.activeFiltersBanner}>
      <Text style={[styles.activeFiltersLabel, { color: palette.text }]}>Results for {activeFilterSummary}</Text>
      <TouchableOpacity testID={testIds.groupsClearFiltersButton} onPress={clearAppliedFilters}>
        <Text style={[styles.clearFiltersText, { color: palette.tint }]}>Clear filters</Text>
      </TouchableOpacity>
    </View>
  ) : null;

  return (
    <View style={styles.container}>
      <GroupsList
        title="Groups"
        apiEndpoint={apiEndpoint}
        emptyMessage={hasAppliedFilters ? 'No groups matched your search right now.' : 'No groups found right now.'}
        headerContent={headerContent}
      />

      <TouchableOpacity
        testID={testIds.groupsSearchFilterButton}
        style={[
          styles.floatingFilterButton,
          {
            backgroundColor: palette.backgroundSecondary,
          },
        ]}
        onPress={openFilters}
      >
        <IconSymbol size={24} name="line.3.horizontal.decrease" color={palette.text} />
      </TouchableOpacity>

      <GroupsSearchFiltersModal
        filters={draftFilters}
        visible={showFilterModal}
        showStatePicker={showStatePicker}
        onApply={applyFilters}
        onChangeName={(value) => {
          setDraftFilters((previous) => ({
            ...previous,
            name: value,
          }));
        }}
        onClear={clearDraftFilters}
        onClose={() => {
          setShowStatePicker(false);
          setShowFilterModal(false);
        }}
        onCloseStatePicker={() => setShowStatePicker(false)}
        onOpenStatePicker={() => setShowStatePicker(true)}
        onSelectState={(value) => {
          setDraftFilters((previous) => ({
            ...previous,
            state: value,
          }));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activeFiltersBanner: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  activeFiltersLabel: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    paddingRight: 16,
  },
  clearFiltersText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
  },
  floatingFilterButton: {
    alignItems: 'center',
    borderRadius: 28,
    bottom: 72,
    elevation: 12,
    height: 56,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: 56,
  },
});
