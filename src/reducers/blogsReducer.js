const initialState = [
  {
    likes: 0,
    author: 'user',
    title: 'blog1',
    url: 'someurl',
    user: {

    },
    id: '234535345234'
  },
  {
    likes: 0,
    author: 'user',
    title: 'blog2',
    url: 'someurl',
    user: {
      
    },
    id: '234535345234'
  },
  {
    likes: 0,
    author: 'user',
    title: 'blog3',
    url: 'someurl',
    user: {
      
    },
    id: '234535345234'
  }
]

const blogsReducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}

export default blogsReducer