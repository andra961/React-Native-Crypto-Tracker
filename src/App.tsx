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
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './navigation';

import {Provider} from 'react-redux';

import WatchlistProvider from './contexts/WatchlistContext';

import {RecoilRoot} from 'recoil';
import COLORS from './constants/colors';
import store from './redux';

//replace with this to switch to recoil state
/*<RecoilRoot>
  <WatchlistProvider>
    <StatusBar backgroundColor={COLORS.BACKGROUND} />
    <View style={styles.container}>
      <Navigation />
    </View>
  </WatchlistProvider>
</RecoilRoot>*/

const App = () => {
  return (
    <NavigationContainer
      theme={{colors: {background: COLORS.BACKGROUND}} as any}>
      <Provider store={store}>
        <WatchlistProvider>
          <StatusBar backgroundColor={COLORS.BACKGROUND} />
          <View style={styles.container}>
            <Navigation />
          </View>
        </WatchlistProvider>
      </Provider>
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
