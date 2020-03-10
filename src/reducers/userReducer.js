import * as type from '../actions/actionTypes'

const initialState = {
  isLoading: false,
  items: []
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case type.REQUEST_USERS:
      return state
    case type.RECEIVE_USERS:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}

export default userReducer