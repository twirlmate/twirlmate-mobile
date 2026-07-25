import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { router, type Href } from 'expo-router';
import axios from 'axios';

import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { testIds } from '@/constants/testIds';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ErrorState } from '@/components/ErrorState';
import { GroupListItem, PaginatedResponse } from '@/types/api';
import { getRequestErrorMessage } from '@/utils/errorHandling';
import { buildGroupDetailHref } from '@/utils/navigation';
import { getTwirlmateImageUrl } from '@/utils/twirlmate';

interface GroupsListProps {
  title: string;
  apiEndpoint: string;
  emptyMessage?: string;
  headerContent?: React.ReactNode;
}

export function GroupsList({
  title,
  apiEndpoint,
  emptyMessage = 'No groups found.',
  headerContent,
}: GroupsListProps) {
  const [groups, setGroups] = useState<GroupListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  const fetchGroups = async (reset = false) => {
    setErrorMessage(null);
    try {
      const response = await axios.get<PaginatedResponse<GroupListItem>>(apiEndpoint);
      const data = response.data;

      if (reset) {
        setGroups(data.results);
      } else {
        setGroups((previous) => [...previous, ...data.results]);
      }

      setNextPageUrl(data.next);
      setHasNextPage(Boolean(data.next));
    } catch (error) {
      setErrorMessage(
        getRequestErrorMessage(error, {
          notFoundMessage: `No ${title.toLowerCase()} are available right now.`,
          defaultMessage: `Unable to load ${title.toLowerCase()} right now. Please try again.`,
        })
      );
      if (reset) {
        setGroups([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  const fetchNextPage = async () => {
    if (!hasNextPage || loadingMore || !nextPageUrl) {
      return;
    }

    setLoadingMore(true);
    try {
      const response = await axios.get<PaginatedResponse<GroupListItem>>(nextPageUrl);
      const data = response.data;
      setGroups((previous) => [...previous, ...data.results]);
      setNextPageUrl(data.next);
      setHasNextPage(Boolean(data.next));
    } catch (error) {
      setErrorMessage(
        getRequestErrorMessage(error, {
          notFoundMessage: `No more ${title.toLowerCase()} are available right now.`,
          defaultMessage: `Unable to load more ${title.toLowerCase()} right now. Please try again.`,
        })
      );
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    setLoading(true);
    setRefreshing(false);
    setLoadingMore(false);
    setErrorMessage(null);
    setGroups([]);
    setHasNextPage(true);
    setNextPageUrl(null);

    const loadGroups = async () => {
      try {
        const response = await axios.get<PaginatedResponse<GroupListItem>>(apiEndpoint);
        const data = response.data;
        if (!isActive) {
          return;
        }
        setGroups(data.results);
        setNextPageUrl(data.next);
        setHasNextPage(Boolean(data.next));
      } catch (error) {
        if (!isActive) {
          return;
        }
        setErrorMessage(
          getRequestErrorMessage(error, {
            notFoundMessage: `No ${title.toLowerCase()} are available right now.`,
            defaultMessage: `Unable to load ${title.toLowerCase()} right now. Please try again.`,
          })
        );
        setGroups([]);
      } finally {
        if (!isActive) {
          return;
        }
        setLoading(false);
        setRefreshing(false);
        setLoadingMore(false);
      }
    };

    void loadGroups();

    return () => {
      isActive = false;
    };
  }, [apiEndpoint, title]);

  const onRefresh = () => {
    setRefreshing(true);
    setHasNextPage(true);
    setNextPageUrl(null);
    fetchGroups(true);
  };

  const renderGroupItem = ({ item }: { item: GroupListItem }) => (
    <TouchableOpacity
      testID={testIds.groupCard(item.id)}
      style={[styles.groupCard, { backgroundColor: palette.background }]}
      onPress={() =>
        router.push(buildGroupDetailHref(item.id, item.mobile_detail_url) as Href)
      }
    >
      <View style={styles.groupContent}>
        <Text style={[styles.groupName, { color: palette.text }]}>{item.name}</Text>
        <Text style={[styles.groupLocation, { color: palette.text }]}>{item.location}</Text>
      </View>
      <Image
        source={{ uri: getTwirlmateImageUrl(item.image) }}
        style={styles.groupImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={palette.tint} />
        <Text style={[styles.loadingMoreText, { color: palette.text }]}>Loading more...</Text>
      </View>
    );
  };

  const renderHeader = () => (
    <>
      {headerContent}
      {errorMessage ? <ErrorState message={errorMessage} onRetry={() => void fetchGroups(true)} /> : null}
    </>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
        {headerContent}
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={palette.tint} />
          <Text style={[styles.loadingText, { color: palette.text }]}>
            Loading {title.toLowerCase()}...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMessage && groups.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
        {headerContent}
        <ErrorState
          fill
          message={errorMessage}
          onRetry={() => {
            setLoading(true);
            void fetchGroups(true);
          }}
        />
      </SafeAreaView>
    );
  }

  if (groups.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
        {headerContent}
        <View style={styles.centered}>
          <Text style={[styles.emptyText, { color: palette.text }]}>{emptyMessage}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
      <FlatList
        data={groups}
        renderItem={renderGroupItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 80,
  },
  groupCard: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: 20,
  },
  groupImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 16,
    marginRight: 0,
  },
  groupContent: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
    justifyContent: 'center',
  },
  groupName: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    marginBottom: 8,
  },
  groupLocation: {
    fontSize: 14,
    opacity: 0.7,
    fontFamily: Fonts.regular,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: Fonts.regular,
    opacity: 0.7,
    textAlign: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  loadingMoreText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    opacity: 0.7,
  },
});
