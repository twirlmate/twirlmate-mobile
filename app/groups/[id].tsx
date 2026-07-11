import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GroupDetail } from '@/types/api';

export default function GroupDetailScreen() {
  const { id, detailUrl } = useLocalSearchParams<{ id: string; detailUrl: string }>();
  const [group, setGroup] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    const fetchGroupDetail = async () => {
      try {
        const url = detailUrl
          ? `https://twirlmate.com${decodeURIComponent(detailUrl)}`
          : `https://twirlmate.com/api/v1/mobile/groups/${id}/`;
        const response = await axios.get<GroupDetail>(url);
        setGroup(response.data);
      } catch (error) {
        console.error('Error fetching group detail:', error);
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetail();
  }, [detailUrl, id]);

  const handleOpenUrl = async (url: string | null, errorMessage: string) => {
    if (!url) {
      return;
    }

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Unable to open link', errorMessage);
    }
  };

  const handleOpenTwirlmateLink = async (path: string | null, errorMessage: string) => {
    if (!path) {
      return;
    }

    await handleOpenUrl(`https://www.twirlmate.com${path}`, errorMessage);
  };

  const renderLinkButton = (label: string, onPress: () => Promise<void>) => (
    <TouchableOpacity style={styles.linkButton} onPress={onPress}>
      <Text style={styles.linkButtonText}>{label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: palette.background }]}>
        <ActivityIndicator size="large" color={palette.tint} />
        <Text style={[styles.loadingText, { color: palette.text }]}>Loading group details...</Text>
      </View>
    );
  }

  if (!group) {
    return (
      <View style={[styles.centered, { backgroundColor: palette.background }]}>
        <Text style={[styles.errorTitle, { color: palette.text }]}>Group not found</Text>
        <Text style={[styles.errorBody, { color: palette.text }]}>
          This group may have moved or is no longer available.
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: group.name, headerBackTitle: 'Groups' }} />
      <ScrollView style={[styles.container, { backgroundColor: palette.backgroundSecondary }]}>
        <Image
          source={{
            uri: group.image.startsWith('/static/')
              ? `https://www.twirlmate.com${group.image}`
              : group.image,
          }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <Text style={[styles.title, { color: palette.text }]}>{group.name}</Text>
          <Text style={[styles.location, { color: palette.text }]}>{group.location}</Text>

          <View style={[styles.sectionCard, { backgroundColor: palette.background }]}>
            <Text style={[styles.sectionTitle, { color: palette.text }]}>About</Text>
            <Text style={[styles.sectionBody, { color: palette.text }]}>
              {group.description || 'No group description is available yet.'}
            </Text>
          </View>

          <View style={[styles.sectionCard, { backgroundColor: palette.background }]}>
            <Text style={[styles.sectionTitle, { color: palette.text }]}>Links</Text>
            {group.website
              ? renderLinkButton('Visit Website', () =>
                  handleOpenUrl(group.website, 'Please try opening the website again later.')
                )
              : null}
            {group.facebook_page
              ? renderLinkButton('Open Facebook Group', () =>
                  handleOpenUrl(group.facebook_page, 'Please try opening Facebook again later.')
                )
              : null}
            {group.web_detail_url
              ? renderLinkButton('View on Twirlmate', () =>
                  handleOpenTwirlmateLink(group.web_detail_url, 'Please try opening Twirlmate again later.')
                )
              : null}
            {group.web_group_join_url
              ? renderLinkButton('Request to Join', () =>
                  handleOpenTwirlmateLink(group.web_group_join_url, 'Please try opening the join form again later.')
                )
              : null}
            {!group.website && !group.facebook_page && !group.web_detail_url && !group.web_group_join_url ? (
              <Text style={[styles.sectionBody, { color: palette.text }]}>
                No external links are available for this group yet.
              </Text>
            ) : null}
          </View>

          <View style={[styles.sectionCard, { backgroundColor: palette.background }]}>
            <View style={styles.inlineHeader}>
              <IconSymbol size={16} name="person.3.fill" color={palette.icon} />
              <Text style={[styles.inlineLabel, { color: palette.text }]}>Community listing on Twirlmate</Text>
            </View>
            <Text style={[styles.inlineBody, { color: palette.text }]}>
              Use the links above to view the public group page or request access if the organizers have enabled it.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroImage: {
    width: '100%',
    height: 260,
    backgroundColor: '#E6EBF2',
  },
  content: {
    padding: 20,
    paddingBottom: 80,
    gap: 14,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
  },
  location: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    opacity: 0.75,
  },
  sectionCard: {
    borderRadius: 20,
    padding: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: Fonts.regular,
    opacity: 0.82,
  },
  linkButton: {
    backgroundColor: '#038179',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: Fonts.semiBold,
  },
  inlineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inlineLabel: {
    fontSize: 15,
    fontFamily: Fonts.semiBold,
  },
  inlineBody: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    lineHeight: 22,
    opacity: 0.78,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontFamily: Fonts.regular,
  },
  errorTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    marginBottom: 8,
  },
  errorBody: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    opacity: 0.75,
    textAlign: 'center',
    lineHeight: 22,
  },
});
