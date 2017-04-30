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
    }
  })

  return configureStore(rootReducer, rootSaga)
}
