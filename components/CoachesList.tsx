import React, { useCallback, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { router, type Href } from 'expo-router';
import axios from 'axios';
import { CoachListItem } from '@/types/api';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { testIds } from '@/constants/testIds';
import { ErrorState } from '@/components/ErrorState';
import { getRequestErrorMessage } from '@/utils/errorHandling';
import { useColorScheme } from '@/hooks/useColorScheme';
import { buildPersonDetailHref } from '@/utils/navigation';
import { getTwirlmateImageUrl } from '@/utils/twirlmate';

interface CoachesListProps {
  title: string;
  apiEndpoint: string;
  emptyMessage?: string;
}

export function CoachesList({ title, apiEndpoint, emptyMessage = "No coaches found." }: CoachesListProps) {
  const [coaches, setCoaches] = useState<CoachListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const colorScheme = useColorScheme();

  const fetchCoaches = useCallback(async (reset = false) => {
    setErrorMessage(null);
    try {
      const response = await axios.get(apiEndpoint);
      const data = response.data;
      
      if (reset) {
        setCoaches(data.results || data);
      } else {
        setCoaches(prev => [...prev, ...(data.results || data)]);
      }
      
      // Handle pagination
      setNextPageUrl(data.next || null);
      setHasNextPage(!!data.next);
    } catch (error) {
      setErrorMessage(
        getRequestErrorMessage(error, {
          notFoundMessage: `No ${title.toLowerCase()} are available right now.`,
          defaultMessage: `Unable to load ${title.toLowerCase()} right now. Please try again.`,
        })
      );
      if (reset) {
        setCoaches([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [apiEndpoint, title]);

  const fetchNextPage = async () => {
    if (!hasNextPage || loadingMore || !nextPageUrl) return;
    
    setLoadingMore(true);
    try {
      const response = await axios.get(nextPageUrl);
      const data = response.data;
      
      setCoaches(prev => [...prev, ...(data.results || data)]);
      setNextPageUrl(data.next || null);
      setHasNextPage(!!data.next);
    } catch {
      setErrorMessage(`Unable to load more ${title.toLowerCase()} right now. Please try again.`);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    void fetchCoaches(true);
  }, [apiEndpoint, fetchCoaches, title]);

  const onRefresh = () => {
    setRefreshing(true);
    setHasNextPage(true);
    setNextPageUrl(null);
    void fetchCoaches(true);
  };

  const renderCoachItem = ({ item }: { item: CoachListItem }) => (
    <TouchableOpacity 
      testID={testIds.coachCard(item.id)}
      style={[styles.coachCard, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      onPress={() => router.push(buildPersonDetailHref(item.id, item.mobile_detail_url) as Href)}
    >
      <View style={styles.coachContent}>
        <Text style={[styles.coachName, { color: Colors[colorScheme ?? 'light'].text }]}>
          {item.name}
        </Text>
        <Text style={[styles.coachLocation, { color: Colors[colorScheme ?? 'light'].text }]}>
          {item.location}
        </Text>
      </View>
      <Image 
        source={{ uri: getTwirlmateImageUrl(item.image) }}
        style={styles.coachImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors[colorScheme ?? 'light'].tint} />
        <Text style={[styles.loadingMoreText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Loading more...
        </Text>
      </View>
    );
  };

  const handleEndReached = () => {
    if (hasNextPage && !loadingMore && !loading) {
      fetchNextPage();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
          <Text style={[styles.loadingText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Loading {title.toLowerCase()}...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (errorMessage && coaches.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <ErrorState fill message={errorMessage} onRetry={() => {
          setLoading(true);
          void fetchCoaches(true);
        }} />
      </SafeAreaView>
    );
  }

  if (coaches.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <View style={styles.centered}>
          <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].text }]}>
            {emptyMessage}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <FlatList
        data={coaches}
        renderItem={renderCoachItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          errorMessage ? <ErrorState message={errorMessage} onRetry={() => void fetchCoaches(true)} /> : null
        }
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
    padding: 0,
    paddingBottom: 80,
  },
  coachCard: {
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: 20
  },
  coachImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 16,
    marginRight: 0
  },
  coachContent: {
    flex: 1,
    padding: 16,
    paddingLeft: 0,
    justifyContent: 'center',
  },
  coachName: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    marginBottom: 8,
  },
  coachLocation: {
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
