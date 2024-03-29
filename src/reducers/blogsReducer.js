import * as type from "../actions/actionTypes"

const initialState = {
  isFetching: false,
  items: []
}

const blogsReducer = (state = initialState, action) => {
  switch(action.type) {
    case type.REQUEST_BLOGS:
      return { ...state, isFetching: true }
    case type.RECEIVE_BLOGS:
      return { 
        ...state, 
        items: action.blogs,
        isFetching: false 
      }
    case type.CREATE_BLOG_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        isFetching: false
      }
    case type.INCREMENT_LIKES: 
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.response.id),
        {
          ...action.response,
          user: state.items.find(item => item.id === action.response.id).user
        }
        ]
      }
    case type.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.payload.id),
        {
          ...action.payload,
          user: state.items.find(item => item.id === action.payload.id).user
        }
        ]

      }
    case type.REMOVE_BLOG_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.id)
        ]
      }
    default:
      return state
  }
}


export default blogsReducer