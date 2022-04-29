import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'


import NavigationService from './NavigationService';
import PropTypes from 'prop-types';



//Camera 
import Camera from './Components/Camera'
import List from './Components/List'
import Message from './Components/message'
import Snap from './Components/Snap'
//Auth view
import Login from './Components/login'
import Register from './Components/register'

const AuthNavigator = createStackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null, gesturesEnabled: false } },
    Register: { screen: Register, navigationOptions: { header: null } },
    List: { screen: List },
    Camera: { screen: Camera, navigationOptions: { header: null, gesturesEnabled: false, } },
    Snap: { screen: Snap, navigationOptions: { header: null } },
    Message: { screen: Message }
  }
)

const AppContainer = createAppContainer(AuthNavigator)

export default class App extends React.Component {
  // ...

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}