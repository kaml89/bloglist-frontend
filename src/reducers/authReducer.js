import { 
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REMOVE_BLOG_SUCCESS
} from '../actions/actions'

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload
      }
    case LOGOUT_SUCCESS:
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null
      }
    default:
      return state
  }
}

export default authReducer