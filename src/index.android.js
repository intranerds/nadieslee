/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { AppRegistry } from 'react-native'
// eslint-disable-next-line import/default
import codePush from 'react-native-code-push'

import NadiesLee from './lib/components/Index'

AppRegistry.registerComponent('NadiesLee', () => codePush(NadiesLee))
