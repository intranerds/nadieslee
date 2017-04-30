import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../sagas/'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { AsyncStorage } from 'react-native'

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    github: require('./GithubRedux').reducer,
    login: require('./LoginRedux').reducer,
    search: require('./SearchRedux').reducer,
    palabraMostrando(state = '', action) {
      if (action.type === 'MOSTRAR_SIGNIFICADO') {
        state = action.palabra
      }
      return state
    },
    fontSize(state = 1.1, action) {
      if (action.type === 'AGRANDAR_FONT') {
        state *= 1.2
      }
      if (action.type === 'REDUCIR_FONT') {
        state /= 1.2
      }
      return state
    },
    introSkiped(state = false, action) {
      if (action.type === 'INTRO_SKIPED') {
        state = true
        NavigationActions.indiceScreen()
      }
      return state
    },
    async introVista(state = false, action) {
      if (action.type === 'INTRO_VISTA') {
        state = true
        NavigationActions.indiceScreen()
        // try {
        //   await AsyncStorage.setItem('@NadiesLee:introVista', true);
        // } catch (error) {
        //   // Error saving data
        // }
      }
      return state
    }
  })

  return configureStore(rootReducer, rootSaga)
}
