import { Alert } from "bootstrap"



//Intercepting the action
import Notification from '../../utils/notification'

export default (store) => (next) => (action) => {
  
  switch(action.type) {
    case 'APP_IS_ONLINE':
    case 'APP_IS_OFFLINE':
      Notification.show({ title: 'Connection status', body: action.isOnline ? 'Online' : Offline })
    case 'AUTH_LOGOUT_SUCCESS': {
      const { messagesSubs } = store.getState().chats
      if (messagesSubs) {
        for (let key in messagesSubs) messagesSubs[key]()
      }
    }
    
  }
  
  next(action)
}


//dispatch -> middleware -> middleware -> etc.. -> reducer