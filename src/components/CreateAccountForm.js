import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createUser, showNotification } from '../actions/actions' 

const CreateAccountForm = ({ createUser }) => {

    const { register, handleSubmit, getValues, errors } = useForm()

    const onSubmit = ({ email, name, username, password }) => createUser({email, name, username, password})

    return (
        <div>
            {errors.email && 'invalid email'}
            <form onSubmit={ handleSubmit(onSubmit)}>
            <input
                    placeholder='Email'
                    type='text'
                    name='email'
                    ref={register({required:true, pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address"
                      }})}
                />
                {errors.email && (<p>{errors.email.message}</p>)}
                <input
                    placeholder='Name'
                    type='text'
                    name='name'
                    ref={register({required: true})}
                />
                {errors.name && (<p>{errors.name}</p>)}

                <input
                    placeholder='Username'
                    type='text'
                    name='username'
                    ref={register({required: true})}
                />
                {errors.username && (<p>{errors.username}</p>)}

                <input
                    placeholder='Password'
                    type='password'
                    name='password'
                    ref={register({required: true, minLength: 4})}
                />
                {errors.password && (<p>{errors.password}</p>)}

                <input
                    placeholder='Confirm password'
                    type='password'
                    name='confirmPassword'
                    ref={register({
                            required: true,
                            validate: value => {
                                return getValues().password === value || "Passwords should match"
                            }
                        })}
                />
                {errors.confirmPassword && (<p>{errors.confirmPassword.message}</p>)}
                <button>Create Account</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: newUser => dispatch(createUser(newUser)),
        showNotification: message => dispatch(showNotification(message))
    }
}

export default connect(null, mapDispatchToProps)(CreateAccountForm)