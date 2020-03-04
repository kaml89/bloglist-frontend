import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = props => {
  const [visibility, setVisibility] = useState(false)

  return (
    <div>
      <div style={{ display: visibility ? '' : 'none' }}>
        {props.children}
        <button onClick={() => setVisibility(!visibility)}>hide</button>
      </div>
      <button
        onClick={() => setVisibility(!visibility)}
        style={{ display: visibility ? 'none' : '' }}
      >
        {props.buttonLabel}
      </button>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
