import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ErrorState({
  message,
  onRetry,
  retryLabel = 'Try again',
  fill = false,
  style,
}: ErrorStateProps) {
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, fill && styles.fill, style]}>
      <Text style={[styles.message, { color: palette.text }]}>{message}</Text>
      {onRetry ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: palette.tint }]}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>{retryLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 12,
  },
  fill: {
    flex: 1,
  },
  message: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    lineHeight: 24,
    opacity: 0.8,
    textAlign: 'center',
  },
  button: {
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
});
