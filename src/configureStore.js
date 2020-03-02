import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const preloadedState = loadState()
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  const store = createStore(reducer, preloadedState, composeEnhancers(
    applyMiddleware(thunk)
  ))
  
  store.subscribe(() => {
    saveState(store.getState())
  })
  
  return store
}

export default configureStore