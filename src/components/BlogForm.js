import React from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createBlog } from '../actions/actions'

const BlogForm = props => {

  const { register, handleSubmit, watch, error } = useForm()

  const onSubmit = data => props.createBlog(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        label='title'
        type='text'
        name='title'
        ref={register({required: true})}
        
        
      />
      <input
        label='author'
        type='text'
        name='author'
        ref={register}
        
      />
      <input
        label='url'
        type='text'
        name='url'
        ref={register}
      />
      <button>add blog</button>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createBlog: blog => dispatch(createBlog(blog))
  }
}

export default connect(null, mapDispatchToProps)(BlogForm)
