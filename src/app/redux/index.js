import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../sagas/'

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
    }
  })

  return configureStore(rootReducer, rootSaga)
}
