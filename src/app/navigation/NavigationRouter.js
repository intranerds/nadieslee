import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import Intro from '../containers/Intro'
import IndiceScreen from '../containers/IndiceScreen'
import AboutUsScreen from '../containers/AboutUsScreen'
import TextoScreen from '../containers/TextoScreen'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='intro' component={Intro} title='Intro' initial />
          <Scene key='indiceScreen' component={IndiceScreen}  />
          <Scene key='aboutUsScreen' component={AboutUsScreen}/>
          <Scene key='textoScreen' component={TextoScreen}/>
        </Scene>
      </Router>
    )
  }
}

export default NavigationRouter
