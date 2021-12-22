import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CoinDetailedScreen from '../screens/CoinDetailedScreen';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import AddNewAssetScreen from '../screens/AddNewAssetScreen';

//type defining the screens of the root navigator
export type RootStackParamList = {
  Root: undefined;
  CoinDetailedScreen: {coinId: string};
  AddNewAssetScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name={'Root'}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'CoinDetailedScreen'}
        component={CoinDetailedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'AddNewAssetScreen'}
        component={AddNewAssetScreen}
        options={{
          title: 'Add New Asset',
          headerStyle: {backgroundColor: '#121212'},
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export type NavigateScreenProps = NativeStackNavigationProp<RootStackParamList>;

export type CoinDetailedScreenRouteProp = RouteProp<
  RootStackParamList,
  'CoinDetailedScreen'
>;

export default Navigation;
