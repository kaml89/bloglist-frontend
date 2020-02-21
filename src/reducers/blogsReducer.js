import { 
  RECEIVE_BLOGS, 
  REQUEST_BLOGS, 
  CREATE_BLOG_SUCCESS, 
  INCREMENT_LIKES, 
  REMOVE_BLOG_SUCCESS
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
        items: [...state.items, action.payload],
        isFetching: false
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
    case REMOVE_BLOG_SUCCESS:
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