import React from 'react';
import { Button, StyleSheet, StatusBar, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { English, Lengua, Memory } from './components';
import { useFonts } from 'expo-font';

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

const RootStack = createStackNavigator({
  Main: AppNavigator,
  MiModal: () => <></>
}, {
  headerMode: 'none',
})

export default createAppContainer(RootStack)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
