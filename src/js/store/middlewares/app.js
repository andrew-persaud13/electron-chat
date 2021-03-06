//Intercepting the action
import Notification from '../../utils/notification';
import storage from '../../utils/storage';

export default store => next => action => {
  switch (action.type) {
    case 'APP_IS_ONLINE':
    case 'APP_IS_OFFLINE':
      Notification.show({
        title: 'Connection status',
        body: action.isOnline ? 'Online' : 'Offline',
      });
    case 'SETTINGS_UPDATE': {
      const { setting, value } = action;
      const currentSettings = storage.getItem('app-settings');
      const settings = { ...currentSettings, [setting]: value };
      storage.setItem('app-settings', settings);
    }
    case 'AUTH_LOGOUT_SUCCESS': {
      const { messagesSubs } = store.getState().chats;
      if (messagesSubs) {
        for (let key in messagesSubs) messagesSubs[key]();
      }
    }
  }

  next(action);
};

//dispatch -> middleware -> middleware -> etc.. -> reducer
