/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {FlatList, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Navigation from './navigation';

import WatchlistProvider from './contexts/WatchlistContext';

import {RecoilRoot} from 'recoil';
import COLORS from './constants/colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <NavigationContainer
      theme={{colors: {background: COLORS.BACKGROUND}} as any}>
      <RecoilRoot>
        <WatchlistProvider>
          <StatusBar backgroundColor={COLORS.BACKGROUND} />
          <View style={styles.container}>
            <Navigation />
          </View>
        </WatchlistProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
});

export default App;
