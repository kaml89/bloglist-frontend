import { combineReducers } from 'redux'
import authReducer from './authReducer'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'

const rootReducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  auth: authReducer
}) 

export default rootReducer