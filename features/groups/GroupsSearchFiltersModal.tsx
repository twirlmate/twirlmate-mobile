import React from 'react';
import {
  Animated,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { testIds } from '@/constants/testIds';
import { useColorScheme } from '@/hooks/useColorScheme';

import type { GroupDiscoveryFilters } from './groupFilters';
import { GROUP_STATES_WITH_ALL, getGroupStateTitle } from './groupStates';

const WHEEL_ITEM_HEIGHT = 52;
const WHEEL_VISIBLE_ROWS = 5;
const WHEEL_CONTAINER_HEIGHT = WHEEL_ITEM_HEIGHT * WHEEL_VISIBLE_ROWS;
const WHEEL_VERTICAL_PADDING = (WHEEL_CONTAINER_HEIGHT - WHEEL_ITEM_HEIGHT) / 2;

interface GroupsSearchFiltersModalProps {
  filters: GroupDiscoveryFilters;
  visible: boolean;
  showStatePicker: boolean;
  onApply: () => void;
  onChangeName: (value: string) => void;
  onClear: () => void;
  onClose: () => void;
  onCloseStatePicker: () => void;
  onOpenStatePicker: () => void;
  onSelectState: (value: string) => void;
}

export function GroupsSearchFiltersModal({
  filters,
  visible,
  showStatePicker,
  onApply,
  onChangeName,
  onClear,
  onClose,
  onCloseStatePicker,
  onOpenStatePicker,
  onSelectState,
}: GroupsSearchFiltersModalProps) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const isWeb = Platform.OS === 'web';
  const webWheelRef = React.useRef<ScrollView | null>(null);
  const selectedStateIndex = Math.max(
    0,
    GROUP_STATES_WITH_ALL.findIndex((stateOption) => stateOption.value === filters.state)
  );

  const scrollWebWheelToIndex = React.useCallback((index: number, animated: boolean) => {
    webWheelRef.current?.scrollTo({
      y: index * WHEEL_ITEM_HEIGHT,
      animated,
    });
  }, []);

  const commitWebWheelOffset = React.useCallback(
    (offsetY: number) => {
      const nextIndex = Math.min(
        GROUP_STATES_WITH_ALL.length - 1,
        Math.max(0, Math.round(offsetY / WHEEL_ITEM_HEIGHT))
      );

      onSelectState(GROUP_STATES_WITH_ALL[nextIndex].value);
      scrollWebWheelToIndex(nextIndex, true);
    },
    [onSelectState, scrollWebWheelToIndex]
  );

  React.useEffect(() => {
    if (!showStatePicker || !isWeb) {
      return;
    }

    const timeoutId = setTimeout(() => {
      scrollWebWheelToIndex(selectedStateIndex, false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isWeb, scrollWebWheelToIndex, selectedStateIndex, showStatePicker]);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView
        testID={testIds.groupsSearchModal}
        style={[styles.modalContainer, { backgroundColor: palette.background }]}
      >
        <View style={[styles.modalHeader, { borderBottomColor: palette.inputBorder }]}>
          <TouchableOpacity onPress={onClose} style={styles.modalButton}>
            <Text style={[styles.modalButtonText, { color: palette.text }]}>Cancel</Text>
          </TouchableOpacity>
          <Text style={[styles.modalTitle, { color: palette.text }]}>Filter Groups</Text>
          <TouchableOpacity
            testID={testIds.groupsSearchApplyButton}
            onPress={onApply}
            style={styles.modalButton}
          >
            <Text style={[styles.modalButtonText, { color: palette.tint }]}>Apply</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: palette.text }]}>Search Groups</Text>
            <TextInput
              testID={testIds.groupsSearchInput}
              style={[
                styles.filterInput,
                {
                  backgroundColor: palette.background,
                  borderColor: palette.inputBorder,
                  color: palette.text,
                },
              ]}
              placeholder="Search by group name..."
              placeholderTextColor={palette.icon}
              value={filters.name}
              onChangeText={onChangeName}
              returnKeyType="search"
            />
          </View>

          <View style={styles.filterSection}>
            <Text style={[styles.filterLabel, { color: palette.text }]}>State</Text>
            <TouchableOpacity
              testID={testIds.groupsSearchStateButton}
              style={[
                styles.dropdownButton,
                {
                  backgroundColor: palette.background,
                  borderColor: palette.inputBorder,
                },
              ]}
              onPress={onOpenStatePicker}
            >
              <Text style={[styles.dropdownText, { color: palette.text }]}>
                {filters.state ? getGroupStateTitle(filters.state) : 'All States'}
              </Text>
              <IconSymbol size={16} name="chevron.down" color={palette.text} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            testID={testIds.groupsSearchClearFiltersButton}
            onPress={onClear}
            style={styles.clearButton}
          >
            <Text style={[styles.clearButtonText, { color: '#F44336' }]}>Clear All Filters</Text>
          </TouchableOpacity>
        </ScrollView>

        {showStatePicker ? (
          <Animated.View style={styles.pickerOverlayContainer}>
            <TouchableOpacity style={styles.pickerBackdrop} onPress={onCloseStatePicker} activeOpacity={1} />
            <View style={styles.pickerSlideContainer}>
              <Animated.View
                style={[
                  styles.pickerBottomSheet,
                  {
                    backgroundColor: palette.background,
                  },
                ]}
              >
                <View style={[styles.pickerHeader, { borderBottomColor: '#9aa8ba' }]}>
                  <TouchableOpacity onPress={onCloseStatePicker}>
                    <Text style={[styles.pickerButtonText, { color: palette.text }]}>Cancel</Text>
                  </TouchableOpacity>
                  <Text style={[styles.pickerTitle, { color: palette.text }]}>Select State</Text>
                  <TouchableOpacity onPress={onCloseStatePicker}>
                    <Text style={[styles.pickerButtonText, { color: '#038179' }]}>Done</Text>
                  </TouchableOpacity>
                </View>
                {isWeb ? (
                  <View style={styles.webWheelWrapper}>
                    <View
                      pointerEvents="none"
                      style={[
                        styles.webWheelSelectionBand,
                        {
                          backgroundColor: palette.backgroundSecondary,
                          borderColor: palette.inputBorder,
                        },
                      ]}
                    />
                    <ScrollView
                      ref={webWheelRef}
                      contentContainerStyle={styles.webWheelContent}
                      decelerationRate="fast"
                      onMomentumScrollEnd={(event) =>
                        commitWebWheelOffset(event.nativeEvent.contentOffset.y)
                      }
                      onScrollEndDrag={(event) =>
                        commitWebWheelOffset(event.nativeEvent.contentOffset.y)
                      }
                      scrollEventThrottle={16}
                      showsVerticalScrollIndicator={false}
                      snapToInterval={WHEEL_ITEM_HEIGHT}
                    >
                      {GROUP_STATES_WITH_ALL.map((stateOption, index) => {
                        const isSelected = stateOption.value === filters.state;

                        return (
                          <TouchableOpacity
                            key={stateOption.value || 'all'}
                            testID={testIds.groupStateOption(stateOption.value || 'all')}
                            style={styles.webWheelItem}
                            onPress={() => {
                              onSelectState(stateOption.value);
                              scrollWebWheelToIndex(index, true);
                            }}
                          >
                            <Text
                              style={[
                                styles.webWheelItemText,
                                { color: isSelected ? palette.text : palette.icon },
                              ]}
                            >
                              {stateOption.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                ) : (
                  <Picker
                    selectedValue={filters.state}
                    onValueChange={(itemValue) => onSelectState(itemValue)}
                    style={[
                      styles.picker,
                      { color: palette.text },
                    ]}
                  >
                    {GROUP_STATES_WITH_ALL.map((stateOption) => (
                      <Picker.Item
                        key={stateOption.value || 'all'}
                        testID={testIds.groupStateOption(stateOption.value || 'all')}
                        label={stateOption.label}
                        value={stateOption.value}
                        color={palette.text}
                      />
                    ))}
                  </Picker>
                )}
              </Animated.View>
            </View>
          </Animated.View>
        ) : null}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  modalTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modalButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginTop: 24,
  },
  filterLabel: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
    marginBottom: 8,
  },
  filterInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
    height: 48,
    paddingHorizontal: 16,
  },
  dropdownButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  dropdownText: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  clearButton: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 32,
    paddingVertical: 12,
  },
  clearButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  pickerOverlayContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9999,
  },
  pickerBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  pickerSlideContainer: {
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
  },
  pickerBottomSheet: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: Platform.OS === 'web' ? 360 : 300,
    paddingBottom: 34,
  },
  pickerHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  pickerTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: 18,
  },
  pickerButtonText: {
    fontFamily: Fonts.semiBold,
    fontSize: 16,
  },
  picker: {
    height: 200,
  },
  webWheelWrapper: {
    height: WHEEL_CONTAINER_HEIGHT,
    justifyContent: 'center',
    marginTop: 20,
    overflow: 'hidden',
  },
  webWheelSelectionBand: {
    borderRadius: 28,
    borderWidth: 1,
    height: WHEEL_ITEM_HEIGHT,
    left: 20,
    position: 'absolute',
    right: 20,
    top: WHEEL_VERTICAL_PADDING,
  },
  webWheelContent: {
    paddingVertical: WHEEL_VERTICAL_PADDING,
  },
  webWheelItem: {
    alignItems: 'center',
    height: WHEEL_ITEM_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  webWheelItemText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
});
