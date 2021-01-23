

const onStatusChange = dispatch => () => {
  const isOnline = navigator.online
  const action = isOnline ? 
    { type: 'APP_IS_ONLINE', isOnline } :
    { type: 'APP_IS_OFFLINE', isOnline }
  
    dispatch(action)
}



export const listenToConnectionChanges = () => dispatch => {
  const connectionHandler = onStatusChange(dispatch)
  window.addEventListener('online', connectionHandler)
  window.addEventListener('offline', connectionHandler)

  return () => {
    window.removeEventListener('online', alertOnlineStatus)
    window.removeEventListener('offline', alertOnlineStatus) 
  }
}