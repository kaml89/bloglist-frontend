export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION'

export const setNotification = (message) => {
  return {
    type: SET_NOTIFICATION,
    message
  }
}

export const removeNotification = () => {
  return {
    type: REMOVE_NOTIFICATION
  }
}

export const showNotification = (message) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }
}