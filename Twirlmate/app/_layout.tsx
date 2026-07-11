import { DarkTheme, DefaultTheme, ThemeProvider, type Theme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const customFonts = {
    regular: {
      fontFamily: 'Montserrat_400Regular',
      fontWeight: '400' as const,
    },
    medium: {
      fontFamily: 'Montserrat_500Medium',
      fontWeight: '500' as const,
    },
    bold: {
      fontFamily: 'Montserrat_700Bold',
      fontWeight: '700' as const,
    },
    heavy: {
      fontFamily: 'Montserrat_700Bold',
      fontWeight: '700' as const,
    },
  };

  // Custom theme with Montserrat font
  const customDefaultTheme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#038179',
      text: '#001830',
    },
    fonts: customFonts,
  };

  const customDarkTheme: Theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#038179',
    },
    fonts: customFonts,
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? customDarkTheme : customDefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="events/[id]" 
          options={{ 
            title: '',
            headerBackTitle: 'Back',
            headerTintColor: '#038179',
            headerBackTitleStyle: {
              fontFamily: 'Montserrat_600SemiBold',
            }
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
