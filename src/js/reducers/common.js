export const createErrorReducer = actionType => {
  return (state = null, action) => {
    switch(action.type) {
      case `${actionType}_INIT`:
        return null
      case `${actionType}_ERROR`:
        return action.error
      case `${actionType}_SUCCESS`:
        return null
      default:
        return state
    }
  }
}

export const createIsFetchingReducer = actionType => {
  return (state = false, action) => {
    switch(action.type) {
      case `${actionType}_INIT`:
        return true
      case `${actionType}_ERROR`:
      case `${actionType}_SUCCESS`:
          return false
      
      default:
        return state
    }
  }
}