
import { combineReducers } from 'redux'
import { createErrorReducer, createIsFetchingReducer } from './common'


function createRegisterReducer() {
 
  return combineReducers({
    error: createErrorReducer('AUTH_REGISTER'),
    isFetching: createIsFetchingReducer('AUTH_REGISTER')
  })
}

function createLoginReducer() {
 
  return combineReducers({
    error: createErrorReducer('AUTH_LOGIN'),
    isFetching: createIsFetchingReducer('AUTH_LOGIN')
  })
}


function createAuthReducer() {
  const user = (state = null, action) => {
    switch(action.type) {
      case 'AUTH_ON_INIT':
      case 'AUTH_ON_ERROR':
        return null
      case 'AUTH_REGISTER_SUCCESS':
      case 'AUTH_LOGIN_SUCCESS':
      case 'AUTH_ON_SUCCESS':
        return { ...action.user }
      default:
        return state
    }
  }



  return combineReducers({
    user,
    isFetching: createIsFetchingReducer('AUTH_ON'),
    login: createLoginReducer(),
    register: createRegisterReducer()
  })
}

export default createAuthReducer()

