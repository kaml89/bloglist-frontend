import { 
  RECEIVE_BLOGS, 
  REQUEST_BLOGS, 
  CREATE_BLOG_SUCCESS, 
  INCREMENT_LIKES 
} from "../actions/actions"

const initialState = {
  isFetching: false,
  items: []
}

const blogsReducer = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_BLOGS:
      return { ...state, isFetching: true }
    case RECEIVE_BLOGS:
      return { 
        ...state, 
        items: action.blogs, 
        isFetching: false 
      }
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.response]
      }
    case INCREMENT_LIKES:
      const blog = state.items.find(item => item.id === action.id)
      return {
        ...state,
        items: [
          ...state.items.filter(item => item.id !== action.id),
          {...blog, likes: blog.likes +1 }
        ]
      }
    default:
      return state
  }
}

export default blogsReducer