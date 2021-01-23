

import { createStore, applyMiddleware, combineReducers } from 'redux'
import reduxThunk from 'redux-thunk'
import chatReducer from '../reducers/chats'
import authReducer from '../reducers/auth'
import appReducer from '../reducers/app'

import appMiddleware from './middlewares/app'

export default function configureStore() {

  const middlewares = [reduxThunk, appMiddleware]

  const mainReducer =  combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer
  })

  const rootReducer = (state, action) => {

    if (action.type === 'AUTH_LOGOUT_SUCCESS') {
      state = undefined
    }

    return mainReducer(state, action)
  }
  const store = createStore(
    rootReducer, 
    applyMiddleware(...middlewares)
  )
  
  return store
}