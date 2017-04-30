import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyles'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import Intro from '../containers/Intro'
import IndiceScreen from '../containers/IndiceScreen'
import AboutUsScreen from '../containers/AboutUsScreen'
import TextoScreen from '../containers/TextoScreen'

import { connect } from 'react-redux'
import { Alert, AsyncStorage } from 'react-native'


/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouterComponent extends Component {
  render () {
    const { introVista } = this.props
    return (
      <Router>
        <Scene key='drawer' component={NavigationDrawer} open={false}>
          <Scene key='intro' component={Intro} title='Intro' initial={!introVista} />
          <Scene key='indiceScreen' component={IndiceScreen} initial={introVista}  />
          <Scene key='aboutUsScreen' component={AboutUsScreen}/>
          <Scene key='textoScreen' component={TextoScreen}/>
        </Scene>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  let introVista = state.introVista
  // try {
  //   introVista = AsyncStorage.getItem('@NadiesLee:introVista');
  // } catch (error) {
  //   // Error saving data
  // }
  return {
    introVista
  }
}

export default connect(mapStateToProps, null)(NavigationRouterComponent)
