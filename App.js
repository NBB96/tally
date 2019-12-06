/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Icon, Header, Card, Image, ListItem } from 'react-native-elements'
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import Echarts from 'native-echarts';
import Picker from 'react-native-picker';

import Login from './views/login'
import Welcome from './views/welcome'
import Home from './views/home'
import Tally from './views/tally'
import Check from './views/check'
import Aly from './views/aly'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



const switchNav = createStackNavigator(
  {
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null
      }
    },
    home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    login: {
      screen: Login,
      navigationOptions: {
        header: null
      }
    },
    tally: {
      screen: Tally,
      navigationOptions: {
        header: null
      }
    },
    check: {
      screen: Check,
    },
    aly: {
      screen: Aly,
      navigationOptions: {
        header: null
      }
    }
  }
)

const App = createAppContainer(switchNav)

export default App;


