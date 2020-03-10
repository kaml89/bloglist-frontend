import { combineReducers } from 'redux'
import authReducer from './authReducer'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  auth: authReducer,
  users: userReducer
}) 

export default rootReducer