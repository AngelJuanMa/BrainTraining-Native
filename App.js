import React from 'react';
import { Button, StyleSheet, StatusBar, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { English, Lengua, Memory } from './components';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const MemoryScreen = () => {
  let [fontsLoaded] = useFonts({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#181818" />
      <Memory />
    </View>
  );
}

MemoryScreen.navigationOptions = {
  drawerIcon: () => {
    return <Ionicons name='ios-information-circle' size={25}/>
  },
  headerStyle: {
    backgroundColor: '#f00',
  },
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
      activeTintColor: '#ffa521',
      inactiveTintColor: '#d17d04',
      labelStyle: {
        fontSize: 16,
        fontFamily: 'OpenSans-Bold',
      },
      style: {
        paddingBottom: 10,
        backgroundColor: '#202020'
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
