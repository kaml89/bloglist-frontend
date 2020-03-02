import * as type from '../actions/actionTypes'

const initialState = {
  token: null,
  isAuthenticated: null,
  isLoading: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: action.payload
      }
    case type.LOGOUT_SUCCESS:
    case type.LOGIN_FAIL:
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