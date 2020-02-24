import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const rootReducer = combineReducers({
    blogs: blogsReducer,
    notification: notificationReducer,
    auth: authReducer
  }) 
  
  const preloadedState = loadState()
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  const store = createStore(rootReducer, preloadedState, composeEnhancers(
    applyMiddleware(thunk)
  ))
  
  store.subscribe(() => {
    saveState(store.getState())
  })
  
  return store
}

export default configureStore