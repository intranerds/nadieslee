import React from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../../navigation/NavigationRouter'
import { connect } from 'react-redux'
import StartupActions from '../../redux/StartupRedux'
import ReduxPersist from '../../config/ReduxPersist'
import Component from '../../content/textos/el-corazon-delator'

import {
  Container,
  Text
} from 'native-base'

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(Component)