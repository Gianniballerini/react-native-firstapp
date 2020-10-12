import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import { Container } from 'native-base';
import Navigator from './routes/homeStack.js'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [isReady, setIsReady] = useState(null)
  useEffect(() => {
    fetchFonts()
  }, []) // empty [] to only make this on load

  async function fetchFonts() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    setIsReady(true)
  }

  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <Navigator />
  );
}
