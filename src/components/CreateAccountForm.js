import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUser } from '../actions/actions' 

const CreateAccountForm = ({ createUser }) => {

    const [ name, setName ] = useState('')
    const [ username, setUsername] = useState('') 
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        console.log(name, username, password, confirmPassword)
        createUser({username, name, password})
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                    placeholder='Name'
                    type='text'
                    value={ name }
                    onChange={ e => setName(e.target.value) }
                />
                <input
                    placeholder='Username'
                    type='text'
                    value={ username }
                    onChange={ e => setUsername(e.target.value) }
                />
                <input
                    placeholder='Password'
                    type='password'
                    value={ password}
                    onChange={ e => setPassword(e.target.value) }
                />
                <input
                    placeholder='Confirm password'
                    type='password'
                    value={ confirmPassword }
                    onChange={ e => setConfirmPassword(e.target.value) }
                />
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: newUser => dispatch(createUser(newUser))
    }
}

export default connect(null, mapDispatchToProps)(CreateAccountForm)