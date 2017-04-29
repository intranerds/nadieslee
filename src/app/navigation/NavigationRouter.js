import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import LaunchScreen from '../containers/LaunchScreen'
import ListviewExample from '../containers/ListviewExample'
import CardExample from '../containers/CardExample'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='launchScreen' component={LaunchScreen} title='LaunchScreen' initial />
          <Scene key='listViewExample' component={ListviewExample}/>
          <Scene key='cardExample' component={CardExample}/>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
