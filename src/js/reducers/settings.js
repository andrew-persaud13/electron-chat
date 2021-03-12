import storage from '../utils/storage';

let INITIAL_STATE = {
  isDarkTheme: false,
  playSound: true,
  showNotifications: true,
};

if (storage.getItem('app-settings')) {
  INITIAL_STATE = storage.getItem('app-settings');
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SETTINGS_UPDATE':
      return { ...state, [action.setting]: action.value };
    default:
      return state;
  }
};
