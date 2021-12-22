import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';

import WatchListScreen from '../screens/WatchListScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import COLORS from '../constants/colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.DEFAULT_GREY,
        tabBarStyle: {
          backgroundColor: COLORS.TAB_BAR,
        },
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={'Portfolio'}
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Foundation
              name="graph-pie"
              size={focused ? 35 : 30}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'WatchList'}
        component={WatchListScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <FontAwesome name="star" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
