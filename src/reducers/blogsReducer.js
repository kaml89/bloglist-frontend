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
      const blog = state.items.find(item => item.id === action.id)
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.id),
          {...blog, likes: blog.likes +1 }
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