import React, { useState, memo } from 'react';
import { StyleSheet, Button, StatusBar, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { English, Lengua, Memory } from './components';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

const setData = async () => {
  try {
    await AsyncStorage.multiSet([['hits', '0'], ['wrong', '0'], ['lastScore', '0'], ['cantWN', '4'], ['record', '0'], ['lastSpeed', '1000']])
  } catch (err) {
    console.log(err)
  }
}
const getData = () => { 
  try {
    AsyncStorage.multiGet(['hits', 'wrong', 'lastScore', 'cantWN', 'record', 'lastSpeed']).then(response => {
      if (!response[0][1] || !response[1][1] || !response[2][1],
        !response[3][1] || !response[4][1] || !response[5][1]) {
        setData()
      }
    })
  } catch (err) {
    console.log(err)
  }
}
getData()
const MemoryScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={true}
        backgroundColor="#181818"
      />
      <Memory />
    </View>
  );
}

const LenguaScreen = () => {
  return (
    <View style={styles.container}>
      <Lengua />
    </View>
  );
}

const EnglishScreen = () => {
  return (
    <View style={styles.container}>
      <English />
    </View>
  );
}


const AppNavigator = createBottomTabNavigator({
  MEMORIA: {
    screen: MemoryScreen,
  },
  LENGUA: {
    screen: LenguaScreen,
  },
  INGLES: {
    screen: EnglishScreen,
  }
}, {
  defaultNavigationOptions: () => ({
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#ffa521',
      inactiveTintColor: '#d17d04',
      labelStyle: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
      },
      style: {
        border: 'none',
        paddingBottom: 11,
        backgroundColor: '#202020'
      },
      indicatorStyle: {
        borderWidth: 1,
        borderColor: 'red',
      }
    }
  })
})


export default createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
