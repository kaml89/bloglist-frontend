import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'
import { loadState, saveState } from './localStorage'


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

render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'))
