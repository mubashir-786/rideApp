import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import Login from './view/user/Login';
// import Home from './view/user/Home';
// import * as React from 'react';
// import React, {Component} from 'react';
// import MainNavigator from './src/config/navigation'
import MainNavigator from './config/navigation'
import { Provider } from 'react-redux'
import { store } from './store';

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
      <MainNavigator />
      </Provider>
      {/* <Login /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%'
  },
});
